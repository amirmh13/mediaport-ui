import { createReducer, on } from "@ngrx/store";
import { episodeIdAction, sceneIdAction } from "./Scenes.actions";

export interface SceneState {
    episodeId: number;
    sceneId: number;
}

const initialState: SceneState = {
    episodeId: 0,
    sceneId: 0,
}

export const sceneReducer = createReducer(
    initialState,
    on(episodeIdAction, (state, { episodeId }) => ({ ...state, ...{ episodeId } })),
    on(sceneIdAction, (state, { sceneId }) => ({ ...state, ...{ sceneId } })),
);