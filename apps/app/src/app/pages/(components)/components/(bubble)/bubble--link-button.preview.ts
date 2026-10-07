import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsBubbleImports } from '@capsule-ng/caps/bubble';
import { toast } from '@spartan-ng/brain/sonner';

@Component({
	selector: 'spartan-bubble-link-button-preview',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'flex w-full max-w-sm flex-col gap-8 py-12',
	},
	template: `
		<caps-bubble variant="muted">
			<caps-bubble-content>How can I help you today?</caps-bubble-content>
		</caps-bubble>
		<caps-bubble-group>
			<caps-bubble variant="tinted" align="end">
				<button capsBubbleContent type="button" (click)="onForgot()">I forgot my password</button>
			</caps-bubble>
			<caps-bubble variant="tinted" align="end">
				<button capsBubbleContent type="button" (click)="onSubscription()">I need help with my subscription</button>
			</caps-bubble>
			<caps-bubble variant="tinted" align="end">
				<button capsBubbleContent type="button" (click)="onOther()">Something else. Talk to a human.</button>
			</caps-bubble>
		</caps-bubble-group>
	`,
})
export class BubbleLinkButtonPreview {
	protected onForgot(): void {
		toast('You clicked forgot password');
	}

	protected onSubscription(): void {
		toast('You clicked help with subscription');
	}

	protected onOther(): void {
		toast('You clicked something else. Talk to a human.');
	}
}
