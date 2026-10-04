import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tablerCheck, tablerCopy, tablerInfoCircle, tablerStar } from '@ng-icons/tabler-icons';

import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputImports } from '@capsule-ng/caps/input';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';

@Component({
	selector: 'spartan-input-group-button-preview',
	imports: [CapsButtonImports, CapsInputImports, CapsInputGroupImports, CapsPopoverImports, NgIcon],
	providers: [provideIcons({ tablerCheck, tablerCopy, tablerInfoCircle, tablerStar })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<input
				capsInput
				placeholder="https://github.com/valentinprs/capsule-ng"
				readOnly
				aria-label="https://github.com/valentinprs/capsule-ng"
			/>
			<caps-input-group-addon align="inline-end">
				<button
					capsButton
					aria-label="Copy"
					title="Copy"
					size="icon-xs"
					(click)="_copy('https://github.com/valentinprs/capsule-ng')"
					variant="ghost"
					type="button"
				>
					<ng-icon [name]="_isCopied() ? 'tablerCheck' : 'tablerCopy'" />
				</button>
			</caps-input-group-addon>
		</caps-input-group>
		<caps-popover placement="bottom-start">
			<caps-input-group class="[--radius:9999px]">
				<caps-input-group-addon>
					<button
						capsButton
						variant="secondary"
						size="icon-xs"
						capsPopoverTrigger
						aria-label="Connection information"
						type="button"
					>
						<ng-icon name="tablerInfoCircle" />
					</button>
				</caps-input-group-addon>

				<caps-input-group-addon class="text-muted-foreground pl-1.5">https://</caps-input-group-addon>
				<input capsInput id="input-secure-19" aria-label="Website address" />
				<caps-input-group-addon align="inline-end">
					<button
						capsButton
						size="icon-xs"
						aria-label="Toggle favorite"
						(click)="_toggleFavorite()"
						variant="ghost"
						type="button"
					>
						<ng-icon name="tablerStar" [class]="_favoriteClass()" />
					</button>
				</caps-input-group-addon>
			</caps-input-group>
			<ng-template capsPopoverContent let-ctx [class]="'flex flex-col gap-1 rounded-xl text-sm'">
				<p class="font-medium">Your connection is not secure.</p>
				<p>You should not enter any sensitive information on this site.</p>
			</ng-template>
		</caps-popover>
		<caps-input-group>
			<input capsInput placeholder="Type to search..." aria-label="Type to search" />
			<caps-input-group-addon align="inline-end">
				<button capsButton variant="secondary" size="xs" type="button">Search</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupButtonPreview {
	protected readonly _isCopied = signal(false);
	protected readonly _isFavorite = signal(false);
	protected readonly _favoriteClass = computed(() =>
		this._isFavorite() ? '[&>svg]:fill-blue-600 [&>svg]:stroke-blue-600' : '',
	);

	protected _copy(text: string) {
		void navigator.clipboard.writeText(text);
		this._isCopied.set(true);

		setTimeout(() => {
			this._isCopied.set(false);
		}, 3000);
	}

	protected _toggleFavorite(): void {
		this._isFavorite.update((f) => !f);
	}
}
