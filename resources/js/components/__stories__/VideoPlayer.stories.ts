import type { Meta, StoryObj } from "@storybook/vue3";
import VideoPlayer from "@/components/VideoPlayer.vue";
import * as QuizPopupStories from "./QuizPopup.stories";
import type { QuizDetails } from "@/composables/useQuizPopup";

const meta: Meta<typeof VideoPlayer> = {
    title: "Composite/VideoPlayer",
    component: VideoPlayer,
    tags: ["autodocs"],
    decorators: [
        () => ({
            template: '<div style="margin: 3em;"><story/></div>',
        }),
    ],
    parameters: {
        docs: {
            description: {
                component:
                    "The VideoPlayer component renders a video with custom controls and integrates a quiz popup using composables. It accepts a video URL, an optional logo, a progress bar color, and a quiz configuration. Use the composite stories to explore default and custom configurations.",
            },
        },
    },
    argTypes: {
        videoUrl: {
            control: "text",
            description: "The URL of the video to be played.",
            table: {
                category: "Props",
            },
        },
        logo: {
            control: "text",
            description: "Optional logo image URL displayed on the player.",
            table: {
                category: "Props",
            },
        },
        progressColor: {
            control: "color",
            description: "The color for the video progress bar.",
            table: {
                category: "Props",
                defaultValue: { summary: "#6c00ff" },
            },
        },
        quiz: {
            control: "object",
            description:
                "Configuration object for the quiz popup. Inherits default configuration from QuizPopup stories.",
            table: {
                category: "Props",
                defaultValue: { summary: "See QuizPopup.Default.args" },
            },
        },
    },
    args: {
        videoUrl:
            "https://crypto-school.lon1.digitaloceanspaces.com/example-video.mp4",
        logo: "https://picsum.photos/200/300",
        progressColor: "#6c00ff",
        quiz: {
            ...QuizPopupStories.Default.args,
        } as QuizDetails,
    },
};

export default meta;
type Story = StoryObj<typeof VideoPlayer>;

export const Default: Story = {
    args: {},
    parameters: {
        docs: {
            description: {
                story: "Default state of the VideoPlayer component using the inherited quiz configuration from QuizPopup.",
            },
        },
    },
};

export const CustomQuiz: Story = {
    args: {
        quiz: {
            title: "Custom Quiz Title",
            buttonText: "Start Quiz",
            experimentCode: "Quiz-C",
        },
    },
    parameters: {
        docs: {
            description: {
                story: "State of the VideoPlayer component with a custom quiz configuration overriding the default.",
            },
        },
    },
};
