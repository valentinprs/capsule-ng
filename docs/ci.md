# CI and quota policy

CI uses Node 22 and pnpm 10.30.3. Validate locally and push a coherent batch rather than pushing each edit. Keep a PR draft while implementing, then mark it ready for review when the final changes are reviewable.

| Event                         | Quick checks                                | Full builds and E2E                   | Automatic preview                 |
| ----------------------------- | ------------------------------------------- | ------------------------------------- | --------------------------------- |
| Draft opened/reopened/new SHA | Commitlint, affected format/lint/types/unit | Skipped                               | None                              |
| Ready for review              | Same quick checks                           | All build targets and both E2E suites | After quick checks succeed        |
| New SHA on a ready PR         | Same quick checks                           | All build targets and both E2E suites | After quick checks succeed        |
| Converted to draft            | Quick checks; cancel obsolete run           | Skipped                               | Cancel obsolete build, no upload  |
| Push to develop               | Affected quick checks                       | Full integration validation           | None                              |
| Push to main                  | Affected quick checks                       | Full delivery validation              | Production after full CI succeeds |

Full builds/E2E start after all quick jobs pass, so a quick failure does not spend minutes on heavy work. The stable `build` and `e2e` checks are skipped on drafts. GitHub can treat skipped jobs as successful required checks, so **`ci-complete` deliberately fails on drafts** with a preliminary-validation summary. A green quick job or requested preview never counts as complete validation. The final check requires every quick/full job to succeed and rechecks that the PR is open, ready and at the same head SHA.

This private repository's protection/ruleset APIs returned HTTP 403 requiring GitHub Pro or public visibility on 2026-10-04. No plan, visibility or protection changes were made. This workflow cannot promise a technical merge lock on that configuration. Humans and agents must only merge a ready PR after the current head's full CI, including `ci-complete`, passes. If protection becomes available, require `ci-complete` rather than only the jobs that can be skipped.

Title/description edits do not start CI or cancel useful work. After changing the target branch/base, rebase and push or toggle draft→ready to start validation against that base; a green run against the previous base is insufficient. Nx affected quick checks use the PR target branch (develop or main), while full builds/E2E never select only affected projects or individual specs. No tests were removed. The unprovisioned `trpc-app-e2e` remains outside the existing `scope:e2e` suite.

## Typecheck scope

The `types` job invokes `ngc --noEmit` for affected Angular libraries and catalogue, checking templates and source aliases, and `tsc --noEmit` for Storybook sources, Tools, styles and ESLint rules. It does not bundle or prerender. Unknown affected projects fail with a missing-configuration error rather than silently losing coverage.

Cypress projects are covered by the full runtime E2E suites, not a new standalone TypeScript pass. Baseline app-e2e has four pre-existing standalone errors (two missing `cy.findByRole` augmentations and two `HTMLElement.rows` accesses); correcting those source tests is outside this workflow change. Standalone AOT template compilation of the existing JIT Storybook also reports legacy NgIcon imports and ToggleGroup bindings; Storybook therefore receives a real TypeScript source check, while its templates remain exercised by the full build/E2E suite. Root `spartan` is configuration only. The types job therefore does **not** claim to typecheck every file in the monorepo.

## Agent/reviewer procedure

1. Run `node --test tools/ci/*.test.mjs tools/deployment/*.test.mjs`, lint/format and the checks relevant to the actual source change locally. For workflows, validate YAML/expressions with actionlint. Source changes still require relevant component/template/browser tests.
2. Push one validated batch and create/keep a draft PR. Quick checks run; skipped heavy checks and a failing preliminary `ci-complete` are intentional.
3. If a draft preview is needed, wait for all four quick jobs on its current SHA to pass, then make an explicit preview request described in [deployment.md](deployment.md). Do not request one after every push.
4. Mark the PR ready. Full builds and both complete E2E suites run. Each further ready SHA repeats full validation; return to draft for continued implementation.
5. Before merge, verify current SHA, current base, ready state and all full checks. Obtain the user's merge authorization. A preview is not merge approval.

## Cancellation, caches and storage

CI cancels superseded runs per ref. A current draft conversion/synchronization also enters the preview build's cancelling concurrency group without installing or uploading. A delayed event cannot cancel a newer SHA/ready preview. Preview publication/cleanup has a separate non-cancelling group and fresh state/SHA checks.

Timeouts bound hung jobs: quick checks 15–20 minutes, full build 30, E2E 50, authorization 12 (quick-check wait at most 10), deployment build 30 and publication 10. These are failure limits, not shorter test coverage. Representative successful E2E runs took about 35 minutes.

The pnpm store and pinned Playwright/Cypress binaries remain cached. Nx executable task outputs restore only from the same lockfile, PR/branch and job; broad cross-PR fallback was removed. Keys use SHA instead of run ID, so reruns of the same commit reuse the same entry. GitHub additionally limits cache visibility by branch/PR. Do not put secrets in caches. Deployment result artifacts carry the exact SHA, live for one day and contain only project/URL/result metadata. No application build artifacts are retained across privileged workflows.

Inspect Actions durations and cache usage after adoption; savings depend on how often drafts are pushed and previews requested:

```sh
gh run list --workflow ci --limit 20
gh run view RUN_ID --json jobs --jq '.jobs[] | {name,startedAt,completedAt,conclusion}'
gh api repos/valentinprs/capsule-ng/actions/cache/usage
```

Use GitHub account billing/usage and Vercel team usage for actual quotas; durations alone do not establish the account's billable total. Review failures before retrying and use the normal cache UI for measured eviction, without deleting active work or raising budgets.

## Build reuse boundary

Nx can reuse unchanged tasks within a safe cache scope. CI output and Vercel output are not interchangeable: Vercel builds use pulled project configuration, the Nitro preset, preview/production environment, site origin and exact source SHA. Reusing a generic CI artifact would risk the wrong URLs/environment, while sharing PR artifacts with a privileged main deployment would cross trust boundaries. This change keeps separate Vercel builds and compresses uploads with `--archive=tgz`; it does not claim to eliminate every repeated build. Full E2E coverage is preserved rather than guessing a spec subset from changed files.

References: [GitHub workflow events](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), [job conditions and skipped required checks](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions), [cache scope](https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching), [Vercel prebuilt archives](https://vercel.com/docs/cli/deploy#archive).
