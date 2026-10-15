import { CapsCommand } from './lib/caps-command';
import { CapsCommandDialog } from './lib/caps-command-dialog';
import { CapsCommandInput, CapsCommandInputControl } from './lib/caps-command-input';
import { CapsCommandItem } from './lib/caps-command-item';
import {
	CapsCommandEmpty,
	CapsCommandGroup,
	CapsCommandGroupLabel,
	CapsCommandList,
	CapsCommandSeparator,
	CapsCommandShortcut,
} from './lib/caps-command-structure';
export {
	provideBrnCommandConfig as provideCapsCommandConfig,
	type CommandFilter as CapsCommandFilter,
} from '@spartan-ng/brain/command';
export * from './lib/caps-command';
/** @internal Required by Angular packaging. */
export { CapsCommandBehavior as ɵCapsCommandBehavior } from './lib/caps-command-behavior';
export * from './lib/caps-command-dialog';
export * from './lib/caps-command-input';
export * from './lib/caps-command-item';
export * from './lib/caps-command-structure';
export const CapsCommandImports = [
	CapsCommand,
	CapsCommandDialog,
	CapsCommandInput,
	CapsCommandInputControl,
	CapsCommandItem,
	CapsCommandList,
	CapsCommandGroup,
	CapsCommandGroupLabel,
	CapsCommandEmpty,
	CapsCommandSeparator,
	CapsCommandShortcut,
] as const;
