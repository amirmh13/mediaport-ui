import { SceneDto } from "./SceneDto.model";

export class SceneDetail extends SceneDto {
    previousSceneId: number = 0;
    nextSceneId: number = 0;
}