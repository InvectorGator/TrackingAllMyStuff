import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import esLintPlugin from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => {
    // Configure the API and Vite paths...
    const ENV = loadEnv(mode, process.cwd(), '');
    // Determine the API (server) base path Vite will connect to.
    const API_PORT = ENV.VITE_API_PORT === '' ? '' : ENV.VITE_API_PORT === undefined ? 5025 : ENV.VITE_API_PORT;
    const API_PATH_WITH_PORT = (ENV.VITE_API_BASE_URL || "http://localhost") + (API_PORT === '' ? '' : ":" + API_PORT);
    // Determine the Vite client settings.
    const VITE_PORT = ENV.VITE_PORT === '' ? '' : ENV.VITE_PORT === undefined ? 5026 : ENV.VITE_PORT;
    const VITE_BASE = ENV.VITE_BASE || "/";
    const VITE_RUN_AS_HOST = !(Boolean(ENV.VITE_RUN_AS_HOST) === false);
    // Display purposes only - determine the Vite client URL to display.
    const VITE_PATH = ENV.VITE_BASE_URL || "http://localhost";

    // Log paths to console for visibility.
    console.log("Now starting WhereIsMyStuff: ");
    console.log(`   Client Path:    ${VITE_PATH}${VITE_PORT === '' ? '' : `:${VITE_PORT}`}${VITE_BASE}`);
    console.log(`   API Path:       ${API_PATH_WITH_PORT}`);

    // Configure Vite
    return {
        base: VITE_BASE,
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
            host: VITE_RUN_AS_HOST,
            proxy: {
                '/api': {
                    target: API_PATH_WITH_PORT,
                    changeOrigin: true
                }
            }
        }
    };
});