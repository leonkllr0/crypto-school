import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
import { renderToString } from "@vue/server-renderer";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createSSRApp, h } from "vue";
import { route as ziggyRoute } from "ziggy-js";
import type { Config } from "ziggy-js";

const appName = import.meta.env.VITE_APP_NAME || "CyberStream";

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => `${title} - ${appName}`,
        resolve: (name) =>
            resolvePageComponent(
                `./pages/${name}.vue`,
                import.meta.glob("./pages/**/*.vue")
            ),
        setup({ App, props, plugin }) {
            const app = createSSRApp({ render: () => h(App, props) });

            const ziggy = page.props.ziggy as Config;

            const ziggyConfig: Config = {
                ...ziggy,
                location:
                    typeof ziggy.location === "string" ||
                    ziggy.location instanceof URL
                        ? new URL(ziggy.location)
                        : new URL("http://localhost"),
            };

            const route = (name: string, params?: any, absolute?: boolean) =>
                ziggyRoute(name, params, absolute, ziggyConfig);

            app.config.globalProperties.route = route;

            if (typeof window === "undefined") {
                global.route = route;
            }

            app.use(plugin);

            return app;
        },
    })
);
