import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    {
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.node
            }
        },
        ignores: [
            // Any ignored files go here!
        ],
        rules: {
            // Any rule overrides go here!
        }
    }
]