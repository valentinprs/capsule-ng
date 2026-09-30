import { Component } from '@angular/core';
import { CapsFieldImports } from '@capsule-ng/caps/field';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';

@Component({
	selector: 'spartan-field-checkbox-preview',
	imports: [CapsFieldImports, HlmCheckboxImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-group>
			<fieldset capsFieldSet>
				<legend capsFieldLegend variant="label">Show these items on the desktop</legend>
				<caps-field-description>Select the items you want to show on the desktop.</caps-field-description>
				<caps-field-group class="gap-3">
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-hard-disks" />
						<label capsLabel for="field-hard-disks" class="font-normal">Hard disks</label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-external-disks" />
						<label capsLabel for="field-external-disks" class="font-normal">External disks</label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-cds-dvds-ipods" />
						<label capsLabel for="field-cds-dvds-ipods" class="font-normal">CDs, DVDs, and IPods</label>
					</caps-field>
					<caps-field orientation="horizontal">
						<hlm-checkbox inputId="field-connected-servers" />
						<label capsLabel for="field-connected-servers" class="font-normal">Connected servers</label>
					</caps-field>
				</caps-field-group>
			</fieldset>
			<caps-field-separator />
			<caps-field orientation="horizontal">
				<hlm-checkbox inputId="field-sync-desktop-documents" [checked]="true" />
				<caps-field-content>
					<label capsLabel for="field-sync-desktop-documents">Sync Desktop & Documents folders</label>
					<caps-field-description>
						Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.
					</caps-field-description>
				</caps-field-content>
			</caps-field>
		</caps-field-group>
	`,
})
export class FieldCheckboxPreview {}
