import { CapsInputOtp } from './lib/caps-input-otp';
import { CapsInputOtpGroup, CapsInputOtpSeparator, CapsInputOtpSlot } from './lib/caps-input-otp-slot';

export * from './lib/caps-input-otp';
export * from './lib/caps-input-otp-slot';

export const CapsInputOtpImports = [CapsInputOtp, CapsInputOtpGroup, CapsInputOtpSeparator, CapsInputOtpSlot] as const;
