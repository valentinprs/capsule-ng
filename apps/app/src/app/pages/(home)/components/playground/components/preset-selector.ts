import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronsUpDown, lucideSearch } from '@ng-icons/lucide';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { Preset } from '../data/presets';

@Component({
	selector: 'spartan-preset-selector',
	imports: [CapsPopoverImports, HlmCommandImports, NgIcon, CapsButton],
	providers: [provideIcons({ lucideSearch, lucideCheck, lucideChevronsUpDown })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<caps-popover>
			<button
				id="select-preset"
				capsPopoverTrigger
				capsButton
				variant="outline"
				class="w-[300px] flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
			>
				{{ selectedPreset() ? selectedPreset()?.name : 'Load a preset...' }}
				<ng-icon name="lucideChevronsUpDown" />
			</button>
			<ng-template capsPopoverContent let-ctx [class]="'w-[300px] p-0'">
				<hlm-command>
					<hlm-command-input placeholder="Search Presets" />
					<hlm-command-list>
						<hlm-command-group>
							<hlm-command-group-label>Examples</hlm-command-group-label>

							@for (preset of presets(); track preset.id) {
								<button hlm-command-item [value]="preset.id" (click)="selectedPreset.set(preset); ctx.close()">
									{{ preset.name }}
									<ng-icon
										name="lucideCheck"
										class="ml-auto"
										[class]="{
											'opacity-0': selectedPreset()?.id !== preset.id,
											'opacity-100': selectedPreset()?.id === preset.id,
										}"
									/>
								</button>
							}
						</hlm-command-group>

						<hlm-command-separator />
					</hlm-command-list>

					<!-- Empty state -->
					<div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
				</hlm-command>
			</ng-template>
		</caps-popover>
	`,
})
export class PresetSelector {
	public readonly presets = input.required<Preset[]>();
	public readonly selectedPreset = signal<Preset | undefined>(undefined);
}
