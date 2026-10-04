import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { CapsButton } from '@capsule-ng/caps/button';
import { CapsPopoverImports } from '@capsule-ng/caps/popover';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideCheck, lucideChevronsUpDown, lucideSearch } from '@ng-icons/lucide';
import { HlmCommandImports } from '@spartan-ng/helm/command';
import { Model, ModelType } from '../data/models';

@Component({
	selector: 'spartan-model-selector',
	imports: [CapsPopoverImports, HlmCommandImports, NgIcon, CapsButton],
	providers: [provideIcons({ lucideChevronsUpDown, lucideSearch, lucideCheck })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'grid gap-3',
	},
	template: `
		<span capsLabel>Model</span>
		<caps-popover>
			<button id="select-preset" variant="outline" capsPopoverTrigger capsButton class="w-full flex-1 justify-between">
				{{ selectedModel() ? selectedModel()?.name : 'Load a model...' }}
				<ng-icon name="lucideChevronsUpDown" />
			</button>
			<ng-template capsPopoverContent let-ctx [class]="'w-full p-0'">
				<hlm-command>
					<hlm-command-input placeholder="Search Models" />
					<hlm-command-list>
						@for (type of types(); track type) {
							<hlm-command-group>
								<hlm-command-group-label>{{ type }}</hlm-command-group-label>
								@for (model of getModelsByType(type); track model.id) {
									<button hlm-command-item [value]="model.id" (click)="selectedModel.set(model); ctx.close()">
										{{ model.name }}
										<ng-icon
											name="lucideCheck"
											class="ml-auto"
											[class]="{
												'opacity-0': selectedModel()?.id !== model.id,
												'opacity-100': selectedModel()?.id === model.id,
											}"
										/>
									</button>
								}
							</hlm-command-group>
						}
					</hlm-command-list>
					<!-- Empty state -->
					<div *hlmCommandEmptyState hlmCommandEmpty>No results found.</div>
				</hlm-command>
			</ng-template>
		</caps-popover>
	`,
})
export class ModelSelector {
	public readonly models = input.required<Model[]>();
	public readonly types = input.required<ModelType[]>();
	public readonly selectedModel = signal<Model | null>(null);

	public getModelsByType(type: ModelType): Model[] {
		return this.models().filter((model) => model.type === type);
	}
}
