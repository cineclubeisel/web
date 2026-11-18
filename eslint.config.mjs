import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
    { ignores: ['.astro/**', 'dist/**', 'node_modules/**'] },
    ...tseslint.configs.recommended,
    ...eslintPluginAstro.configs.recommended,
    eslintConfigPrettier,
]
