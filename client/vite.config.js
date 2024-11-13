import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import esLintPlugin from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
    // Configure the API and Vite paths.
    const ENV = loadEnv(mode, process.cwd(), '');
    const API_PORT = ENV.VITE_API_PORT === '' ? '' : ENV.VITE_API_PORT === undefined ? 5025 : ENV.VITE_API_PORT;
    const API_PATH = ENV.VITE_API_BASE_URL || "http://localhost" + (API_PORT === '' ? '' : ":" + API_PORT);
    const VITE_PORT = ENV.VITE_PORT === '' ? '' : ENV.VITE_PORT === undefined ? 5026 : ENV.VITE_PORT;
    const VITE_PATH = ENV.VITE_BASE_URL || "http://localhost";

    // Log paths to console for visibility.
    console.log("Now starting WhereIsMyStuff: ");
    console.log(`   Client Path:    ${VITE_PATH}${VITE_PORT === '' ? '' : `:${VITE_PORT}`}`);
    console.log(`   API Path:       ${API_PATH}`);

    // Configure Vite
    return {
        base: VITE_PATH,
        plugins: [
            vue({
                template: { transformAssetUrls }
            }),
            quasar({
                autoImportComponentCase: 'kebab',
                sassVariables: '/src/styles/quasar-variables.sass',
            }),
            esLintPlugin()
        ],
        server: {
            port: VITE_PORT,
            proxy: {
                '/api': {
                    target: API_PATH,
                    changeOrigin: true
                }
            }
        }
    };
});