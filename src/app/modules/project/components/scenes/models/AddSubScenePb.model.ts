import { AddScenePb } from ".";

export interface AddSubScenePb extends AddScenePb {
    projectEpisodeSceneId: number;
    subOrder: string;
}