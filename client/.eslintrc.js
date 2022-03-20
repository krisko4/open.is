module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "airbnb-typescript",
        'plugin:react/recommended',
    ],
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            node: {
                paths: ['src'],
                extensions: ['.js', '.ts', '.d.ts', '.tsx'],
            },
        },
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: ["tsconfig.json"],
        createDefaultProgram: true,
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: ['.eslintrc.js'],
    plugins: [
        'unused-imports',
        'import',
        'react',
        '@typescript-eslint',
    ],
    rules: {    
        "@typescript-eslint/no-unused-vars": ["error"],
        "react/react-in-jsx-scope": "off",
        "no-unused-vars": "off",
        "unused-imports/no-unused-imports": "error",
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
    },
};
