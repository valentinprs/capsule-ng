# Hover Card

Import `CapsHoverCardImports` from `@capsule-ng/caps/hover-card`.
Carbon Angular has no exact Hover Card equivalent. Toggletip is click-driven and is
not substituted for this hover/focus preview.

```html
<caps-hover-card>
	<a capsLink capsHoverCardTrigger href="https://analogjs.org">@analogjs</a>
	<ng-template capsHoverCardContent [class]="'w-80'">
		<p>The Angular meta-framework.</p>
	</ng-template>
</caps-hover-card>
```

The native trigger retains its href, focus and navigation. The body is deferred.
Trigger and content hover, plus focus, keep the preview open; Escape cancels pending
opening and dismisses it. Touch hover is ignored. Essential actions must remain
available without opening a preview. Existing button-based consumers are supported,
including the transcript outline, whose keyboard-focus preview contains navigation.

The trigger's `placement` adapts the old Brain `align` **side**, and accepts only
`top | bottom | left | right`, default bottom. It does not accept start/end alignment.
Existing `showDelay=300`, `hideDelay=500`, `animationDelay=100` and `sideOffset=5` are
retained. These are existing Hover Card capabilities, not new Carbon props. Placement
and offset update the connected strategy, including before first opening and when open.
The root accepts `dir`; content direction follows the overlay.

Capsule owns the panel and reads its consumer-bound `[class]` from the template.
Brain's public Hover Card service still mounts and tracks its overlay content; Capsule
owns CDK connected positions and cancellable trigger timers so Escape and combined
focus/hover are reliable. Brain sources remain unchanged. No width/density/style API
is invented; styles use the shared foundations and ordinary consumer classes.

Direction inherits reactively from the parent Angular Directionality. The standard
`dir` input overrides it when supplied and resumes inheritance when undefined. A
consumer may import the native CDK Dir directive without duplicate matches.
