# Catalogue and Storybook deployments

Projects in the Vercel team `valentins-projects-85afeca5`:

| Application              | Project                | Production URL                          |
| ------------------------ | ---------------------- | --------------------------------------- |
| Catalogue (Analog/Nitro) | `capsule-ng`           | https://capsule-ng.vercel.app           |
| Storybook (static)       | `capsule-ng-storybook` | https://capsule-ng-storybook.vercel.app |

GitHub Actions is the only deployment trigger. Both configurations set `git.deploymentEnabled: false`; initial provisioning recorded no Vercel Git integration. A read-only project API recheck on 2026-10-04 returned 403 for both projects with the local session, so the remote linkage could not be reconfirmed; no remote integration settings were changed. Pushing a branch without a PR does not deploy. Draft PRs deploy only after an explicit request; ready PRs deploy automatically after their current quick checks succeed. See [CI policy](ci.md).

## First deployment of a new project

Vercel always classifies the first deployment as production, even with `--target=preview`. Before enabling PR previews, initialize each new project with an explicitly approved minimal holding page (no application code), or wait for the first successful main CI production deployment. Do not delete that initial production until it has been replaced by the first main deployment. The preview script checks `targets.production` and refuses to upload to an uninitialized project.

The production application still deploys only after successful main CI. The initial holding page is a one-time provisioning step, not a PR deployment.

## GitHub configuration

Repository secret: `VERCEL_TOKEN`, a Vercel token scoped to the team. Renew it before its configured expiration. Do not use a short-lived CLI login token in Actions.

Repository variables:

- `VERCEL_ORG_ID`
- `VERCEL_CATALOGUE_PROJECT_ID`
- `VERCEL_STORYBOOK_PROJECT_ID`

Use Node 22 and pnpm 10.30.3. The deployment script pins Vercel CLI 62.1.0. Builds run in Actions through `vercel build`; `vercel deploy --prebuilt --archive=tgz` uploads the resulting Build Output API artifact. The [official archive mode](https://vercel.com/docs/cli/deploy#archive) compresses the upload instead of sending thousands of files individually, reducing the upload requests that triggered the `api-upload-free` per-file limit in CI. It does not change preview/production targets or promotion checks. The catalogue uses the Nitro Vercel preset. Storybook explicitly builds its separate Nx target.

## Lifecycle

- Ready PR opened/synchronize/reopened/ready_for_review events authorize the current SHA only after commitlint, format/lint, production types and unit jobs succeed. A failed draft final guard is not mistaken for a failed quick check. Only same-repository PRs receive deployment credentials; fork PRs are refused before checkout with secrets.
- Draft synchronization/conversion performs no upload. It cancels only a still-current obsolete build; stale SHA/state events cannot cancel a newer preview request.
- Stable preview aliases: `capsule-ng-pr-N.vercel.app` and `capsule-ng-storybook-pr-N.vercel.app`.
- Superseded builds are cancelled per PR. Alias promotion and cleanup are serialized in a separate, non-cancelling job with fresh SHA/state checks, preventing an old build from overwriting a newer publication.
- A single bot comment reports the deployed commit, links and failures. A failed build does not replace an existing alias; its old deployment may remain available but is not reported as the new commit.
- Successful `ci` runs caused by a push on `main` deploy production. A SHA check prevents delayed CI from promoting an older commit.
- Closing or merging a PR removes only deployments carrying the matching repository/PR metadata in the two configured projects, and their matching aliases. A delayed close event is ignored if the PR has reopened.
- Retry a failed deployment only after inspecting its cause and confirming the request still targets the current SHA/state. Cleanup can be retried while the PR remains closed. Production workflow_run activation requires this workflow on main. A branch push alone cannot request a redeploy.

### Explicit draft preview request

Wait for the four quick jobs of the latest CI run at the current head SHA to pass. Request a preview with Actions `deploy` → Run workflow, selecting **main or develop only**, and providing the open same-repository PR number plus its exact 40-character head SHA. This trigger never accepts a production target or arbitrary source ref. Authorization resolves the PR from GitHub, rejects forks/closed/stale requests, waits at most ten minutes for its latest quick checks, and checks again before upload and publication. A newer failing run cannot be hidden by an older successful run.

GitHub makes workflow_dispatch available only once its definition is on the default branch (main). Before that rollout, an explicit `capsule-preview` label addition also requests one current preview through pull_request:labeled. Create/use that label only when requesting a preview. Its continued presence **does not** enable deployments on subsequent draft pushes; remove and re-add it for a new request after the quick checks pass. This change does not create labels or alter remote settings automatically.

Existing PR branches must first incorporate this policy version from updated develop/main. Before exposing Vercel secrets, the build checks `deploymentPolicyVersion=2`; legacy branches fail with an actionable rebase message. PR #64/#65 are not modified by this branch. The manual workflow must itself come from main/develop, not an arbitrary feature branch. Cleanup uses trusted base code and remains available independently of preview compatibility.

Build output depends on `VITE_SITE_URL`, `VITE_SOURCE_REF`, `VERCEL_ENV` and `BUILD_PRESET`; they are included in the Nx build inputs. Source links point to the deployed SHA. Relative navigation and local search keep users on the preview origin. Preview responses carry `X-Robots-Tag: noindex, nofollow`; robots.txt disallows crawling.

Component documentation loaders read JSON from Nitro's bundled `assets:data` storage. Relative server-side HTTP requests cannot read the public files served separately by Vercel, and can return the HTML fallback instead. After building the catalogue, deployment runs `node tools/deployment/check-catalogue-data.mjs` against the built function without a static file server. Missing snippets or API data prevent upload; checking only prerendered pages would miss this navigation regression.

## Access

The new projects retain Vercel's default authentication protection (`all_except_custom_domains`). No bypass token is exposed or committed. Team members may need to sign in to view deployments; repository privacy alone does not protect a site. Review protection explicitly before attaching a public custom domain. Custom domains are not provisioned by this change.

## URL audit exceptions

Product links target Capsule. No runtime GitHub request or Algolia service is needed: search uses the catalogue navigation, and the decorative GitHub stars counter was removed.

Preserve these upstream references:

- `libs/brain/**`: upstream dependency, kept unmodified under ADR 0001, including package provenance and npm links.
- README attribution, LICENSE and the About credits paragraph: original authorship.
- ADR history: origin of the project.
- Date Picker and Dropdown Menu regression comments: original upstream issue numbers.
- Figma documentation links to the community shadcn kit, explicitly described as an external reference, not a Capsule library. Its iframe was removed. The inherited Loom embed and Agoge links were removed.

The inherited Zerops recipes, sponsor/Discord controls and scheduled contributor updater were removed. Contributor credit remains in Git history and license notices. Internal `@spartan-ng/*` imports and selectors remain during the component migration.

## Validation

```sh
node --test tools/deployment/*.test.mjs tools/ci/*.test.mjs
pnpm nx build app
pnpm nx build-storybook ui-storybook
```

Check PR creation/update/reopen/close, a branch push with no PR, and a successful main CI deployment. Inspect a deep catalogue route, local search, metadata, source links, and a rendered Storybook story. Do not interpret an HTTP 401 from Vercel protection as an application failure.
