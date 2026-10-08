import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsMarkerImports } from '@capsule-ng/caps/marker';
import { CapsSpinner } from '@capsule-ng/caps/spinner';

@Component({
	selector: 'spartan-shimmer-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex items-center justify-center' },
	template: `
		<p class="text-muted-foreground shimmer text-sm">Generating response…</p>
	`,
})
export class ShimmerPreview {}

export const shimmerDemoCode = `<p class="text-muted-foreground shimmer text-sm">Generating response…</p>`;

@Component({
	selector: 'spartan-shimmer-marker-preview',
	imports: [CapsMarkerImports, CapsSpinner],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex w-full max-w-sm flex-col gap-4' },
	template: `
		<caps-marker role="status">
			<caps-marker-icon>
				<caps-spinner aria-hidden="true" />
			</caps-marker-icon>
			<caps-marker-content class="shimmer">Thinking...</caps-marker-content>
		</caps-marker>
		<caps-marker variant="separator" role="status">
			<caps-marker-content class="shimmer">Reading 4 files</caps-marker-content>
		</caps-marker>
	`,
})
export class ShimmerMarkerPreview {}

export const shimmerMarkerCode = `<caps-marker role="status">
  <caps-marker-icon>
    <caps-spinner aria-hidden="true" />
  </caps-marker-icon>
  <caps-marker-content class="shimmer">Thinking...</caps-marker-content>
</caps-marker>
<caps-marker variant="separator" role="status">
  <caps-marker-content class="shimmer">Reading 4 files</caps-marker-content>
</caps-marker>`;

@Component({
	selector: 'spartan-shimmer-color-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'text-muted-foreground flex flex-col items-center gap-2 text-sm' },
	template: `
		<p class="shimmer shimmer-color-blue-500/60">Generating response…</p>
		<p class="shimmer shimmer-color-[#378ADD]">Generating response…</p>
	`,
})
export class ShimmerColorPreview {}

export const shimmerColorCode = `<p class="shimmer shimmer-color-blue-500/60">Generating response…</p>
<p class="shimmer shimmer-color-[#378ADD]">Generating response…</p>`;

@Component({
	selector: 'spartan-shimmer-duration-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2',
	},
	template: `
		<div class="flex flex-col gap-3">
			<p class="shimmer">Generating response…</p>
			<p class="font-mono text-xs">shimmer</p>
		</div>
		<div class="flex flex-col gap-3">
			<p class="shimmer shimmer-duration-(--caps-duration-1000)">Generating response…</p>
			<p class="font-mono text-xs">shimmer-duration-(--caps-duration-1000)</p>
		</div>
	`,
})
export class ShimmerDurationPreview {}

export const shimmerDurationCode = `<p class="shimmer shimmer-duration-(--caps-duration-1000)">Generating response…</p>`;

@Component({
	selector: 'spartan-shimmer-spread-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2',
	},
	template: `
		<div class="flex flex-col gap-3">
			<p class="shimmer shimmer-spread-4">Generating response…</p>
			<p class="font-mono text-xs">shimmer-spread-4</p>
		</div>
		<div class="flex flex-col gap-3">
			<p class="shimmer shimmer-spread-24">Generating response…</p>
			<p class="font-mono text-xs">shimmer-spread-24</p>
		</div>
	`,
})
export class ShimmerSpreadPreview {}

export const shimmerSpreadCode = `<p class="shimmer shimmer-spread-24">Generating response…</p>`;

@Component({
	selector: 'spartan-shimmer-angle-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2',
	},
	template: `
		<div class="flex flex-col gap-3">
			<p class="shimmer">Generating response…</p>
			<p class="font-mono text-xs">shimmer</p>
		</div>
		<div class="flex flex-col gap-3">
			<p class="shimmer shimmer-angle-45">Generating response…</p>
			<p class="font-mono text-xs">shimmer-angle-45</p>
		</div>
	`,
})
export class ShimmerAnglePreview {}

export const shimmerAngleCode = `<p class="shimmer shimmer-angle-45">Generating response…</p>`;

@Component({
	selector: 'spartan-shimmer-once-preview',
	imports: [CapsButton],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'flex flex-col items-center gap-4' },
	template: `
		<!-- Remount on _key change so shimmer-once can replay. -->
		@for (_ of [_key()]; track _) {
			<p class="text-muted-foreground shimmer shimmer-duration-(--caps-duration-1100) shimmer-once text-sm">
				Generating response…
			</p>
		}
		<button capsButton variant="outline" size="sm" type="button" (click)="replay()">Replay</button>
	`,
})
export class ShimmerOncePreview {
	protected readonly _key = signal(0);

	protected replay(): void {
		this._key.update((value) => value + 1);
	}
}

export const shimmerOnceCode = `<p class="shimmer shimmer-duration-(--caps-duration-1100) shimmer-once text-muted-foreground text-sm">
  Generating response…
</p>`;

@Component({
	selector: 'spartan-shimmer-none-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'text-muted-foreground flex flex-col items-center gap-3 text-sm' },
	template: `
		<p class="shimmer md:shimmer-none">Generating response…</p>
		<p class="font-mono text-xs">shimmer md:shimmer-none</p>
	`,
})
export class ShimmerNonePreview {}

export const shimmerNoneCode = `<p class="shimmer md:shimmer-none">Generating response…</p>`;

@Component({
	selector: 'spartan-shimmer-rtl-preview',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'text-muted-foreground mx-auto grid w-full max-w-lg gap-6 text-center text-sm sm:grid-cols-2',
	},
	template: `
		<div class="flex flex-col gap-3">
			<p class="shimmer" dir="ltr">Generating response…</p>
			<p class="font-mono text-xs">dir="ltr"</p>
		</div>
		<div class="flex flex-col gap-3">
			<p class="shimmer" dir="rtl">جارٍ إنشاء الرد…</p>
			<p class="font-mono text-xs">dir="rtl"</p>
		</div>
	`,
})
export class ShimmerRtlPreview {}

export const shimmerRtlCode = `<p class="shimmer" dir="ltr">Generating response…</p>
<p class="shimmer" dir="rtl">جارٍ إنشاء الرد…</p>`;
