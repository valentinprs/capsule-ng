# Alert

Import `CapsAlertImports` from `@capsule-ng/caps/alert` and load the shared Capsule
preset/foundations. Project content and native `button capsButton` / `a capsLink` actions.

Alert retains Spartan's default host `role="alert"`. Consumers can override the native role
and set native `aria-live` attributes; these are not Capsule inputs. Dynamic insertion can
demonstrate an urgent update. Empty has no default role.
Titles are styled text; project a native heading where the document hierarchy needs one.

The input follows [Spartan Alert](https://www.spartan.ng/components/alert):
`variant: CapsAlertVariants['variant']` accepts `'default' | 'destructive' | null | undefined`
and starts at `'default'`. `undefined` uses the default style; `null` omits variant styling.
There are no outputs. Media, title, description and actions have no inputs or outputs;
custom colors and rich content use classes and projection.

See [anatomy, API decisions and migration inventory](../../../docs/specs/caps-alert-empty.md).
