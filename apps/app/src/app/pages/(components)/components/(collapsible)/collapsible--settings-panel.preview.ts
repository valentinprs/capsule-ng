import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsCardImports } from '@capsule-ng/caps/card';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { CapsInput } from '@capsule-ng/caps/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMaximize, lucideMinimize } from '@ng-icons/lucide';
import { HlmCollapsibleImports } from '@spartan-ng/helm/collapsible';

@Component({
	selector: 'spartan-collapsible-settings-panel',
	imports: [CapsCardImports, CapsFieldImports, HlmCollapsibleImports, CapsButtonImports, NgIcon, CapsInput],
	providers: [provideIcons({ lucideMinimize, lucideMaximize })],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'mx-auto w-full max-w-xs' },
	template: `
		<caps-card density="compact">
			<caps-card-header>
				<caps-card-title>Radius</caps-card-title>
				<caps-card-description>Set the corner radius of the element.</caps-card-description>
			</caps-card-header>
			<caps-card-content>
				<hlm-collapsible #collapsible="brnCollapsible" class="flex items-start gap-2">
					<caps-field-group class="grid w-full grid-cols-2 gap-2">
						<caps-field>
							<caps-field-label for="radius-x" class="sr-only">Radius X</caps-field-label>
							<input capsInput id="radius-x" placeholder="0" value="0" />
						</caps-field>
						<caps-field>
							<caps-field-label for="radius-y" class="sr-only">Radius Y</caps-field-label>
							<input capsInput id="radius-y" placeholder="0" value="0" />
						</caps-field>
						<hlm-collapsible-content class="col-span-full grid grid-cols-subgrid gap-2">
							<caps-field>
								<caps-field-label for="radius-bottom-left" class="sr-only">Radius Bottom Left</caps-field-label>
								<input capsInput id="radius-bottom-left" placeholder="0" value="0" />
							</caps-field>
							<caps-field>
								<caps-field-label for="radius-bottom-right" class="sr-only">Radius Bottom Right</caps-field-label>
								<input capsInput id="radius-bottom-right" placeholder="0" value="0" />
							</caps-field>
						</hlm-collapsible-content>
					</caps-field-group>
					<button hlmCollapsibleTrigger capsButton variant="outline" size="icon">
						<ng-icon [name]="collapsible.expanded() ? 'lucideMinimize' : 'lucideMaximize'" />
						<span class="sr-only">Toggle</span>
					</button>
				</hlm-collapsible>
			</caps-card-content>
		</caps-card>
	`,
})
export class CollapsibleSettingsPanel {}
