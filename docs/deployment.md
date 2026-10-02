# Catalogue and Storybook deployments

Projects in the Vercel team `valentins-projects-85afeca5`:

| Application              | Project                | Production URL                          |
| ------------------------ | ---------------------- | --------------------------------------- |
| Catalogue (Analog/Nitro) | `capsule-ng`           | https://capsule-ng.vercel.app           |
| Storybook (static)       | `capsule-ng-storybook` | https://capsule-ng-storybook.vercel.app |

GitHub Actions is the only deployment trigger. Projects are not connected to Vercel Git integration, and both configurations additionally set `git.deploymentEnabled: false`. Pushing a branch without a PR does not deploy. Draft PRs are included.

## GitHub configuration

Repository secret: `VERCEL_TOKEN`, a Vercel token scoped to the team. Renew it before its configured expiration. Do not use a short-lived CLI login token in Actions.

Repository variables:

- `VERCEL_ORG_ID`
- `VERCEL_CATALOGUE_PROJECT_ID`
- `VERCEL_STORYBOOK_PROJECT_ID`

Use Node 22 and pnpm 10.30.3. The deployment script pins Vercel CLI 62.1.0. Builds run in Actions through `vercel build`; `vercel deploy --prebuilt` uploads the resulting Build Output API artifact. The catalogue uses the Nitro Vercel preset. Storybook explicitly builds its separate Nx target.

## Lifecycle

- `pull_request` opened, synchronize and reopened build both applications without waiting for all CI tests. Only same-repository PRs receive deployment credentials; fork PRs are skipped.
- Stable preview aliases: `capsule-ng-pr-N.vercel.app` and `capsule-ng-storybook-pr-N.vercel.app`.
- Superseded builds are cancelled per PR. Alias promotion and cleanup are serialized in a separate, non-cancelling job with fresh SHA/state checks, preventing an old build from overwriting a newer publication.
- A single bot comment reports the deployed commit, links and failures. A failed build does not replace an existing alias; its old deployment may remain available but is not reported as the new commit.
- Successful `ci` runs caused by a push on `main` deploy production. A SHA check prevents delayed CI from promoting an older commit.
- Closing or merging a PR removes only deployments carrying the matching repository/PR metadata in the two configured projects, and their matching aliases. A delayed close event is ignored if the PR has reopened.
- Rerun the relevant Actions run to retry a failed deployment or cleanup. After this workflow first lands on `main`, production runs from the completed `ci` workflow event. A branch push alone cannot be used to request a redeploy.

Build output depends on `VITE_SITE_URL`, `VITE_SOURCE_REF`, `VERCEL_ENV` and `BUILD_PRESET`; they are included in the Nx build inputs. Source links point to the deployed SHA. Relative navigation and local search keep users on the preview origin. Preview responses carry `X-Robots-Tag: noindex, nofollow`; robots.txt disallows crawling.

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
node --test tools/deployment/*.test.mjs
pnpm nx build app
pnpm nx build-storybook ui-storybook
```

Check PR creation/update/reopen/close, a branch push with no PR, and a successful main CI deployment. Inspect a deep catalogue route, local search, metadata, source links, and a rendered Storybook story. Do not interpret an HTTP 401 from Vercel protection as an application failure.
