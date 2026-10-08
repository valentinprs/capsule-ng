# Capsule Message Scroller

Import `CapsMessageScrollerImports` from `@capsule-ng/caps/message-scroller`. Give the root a bounded height, project direct registered rows and a native jump button:

```html
<caps-message-scroller
	#conversation="capsMessageScroller"
	class="h-96"
	autoScroll
	aria-label="Conversation"
	contentClass="gap-4 p-4"
>
	<caps-message-scroller-item messageId="reply-1">
		<!-- Compose public Capsule Message / Bubble / Attachment here. -->
	</caps-message-scroller-item>
	<button caps-message-scroller-button aria-label="Latest messages"></button>
</caps-message-scroller>
```

The root owns the provider, focusable viewport, named log and spacer. A custom row can apply the public CapsMessageScrollerItemDirective as a host directive; registered hosts must remain direct content children. messageId is local to the root, separate from native id. Use the root's public scrollToMessage/scrollToStart/scrollToEnd, scrollable/visibility signals and paired observeVisibility/unobserveVisibility methods.

Options/defaults preserve the official [Spartan Message Scroller](https://www.spartan.ng/components/message-scroller) contract. Capsule keeps the historical log quiet by default, exposes a separate localized announcement and protects history from first-encounter anchors. Explicit navigation still works; reduced motion and native focus are respected. See the [complete API and reading policy](../../../docs/specs/caps-conversation-flow.md). The browser contracts, native catalogue/Storybook interactions and strict isolated built-package AOT consumer have been validated. Reduced-motion validation covers this jump button and its commands; production SSR/navigation remains a final-union check. See the validation scope and full-document accessibility findings in the specification.
