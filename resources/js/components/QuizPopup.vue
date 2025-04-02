<template>
    <transition name="fade">
        <div
            v-if="visible"
            class="absolute inset-0 bg-background/80 backdrop-blur flex flex-col justify-center items-center text-center p-8 z-20"
        >
            <button
                @click="handleClose"
                class="absolute top-4 right-4 text-text/50 hover:text-text text-xl cursor-pointer"
                aria-label="Close"
            >
                &times;
            </button>

            <h3 class="text-lg font-bold text-text mb-3">{{ title }}</h3>
            <button
                @click="handleAction"
                class="px-4 py-2 bg-primary hover:bg-secondary text-text rounded text-xs uppercase font-semibold cursor-pointer"
            >
                {{ buttonText }}
            </button>
        </div>
    </transition>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        visible: boolean;
        title: string;
        buttonText: string;
    }>(),
    {
        visible: false,
        title: "Enjoyed it?",
        buttonText: "Take Quiz",
    }
);

const emit = defineEmits<{
    (e: "close"): void;
    (e: "proceed"): void;
}>();

const handleAction = () => {
    emit("proceed");
};

const handleClose = () => {
    emit("close");
};
</script>
