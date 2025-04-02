import type { route as routeFn } from "ziggy-js";
import { route } from "ziggy-js";

declare module "vue" {
    interface ComponentCustomProperties {
        route: typeof route;
    }
}
declare global {
    const route: typeof routeFn;
}

declare namespace NodeJS {
    interface Global {
        route?: typeof import("ziggy-js").route;
    }
}
