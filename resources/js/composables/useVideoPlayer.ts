import { ref, onMounted, onBeforeUnmount } from "vue";

export function useVideoPlayer(
    videoRef: any,
    maybeShowPopup: (video: HTMLVideoElement | null) => boolean
) {
    const isPlaying = ref(false);
    const duration = ref(0);
    const currentTime = ref(0);
    const controlsVisible = ref(true);
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;

    const popupTriggered = ref(false); // ✅ added

    const refocusVideo = () => videoRef.value?.focus();

    const showControlsTemporarily = () => {
        controlsVisible.value = true;
        if (isPlaying.value) {
            if (hideTimeout) clearTimeout(hideTimeout);
            hideTimeout = setTimeout(() => {
                controlsVisible.value = false;
            }, 3000);
        }
    };

    const hideControls = () => {
        controlsVisible.value = false;
        if (hideTimeout) clearTimeout(hideTimeout);
    };

    const togglePlay = () => {
        if (!videoRef.value) return;
        isPlaying.value ? videoRef.value.pause() : videoRef.value.play();
    };

    const handleTimeUpdate = () => {
        const video = videoRef.value;
        if (!video) return;

        currentTime.value = video.currentTime;

        if (!popupTriggered.value) {
            const triggered = maybeShowPopup(video);
            if (triggered) popupTriggered.value = true;
        }
    };

    const seek = () => {
        if (videoRef.value) {
            videoRef.value.currentTime = currentTime.value;
        }
    };

    const onLoaded = () => {
        if (videoRef.value) {
            duration.value = videoRef.value.duration;
        }
    };

    const onEnded = () => {
        popupTriggered.value = true;
    };

    const toggleFullscreen = () => {
        const container = videoRef.value?.parentElement;
        if (!container) return;
        if (!document.fullscreenElement) {
            container.requestFullscreen?.();
        } else {
            document.exitFullscreen?.();
        }
    };

    const handleKey = (e: KeyboardEvent) => {
        const video = videoRef.value;
        if (!video) return;

        const active = document.activeElement;
        const isInput =
            active &&
            (active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA" ||
                active.tagName === "BUTTON" ||
                active.getAttribute("contenteditable") === "true");

        if (isInput) return;

        switch (e.key) {
            case "ArrowRight":
                video.currentTime = Math.min(
                    video.currentTime + 5,
                    duration.value
                );
                break;
            case "ArrowLeft":
                video.currentTime = Math.max(video.currentTime - 5, 0);
                break;
            case " ":
            case "Spacebar":
                e.preventDefault();
                togglePlay();
                break;
        }

        showControlsTemporarily();
    };

    onMounted(() => window.addEventListener("keydown", handleKey));
    onBeforeUnmount(() => window.removeEventListener("keydown", handleKey));

    const format = (s: number) => {
        const m = Math.floor(s / 60);
        const sec = Math.floor(s % 60)
            .toString()
            .padStart(2, "0");
        return `${m}:${sec}`;
    };

    return {
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
        popupTriggered,
    };
}
