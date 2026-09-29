import { CAPS_TOKENS_CSS } from '@spartan-ng/styles';

export const tailwindImports = `
@layer theme, base, components, utilities;
@import "tailwindcss/theme.css" layer(theme);
@import "tailwindcss/preflight.css" layer(base);
@import "tailwindcss/utilities.css";
`;

export const spartanPresetImport = `@import "@spartan-ng/brain/hlm-tailwind-preset.css";`;

export const cssVariables = `
:root {
  --font-sans: 'Geist Sans', sans-serif;
  --radius: 0.625rem;
}

${CAPS_TOKENS_CSS}`;

export const tailwindAutocompletion = `
{
  "tailwindCSS.classFunctions": ["hlm", "cva", "classes"]
}
`;
export const tailwindPrettierSorting = `
{
  "tailwindFunctions": ["hlm", "cva", "classes"]
}
`;
