# Capsule-ng

Angular components with dedicated Capsule APIs, a documentation catalogue and Storybook.

- [Catalogue](https://capsule-ng.vercel.app)
- [Storybook](https://capsule-ng-storybook.vercel.app)
- [Repository](https://github.com/valentinprs/capsule-ng)
- [Issues](https://github.com/valentinprs/capsule-ng/issues)

## Development

Use the Node version in `.node-version` and pnpm 10.30.3.

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm storybook
```

```sh
pnpm nx build app
pnpm nx build-storybook ui-storybook
pnpm test
```

`libs/caps` contains Capsule APIs. `libs/brain` is kept in sync with upstream; `libs/helm` remains an internal dependency during migration. See [ADR 0001](docs/adr/0001-caps-element-vs-attribute.md).

## Deployment

See [deployment setup and operations](docs/deployment.md). Previews are created for pull requests only. Branch pushes without a PR do not deploy.

## Attribution

Derived from [Spartan](https://github.com/spartan-ng/spartan). Original work is MIT © [Robin Goetz](https://github.com/goetzrobin) and the Spartan contributors. Preserve the original [license](LICENSE) and upstream notices. This repository and its deployments are maintained independently.
