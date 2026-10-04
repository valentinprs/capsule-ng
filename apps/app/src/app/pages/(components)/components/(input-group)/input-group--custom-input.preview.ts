import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsButtonImports } from '@capsule-ng/caps/button';
import { CapsInputGroupImports } from '@capsule-ng/caps/input-group';
import { CapsTextareaImports } from '@capsule-ng/caps/textarea';

@Component({
	selector: 'spartan-input-group-custom-input-preview',
	imports: [CapsTextareaImports, CapsButtonImports, CapsInputGroupImports, CdkTextareaAutosize],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'grid w-full max-w-sm gap-6' },
	template: `
		<caps-input-group>
			<textarea
				capsTextarea
				placeholder="Autoresize textarea..."
				cdkTextareaAutosize
				class="flex min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
				aria-label="Autoresize textarea"
			></textarea>

			<caps-input-group-addon align="block-end">
				<button capsButton class="ml-auto" size="sm" variant="default" type="button">Submit</button>
			</caps-input-group-addon>
		</caps-input-group>
	`,
})
export class InputGroupCustomInputPreview {}
