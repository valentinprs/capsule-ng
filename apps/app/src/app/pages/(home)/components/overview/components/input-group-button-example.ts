import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerInfoCircle, tablerStar } from '@ng-icons/tabler-icons';

@Component({
	selector: 'spartan-input-group-button-example',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, NgIcon],
	providers: [
		provideIcons({
			tablerInfoCircle,
			tablerStar,
		}),
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-input-group class="[--radius:9999px]">
			<caps-input-group-addon>
				<button capsButton variant="secondary" size="icon-xs" type="button" aria-label="Website information">
					<ng-icon name="tablerInfoCircle" />
				</button>
			</caps-input-group-addon>

			<caps-input-group-addon class="text-muted-foreground pl-1.5">https://</caps-input-group-addon>
			<input capsInput id="input-secure-19" aria-label="Website address" />
			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					size="icon-xs"
					(click)="_toggleFavorite()"
					variant="ghost"
					type="button"
					aria-label="Favorite website"
					[attr.aria-pressed]="_isFavorite()"
				>
					<ng-icon name="tablerStar" [class]="_favoriteClass()" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupButtonExample {
	protected readonly _isFavorite = signal(false);

	protected readonly _favoriteClass = computed(() =>
		this._isFavorite() ? '[&>svg]:fill-primary [&>svg]:stroke-primary' : '',
	);

	protected _toggleFavorite(): void {
		this._isFavorite.update((f) => !f);
	}
}
