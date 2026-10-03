import { Component } from '@angular/core';
import { CapsCheckboxImports } from '@capsule-ng/caps/checkbox';
import { CapsFieldImports } from '@capsule-ng/caps/field';

@Component({
	selector: 'spartan-field-checkbox-preview',
	imports: [CapsFieldImports, CapsCheckboxImports],
	host: {
		class: 'w-full max-w-md',
	},
	template: `
		<caps-field-group>
			<caps-field-set>
				<caps-field-legend variant="label">Show these items on the desktop</caps-field-legend>
				<caps-field-description>Select the items you want to show on the desktop.</caps-field-description>
				<caps-field-group class="gap-3">
					<caps-field orientation="horizontal">
						<caps-checkbox id="field-hard-disks" />
						<caps-field-label for="field-hard-disks" class="font-normal">Hard disks</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<caps-checkbox id="field-external-disks" />
						<caps-field-label for="field-external-disks" class="font-normal">External disks</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<caps-checkbox id="field-cds-dvds-ipods" />
						<caps-field-label for="field-cds-dvds-ipods" class="font-normal">CDs, DVDs, and IPods</caps-field-label>
					</caps-field>
					<caps-field orientation="horizontal">
						<caps-checkbox id="field-connected-servers" />
						<caps-field-label for="field-connected-servers" class="font-normal">Connected servers</caps-field-label>
					</caps-field>
				</caps-field-group>
			</caps-field-set>
			<caps-field-separator />
			<caps-field orientation="horizontal">
				<caps-checkbox id="field-sync-desktop-documents" [checked]="true" />
				<caps-field-content>
					<caps-field-label for="field-sync-desktop-documents">Sync Desktop & Documents folders</caps-field-label>
					<caps-field-description>
						Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.
					</caps-field-description>
				</caps-field-content>
			</caps-field>
		</caps-field-group>
	`,
})
export class FieldCheckboxPreview {}
