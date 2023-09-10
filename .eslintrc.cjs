module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: ['productsway/react'],
    ignorePatterns: [
        'dist',
        '.eslintrc.cjs',
        'vite.config.ts',
        'vitest.config.ts',
        'tsup.config.ts',
    ],
    plugins: ['react-refresh'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        '@typescript-eslint/naming-convention': 'off',
    },
};
