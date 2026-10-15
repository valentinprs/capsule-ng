// Shared template for every Lucide icon listed in lucide.figma.batch.json.
// `figma.batch.component` is the @ng-icons/lucide export name, e.g. `lucideAArrowDown`.
import figma from 'figma';

const icon: string = figma.batch.component;

export default {
	example: figma.code`<ng-icon name="${icon}" />`,
	imports: ["import { NgIcon, provideIcons } from '@ng-icons/core';", `import { ${icon} } from '@ng-icons/lucide';`],
	id: icon,
};
