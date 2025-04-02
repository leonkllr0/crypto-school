import type { Page } from "@inertiajs/core";
import type { SharedData } from "./index"; // or just reference directly if in same file

declare module "@vue/runtime-core" {
    interface ComponentCustomProperties {
        $page: Page<SharedData>;
    }
}
