import type { Meta, StoryObj } from "@storybook/vue3";
import QuizPopup from "@/components/QuizPopup.vue";

const meta: Meta<typeof QuizPopup> = {
    title: "Components/QuizPopup",
    component: QuizPopup,
    tags: ["autodocs"],
    argTypes: {
        visible: {
            control: "boolean",
            description: "Controls visibility of the popup.",
            table: {
                category: "Props",
                defaultValue: { summary: "false" },
            },
        },
        title: {
            control: "text",
            description: "Title displayed in the popup.",
            table: {
                category: "Props",
                defaultValue: { summary: `"Enjoyed it?"` },
            },
        },
        buttonText: {
            control: "text",
            description: "CTA button label text.",
            table: {
                category: "Props",
                defaultValue: { summary: `"Take Quiz"` },
            },
        },

        // Events
        onClose: {
            action: "close",
            description: "Emitted when the popup is closed (X button or CTA).",
            table: { category: "Events" },
        },
        onProceed: {
            action: "proceed",
            description: "Emitted when the CTA button is clicked.",
            table: { category: "Events" },
        },
    },
    args: {
        visible: true,
        title: "Enjoyed it?",
        buttonText: "Take Quiz",
    },
    parameters: {
        docs: {
            description: {
                component:
                    "The `QuizPopup` component displays a modal call-to-action prompt. Common use-case: encourage user interaction at the end of video playback.",
            },
        },
    },
};

export default meta;
type Story = StoryObj<typeof QuizPopup>;

export const Default: Story = {
    name: "Default Popup",
    render: (args) => ({
        components: { QuizPopup },
        setup: () => ({ args }),
        template: `
            <div class="min-h-[350px]">
                <QuizPopup
                    v-bind="args"
                    @close="args.onClose"
                    @proceed="args.onProceed"
                />
            </div>
        `,
    }),
    parameters: {
        docs: {
            description: {
                story: "Displays the popup with title and CTA. Emits `close` and `proceed` events when buttons are clicked.",
            },
        },
    },
};
