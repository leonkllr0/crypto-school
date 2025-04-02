import type { StorybookConfig } from "@storybook/vue3-vite";

const config: StorybookConfig = {
    stories: [
        "../resources/js/components/stories/**/*.stories.@(js|ts|jsx|tsx)",
        "../resources/js/components/**/*.stories.@(js|ts|jsx|tsx)",
    ],
    addons: ["@storybook/addon-essentials", "@chromatic-com/storybook"],
    async viteFinal(config) {
        // Merge custom configuration into the default config
        const { mergeConfig } = await import("vite");

        return mergeConfig(config, {
            // Add dependencies to pre-optimization
            optimizeDeps: {
                include: ["storybook-dark-mode"],
            },
        });
    },
    core: {
        builder: "@storybook/builder-vite", // 👈 The builder enabled here.
    },
    framework: {
        name: "@storybook/vue3-vite",
        options: {},
    },
};
export default config;
