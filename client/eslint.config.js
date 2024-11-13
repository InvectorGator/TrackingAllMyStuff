import pluginVue from 'eslint-plugin-vue';
import js from '@eslint/js';
import globals from 'globals';

export default [
    js.configs.recommended,
    ...pluginVue.configs['flat/recommended'],
    {
        languageOptions: {
            sourceType: "module",
            globals: {
                ...globals.node,
                ...globals.browser
            }
        },
        ignores: [
            // Any ignored files go here!
        ],
        rules: {
            // Any rule overrides go here!
            "vue/html-indent": ["error", 4]
        }
    }
]