<template>
    <div
        class="min-h-screen flex flex-col bg-background text-text font-display"
    >
        <header class="bg-background border-b border-primary/40 shadow-md z-50">
            <div
                class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0"
            >
                <a :href="route('home')" class="flex items-center space-x-3">
                    <div class="w-3 h-3 bg-primary rounded-full animate-ping" />
                    <img
                        :src="layoutConfig.logo"
                        :alt="layoutConfig.brandName"
                        class="h-8 sm:h-10 w-auto drop-shadow-[var(--glow-primary)]"
                    />
                </a>

                <nav class="space-x-6 text-base font-semibold tracking-wide">
                    <template v-for="item in layoutConfig.nav" :key="item.href">
                        <Link
                            v-if="item.inner"
                            :href="item.href"
                            :class="['text-subtle transition', item.color]"
                        >
                            {{ item.label }}
                        </Link>
                        <a
                            v-else
                            target="_blank"
                            :href="item.href"
                            :class="['text-subtle transition', item.color]"
                        >
                            {{ item.label }}
                        </a>
                    </template>
                </nav>
            </div>
        </header>

        <main class="flex-1 w-full max-w-6xl mx-auto px-6 py-10">
            <slot />
        </main>

        <footer
            class="bg-background border-t border-secondary/40 text-center text-sm text-subtle tracking-wide"
        >
            <div class="max-w-6xl mx-auto px-6 py-6">
                <p>
                    © {{ new Date().getFullYear() }}
                    <span class="text-primary font-semibold">
                        {{ layoutConfig.brandName }}
                    </span>
                    — {{ layoutConfig.footerTagline }}
                </p>
                <p class="mt-2 text-accent">
                    {{ layoutConfig.footerSystemMessage }}
                </p>
            </div>
        </footer>
    </div>
</template>

<script setup lang="ts">
import { Link, usePage } from "@inertiajs/vue3";

const layoutConfig = usePage().props.layoutConfig as {
    brandName: string;
    logo: string;
    nav: { label: string; href: string; color: string; inner: boolean }[];
    footerTagline: string;
    footerSystemMessage: string;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap");

.font-display {
    font-family: var(--font-display);
}
</style>
