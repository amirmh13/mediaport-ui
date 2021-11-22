import { IdTitleDto } from "@shared/models";
import { SceneDto } from ".";

export interface EpisodeWithSceneBrief extends IdTitleDto {
    progressPercent: number;
    scenes: Partial<SceneDto>[];
}