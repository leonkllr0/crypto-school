import { ref } from "vue";

export type QuizDetails = {
    title: string;
    buttonText: string;
    experimentCode: string;
};

export function useQuizPopup() {
    const showPopup = ref(false);

    const maybeShowPopup = (videoRef: HTMLVideoElement | null): boolean => {
        if (!videoRef) return false;
        if (
            videoRef.duration - videoRef.currentTime <= 10 &&
            !showPopup.value
        ) {
            showPopup.value = true;
            return true;
        }
        return false;
    };

    const hidePopup = () => {
        showPopup.value = false;
    };

    return {
        showPopup,
        maybeShowPopup,
        hidePopup,
    };
}
