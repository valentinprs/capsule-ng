export const tailwindImports = `@import "@capsule-ng/caps/foundations.css";`;
export const spartanPresetImport = `/* Brain, Nova, Capsule and font faces are included by foundations.css. */`;
export const cssVariables = `/* Optional application overrides, after the shared foundations import. */
:root {
  --caps-font-sans: 'Inter', sans-serif;
}
/* Set class="dark" for the dark theme; class="style-nova" enables retained Helm components. */`;

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
