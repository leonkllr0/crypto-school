<template>
    <Head :title="lesson.title" />

    <section class="text-center max-w-3xl mx-auto mt-10">
        <h1 class="text-4xl font-extrabold text-primary mb-4">
            {{ lesson.title }}
        </h1>

        <p class="text-white/80 text-lg">
            {{ lesson.desc }}
        </p>

        <div class="mt-10">
            <VideoPlayer
                :video-url="lesson.videoUrl"
                :logo="lesson.logo"
                :quiz="lesson.quiz"
                :progress-color="lesson?.progressBarColor || '#6c00ff'"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import { Head } from "@inertiajs/vue3";
import Layout from "@/layouts/GuestLayout.vue";
import VideoPlayer from "@/components/VideoPlayer.vue";
import type { QuizDetails } from "@/composables/useQuizPopup";

defineOptions({ layout: Layout });

const props = defineProps<{
    lesson: {
        id: number;
        title: string;
        desc: string;
        logo: string;
        videoUrl: string;
        progressBarColor: string;
        quiz: QuizDetails;
    };
}>();
</script>
