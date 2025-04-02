<template>
    <div
        class="relative w-full aspect-video bg-background rounded-lg overflow-hidden shadow-md"
        @mousemove="showControlsTemporarily"
        @mouseleave="hideControls"
    >
        <img
            v-if="logo"
            :src="logo"
            alt="logo"
            class="absolute top-4 left-4 max-w-14 max-h-14 opacity-80 pointer-events-none z-10"
        />

        <video
            ref="videoRef"
            :src="videoUrl"
            class="w-full h-full"
            tabindex="-1"
            @click="togglePlay"
            @timeupdate="handleTimeUpdate"
            @ended="onEnded"
            @loadedmetadata="onLoaded"
            @pause="isPlaying = false"
            @play="isPlaying = true"
        />

        <transition name="fade">
            <div
                v-if="controlsVisible"
                class="absolute bottom-0 left-0 right-0 px-4 py-3 bg-gradient-to-t from-black/70 to-transparent flex flex-col z-10"
            >
                <input
                    type="range"
                    min="0"
                    :max="duration"
                    step="0.1"
                    v-model="currentTime"
                    @input="seek"
                    @mouseup="refocusVideo"
                    @touchend="refocusVideo"
                    class="w-full h-1 accent-primary mb-1 cursor-pointer"
                    :style="{
                        '--progress-color':
                            progressColor || 'var(--color-primary)',
                    }"
                />

                <div
                    class="flex justify-between items-center text-text text-sm"
                >
                    <div class="flex items-center space-x-4">
                        <button
                            @click="togglePlay"
                            class="hover:text-primary cursor-pointer"
                        >
                            <svg
                                v-if="!isPlaying"
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-7 w-7"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                            <svg
                                v-else
                                xmlns="http://www.w3.org/2000/svg"
                                class="h-7 w-7"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
                            </svg>
                        </button>

                        <span class="font-mono text-xs">
                            {{ format(currentTime) }} / {{ format(duration) }}
                        </span>
                    </div>

                    <button
                        @click="toggleFullscreen"
                        class="hover:text-primary cursor-pointer"
                    >
                        <svg
                            class="h-7 w-7 p-1"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384.97 384.97"
                            xml:space="preserve"
                        >
                            <path
                                d="M384.97 12.03c0-6.713-5.317-12.03-12.03-12.03H264.847c-6.833 0-11.922 5.39-11.934 12.223 0 6.821 5.101 11.838 11.934 11.838h96.062l-.193 96.519c0 6.833 5.197 12.03 12.03 12.03 6.833-.012 12.03-5.197 12.03-12.03l.193-108.369c0-.036-.012-.06-.012-.084.001-.037.013-.061.013-.097zM120.496 0H12.403c-.036 0-.06.012-.096.012-.024 0-.06-.012-.084-.012C5.51 0 .192 5.317.192 12.03L0 120.399c0 6.833 5.39 11.934 12.223 11.934 6.821 0 11.838-5.101 11.838-11.934l.192-96.339h96.242c6.833 0 12.03-5.197 12.03-12.03C132.514 5.197 127.317 0 120.496 0zM120.123 360.909H24.061v-96.242c0-6.833-5.197-12.03-12.03-12.03S0 257.833 0 264.667v108.092c0 .036.012.06.012.084 0 .036-.012.06-.012.096 0 6.713 5.317 12.03 12.03 12.03h108.092c6.833 0 11.922-5.39 11.934-12.223.001-6.82-5.1-11.837-11.933-11.837zM372.747 252.913c-6.833 0-11.85 5.101-11.838 11.934v96.062h-96.242c-6.833 0-12.03 5.197-12.03 12.03s5.197 12.03 12.03 12.03h108.092c.036 0 .06-.012.084-.012.036-.012.06.012.096.012 6.713 0 12.03-5.317 12.03-12.03V264.847c.001-6.833-5.389-11.934-12.222-11.934z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </transition>

        <QuizPopup
            :visible="showPopup"
            :title="quiz.title"
            :button-text="quiz.buttonText"
            @proceed="proceedQuiz()"
            @close="closeQuiz()"
        />
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import QuizPopup from "../components/QuizPopup.vue";
import { useVideoPlayer } from "../composables/useVideoPlayer";
import { useQuizPopup } from "../composables/useQuizPopup";
import type { QuizDetails } from "../composables/useQuizPopup";

const props = defineProps<{
    videoUrl: string;
    logo?: string;
    progressColor?: string;
    quiz: QuizDetails;
}>();

const videoRef = ref<HTMLVideoElement>();
const { showPopup, maybeShowPopup, hidePopup } = useQuizPopup();

const {
    isPlaying,
    duration,
    currentTime,
    controlsVisible,
    refocusVideo,
    showControlsTemporarily,
    hideControls,
    togglePlay,
    handleTimeUpdate,
    seek,
    onLoaded,
    onEnded,
    toggleFullscreen,
    format,
} = useVideoPlayer(videoRef, maybeShowPopup);

const proceedQuiz = () => {
    hidePopup();
    console.log("Implement quiz opening functionality here.");
    console.log("Quiz started");
    console.log("Sent data to amplitude or similar.");
};

const closeQuiz = () => {
    hidePopup();
    console.log("Quiz closed");
    console.log("Send data to amplitude or similar.");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
input[type="range"] {
    appearance: none;
    background: transparent;
    width: 100%;
    --progress-color: #ff0040;
}
input[type="range"]::-webkit-slider-thumb {
    appearance: none;
    width: 14px;
    height: 14px;
    background: white;
    border-radius: 50%;
    box-shadow: 0 0 6px #ffffff;
    margin-top: -4px;
}
input[type="range"]::-webkit-slider-runnable-track {
    height: 6px;
    background: var(--progress-color);
    border-radius: 3px;
    box-shadow: 0 0 4px var(--progress-color), 0 0 10px var(--progress-color);
}
input[type="range"]::-moz-range-track {
    height: 6px;
    background: var(--progress-color);
    border-radius: 4px;
}
input[type="range"]::-moz-range-thumb {
    width: 14px;
    height: 14px;
    background: white;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 6px white;
    cursor: pointer;
}
</style>
