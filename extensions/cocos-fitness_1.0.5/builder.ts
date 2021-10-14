import { IBuildPlugin } from "../../@types";

export const configs: Record<string, IBuildPlugin> = {
    "android": {
        hooks: './hooks',
    }
}