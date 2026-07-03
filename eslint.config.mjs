import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      // Aqui você pode adicionar ou sobrescrever regras do ESLint
      // Exemplo: desativar o aviso para 'any'
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  }
);
