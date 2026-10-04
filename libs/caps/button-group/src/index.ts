import { CapsSeparator } from '@capsule-ng/caps/separator';
import { CapsButtonGroup } from './lib/caps-button-group';
import { CapsButtonGroupText } from './lib/caps-button-group-text';
export * from './lib/caps-button-group';
export * from './lib/caps-button-group-text';
export const CapsButtonGroupImports = [CapsButtonGroup, CapsButtonGroupText, CapsSeparator] as const;
