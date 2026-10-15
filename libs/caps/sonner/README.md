# Sonner

Import `CapsSonnerImports` and `toast` from `@capsule-ng/caps/sonner`. Put one host in the application shell:

```html
<caps-toaster closeButton />
```

Trigger notifications from browser event handlers using the [documented Spartan API](https://spartan.ng/components/sonner):

```ts
notify() {
  toast('Document saved', {
    description: 'Your changes have been applied.',
    closeButton: true,
    duration: 6000,
    action: { label: 'Undo', onClick: () => this.undo() },
    cancel: { label: 'Keep', onClick: () => this.keep() },
  });
}
```

The callable `toast` and `toast.message` retain the default variant. `success`, `info`, `warning`, `error` and `loading` select the original variants. IDs retain their upstream meaning:

```ts
const id = toast.loading('Saving…', { duration: Number.POSITIVE_INFINITY });
toast.success('Saved', { id, duration: 4000 });
toast.dismiss(id);

toast.promise(saveDocument(), {
	loading: 'Saving…',
	success: 'Saved',
	error: 'Save failed',
});
```

`toast.custom`, custom icons/components and props, description content, action/cancel callbacks, per-toast position, importance, classes/styles and lifecycle callbacks remain available. The function is re-exported unchanged. Use `Number.POSITIVE_INFINITY` for persistence; duration zero keeps its literal upstream timer behavior. `toast.dismiss()` clears all notifications, while `toast.dismiss(id)` targets one. `event.preventDefault()` in an action prevents automatic dismissal.

The host preserves the documented container inputs and defaults: `invert=false`, `theme='light'`, `position='bottom-right'`, `hotKey=['altKey','KeyT']`, `richColors=false`, `expand=false`, `duration=4000`, `visibleToasts=3`, `closeButton=false`, `toastOptions={}`, `offset=null`, `class=''` and the existing four normal-surface/radius `style` variables. Set `theme="system"` explicitly when desired. Normal surfaces resolve against the shared Capsule tokens.

The entry point also exports `ExternalToast`, `ToastT`, `ToastTypes`, `ToastAction`, `ToastOptions`, `ToastClassnames`, `ToasterProps`, `Position`, `Theme`, `PromiseData`, `PromiseT`, `BrnSonnerToasterConfig` and `provideCapsSonnerToasterConfig`. The provider retains the existing width, gap, offset and swipe configuration; documented host defaults still take precedence for lifetime and visible count unless bound explicitly.

Brain owns the live status regions, stack, swipe, RTL, timers and Alt+T shortcut. Capsule supplies decorative icons, native Capsule actions and shared styling. The native close button retains its upstream accessible name “Close toast”. Keep essential actions available with an explicit persistent duration.

The host delegates SSR behavior to Brain, and examples invoke notifications only after browser interaction. The raw function receives no additional SSR guard or guarantee.

See [the design, exact contracts and consumer audit](../../../docs/specs/caps-sonner.md). Brain and Helm sources remain unchanged.

## Known accessibility limits

The current Brain renderer produces two known axe findings: `list` (serious), because an ordered list directly contains `brn-sonner-toast` hosts, and `aria-allowed-role` (minor), because the inner notification is a `li` with `role="status"`. Capsule inherits this HTML/ARIA anatomy; list semantics and announcement behavior may vary across assistive technologies. Keep essential messages and actions available in the application rather than relying only on a timed toast.

The tests explicitly report these two known nodes using a narrow, test-only classifier. Every other rule/node/check remains blocking, and disappearance of either expected finding requires reviewing/removing its exception. This is not a claim of complete accessibility conformance. See [the active limitations, exact matching and removal conditions](../../../docs/specs/caps-sonner-accessibility-diagnostic.md).
