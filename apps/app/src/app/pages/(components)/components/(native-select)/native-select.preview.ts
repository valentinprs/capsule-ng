import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
@Component({
	selector: 'spartan-native-select-preview',
	imports: [CapsNativeSelectImports],
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
		<select capsNativeSelect aria-label="Status">
			<option value="">Select status</option>
			<option value="todo">Todo</option>
			<option value="in-progress">In Progress</option>
			<option value="done">Done</option>
			<option value="cancelled">Cancelled</option>
		</select>
	`,
})
export class NativeSelectPreview {}

export const defaultImports = `
import { CapsNativeSelectImports } from '@capsule-ng/caps/native-select';
`;

export const defaultSkeleton = `
<select capsNativeSelect aria-label="Status">
  <option value="">Select a fruit</option>
  <option value="apple">Apple</option>
  <option value="banana">Banana</option>
  <option value="blueberry">Blueberry</option>
  <option value="pineapple">Pineapple</option>
</select>
`;
