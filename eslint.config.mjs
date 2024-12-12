import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'warn',
      // 'indent': ['error', 2],
      'quotes': ['error', 'single'],
      '@typescript-eslint/no-var-requires': 'error',
      'no-unused-vars': 'error',
      'linebreak-style': 'off',
      '@typescript-eslint/no-explicit-any': 'off' // Disable the rule
    }
  }
];

export default eslintConfig;
