import { CapsInputOtp, CapsInputOtpGroup, CapsInputOtpSeparator, CapsInputOtpSlot } from '@capsule-ng/caps/input-otp';
import { type Meta, type StoryObj, moduleMetadata } from '@storybook/angular';

type OtpArgs = {
	length: number;
	inputMode: ReturnType<CapsInputOtp['inputMode']>;
	autocomplete: ReturnType<CapsInputOtp['autocomplete']>;
	autofocus: boolean;
	disabled: boolean;
	value: string | null;
};

const meta: Meta<OtpArgs> = {
	title: 'Input OTP',
	component: CapsInputOtp,
	tags: ['autodocs'],
	args: {
		length: 6,
		inputMode: 'numeric',
		autocomplete: 'one-time-code',
		autofocus: false,
		disabled: false,
		value: '',
	},
	argTypes: {
		length: { control: 'number' },
		inputMode: { control: 'select', options: ['text', 'tel', 'url', 'email', 'numeric', 'decimal', 'search'] },
		autocomplete: { control: 'select', options: ['one-time-code', 'off'] },
	},
	decorators: [
		moduleMetadata({
			imports: [CapsInputOtp, CapsInputOtpGroup, CapsInputOtpSeparator, CapsInputOtpSlot],
		}),
	],
	render: ({ ...args }) => ({
		props: args,
		template: `
		<caps-input-otp aria-label="Verification code" [length]="length" [inputMode]="inputMode" [autocomplete]="autocomplete" [autofocus]="autofocus" [disabled]="disabled" [value]="value">
			<caps-input-otp-group>
				<caps-input-otp-slot index="0" />
				<caps-input-otp-slot index="1" />
				<caps-input-otp-slot index="2" />
			</caps-input-otp-group>
			<caps-input-otp-separator />
			<caps-input-otp-group>
				<caps-input-otp-slot index="3" />
				<caps-input-otp-slot index="4" />
				<caps-input-otp-slot index="5" />
			</caps-input-otp-group>
		</caps-input-otp>
		`,
	}),
};

export default meta;

type Story = StoryObj<OtpArgs>;

export const Default: Story = {
	args: {},
};
