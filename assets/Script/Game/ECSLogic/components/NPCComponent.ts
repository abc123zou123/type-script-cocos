/**
 * COPYRIGHT 2021 ALL RESERVED. (C) liaoyulei, https://github.com/dualface
 */

import { ECSComponent } from "../../../3rd/ECS/ECSComponent";
import { ecsclass } from "../../../3rd/ECS/__private";


/**
 * 将实体标记为 NPC
 */
@ecsclass("NPCComponent")
export class NPCComponent extends ECSComponent {}
