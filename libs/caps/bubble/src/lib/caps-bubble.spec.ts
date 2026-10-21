import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import '@testing-library/jest-dom/vitest';
import { userEvent } from '@vitest/browser/context';
import axe from 'axe-core';
import { CapsBubbleImports, type CapsBubbleVariant } from '../index';

@Component({
	selector: 'caps-bubble-test',
	imports: [CapsBubbleImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-bubble-group>
			<caps-bubble [variant]="variant()" align="end" class="custom-bubble">
				<caps-bubble-content>
					<strong>Ready for review</strong>
					<a href="#details">Details</a>
				</caps-bubble-content>
				<caps-bubble-reactions side="top" align="start">
					<button type="button" [attr.aria-pressed]="liked()" (click)="liked.set(!liked())">Useful</button>
				</caps-bubble-reactions>
			</caps-bubble>
			<caps-bubble variant="outline">
				<button capsBubbleContent type="button" (click)="actions = actions + 1">Review</button>
			</caps-bubble>
			<caps-bubble><a capsBubbleContent href="#document" download="document.txt">Download document</a></caps-bubble>
		</caps-bubble-group>
	`,
})
class Host {
	public readonly variant = signal<CapsBubbleVariant>('muted');
	public readonly liked = signal(false);
	public actions = 0;
}

describe('CapsBubble public composition', () => {
	it('preserves projected content, class merging and all seven variants without interactive semantics', async () => {
		const view = await render(Host);
		const bubble = view.container.querySelector('caps-bubble')!;
		for (const variant of [
			'default',
			'secondary',
			'muted',
			'tinted',
			'outline',
			'ghost',
			'destructive',
			'suggestion',
		] as const) {
			view.fixture.componentInstance.variant.set(variant);
			view.detectChanges();
			expect(bubble).toHaveAttribute('data-variant', variant);
			expect(bubble).toHaveClass('custom-bubble');
		}
		expect(bubble).toHaveAttribute('data-align', 'end');
		expect(bubble).not.toHaveAttribute('align');
		expect(bubble).not.toHaveAttribute('role');
		expect(bubble).not.toHaveAttribute('tabindex');
		expect(screen.getByText('Ready for review').tagName).toBe('STRONG');
		expect(view.container.querySelector('caps-bubble-content')).not.toHaveAttribute('role');
	});
	it('activates the native whole-content button once with Enter and Space and keeps link attributes', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const review = screen.getByRole('button', { name: 'Review' });
		review.focus();
		await user.keyboard('[Enter]');
		await user.keyboard('[Space]');
		view.detectChanges();
		expect(view.fixture.componentInstance.actions).toBe(2);
		await user.tab();
		expect(screen.getByRole('link', { name: 'Download document' })).toHaveFocus();
		expect(screen.getByRole('link', { name: 'Download document' })).toHaveAttribute('href', '#document');
		expect(screen.getByRole('link', { name: 'Download document' })).toHaveAttribute('download', 'document.txt');
		expect(view.container.querySelector('button button, button a, a button, a a')).toBeNull();
	});
	it('keeps a projected reaction independently keyboard actionable and accessible', async () => {
		const view = await render(Host);
		const user = userEvent.setup();
		const reaction = screen.getByRole('button', { name: 'Useful' });
		reaction.focus();
		await user.keyboard('[Space]');
		view.detectChanges();
		expect(reaction).toHaveAttribute('aria-pressed', 'true');
		expect(view.container.querySelector('caps-bubble-reactions')).toHaveAttribute('data-side', 'top');
		expect(view.container.querySelector('caps-bubble-reactions')).toHaveAttribute('data-align', 'start');
		expect((await axe.run(view.container)).violations).toEqual([]);
	});
});
