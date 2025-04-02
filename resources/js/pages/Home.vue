<script setup lang="ts">
import { Head, Link } from "@inertiajs/vue3";
import Layout from "@/layouts/GuestLayout.vue";

const props = withDefaults(
    defineProps<{
        hero?: { image: string; title: string; subtitle: string };
        lessons?: { id: number; title: string; desc: string }[];
    }>(),
    {
        hero: () => ({
            image: "",
            title: "Default Title",
            subtitle: "Default subtitle",
        }),
        lessons: () => [],
    }
);

defineOptions({ layout: Layout });
</script>

<template>
    <Head title="Welcome" />

    <div
        class="absolute inset-0 -z-10 bg-[radial-gradient(#6c00ff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03] animate-pulse"
    />

    <section class="relative text-center mb-14">
        <img
            :src="hero.image"
            alt="Cyberpunk character"
            class="w-full max-h-[360px] object-cover rounded-xl shadow-lg mb-8 mx-auto"
        />

        <h2
            class="text-4xl sm:text-5xl font-extrabold text-[#ff0040] uppercase glitch"
            data-text="LEVEL UP YOUR SKILLS"
        >
            {{ hero.title }}
        </h2>
        <div
            class="h-1 w-24 mx-auto bg-[#ff0040] rounded-full mt-4 animate-pulse"
        />
        <p class="text-white/80 text-lg max-w-3xl mx-auto mt-6 tracking-wide">
            {{ hero.subtitle }}
        </p>
    </section>

    <section class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
            v-for="lesson in lessons"
            :key="lesson.id"
            class="bg-[#1a1a1a] border border-[#6c00ff]/40 hover:border-[#ff0040] hover:shadow-[0_0_16px_#ff0040] transition duration-300 rounded-lg p-6 shadow-md"
        >
            <h3 class="text-xl font-bold text-[#00c3ff] mb-2">
                {{ lesson.title }}
            </h3>
            <p class="text-white/70">{{ lesson.desc }}</p>
            <Link
                :href="route('lessons.show', lesson.id)"
                class="inline-block mt-4 px-4 py-2 bg-[#ff0040] hover:bg-[#6c00ff] text-white text-xs font-bold uppercase tracking-wider rounded transition"
            >
                Enter Lesson
            </Link>
        </div>
    </section>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;800&display=swap");

.font-orbitron {
    font-family: "Orbitron", sans-serif;
}

.glitch {
    position: relative;
    color: #ff0040;
}
.glitch::before,
.glitch::after {
    content: attr(data-text);
    position: absolute;
    left: 0;
    width: 100%;
    overflow: hidden;
}
.glitch::before {
    top: -1px;
    color: #00c3ff;
    z-index: -1;
    animation: glitchTop 2s infinite linear alternate-reverse;
}
.glitch::after {
    top: 1px;
    color: #6c00ff;
    z-index: -2;
    animation: glitchBot 2s infinite linear alternate-reverse;
}

@keyframes glitchTop {
    0% {
        clip-path: inset(0 0 85% 0);
    }
    100% {
        clip-path: inset(0 0 10% 0);
    }
}
@keyframes glitchBot {
    0% {
        clip-path: inset(90% 0 0 0);
    }
    100% {
        clip-path: inset(5% 0 0 0);
    }
}
</style>
