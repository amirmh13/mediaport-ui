import { createReducer, on } from "@ngrx/store";
import { episodeIdAction } from "./Scenes.actions";

export interface SceneState {
    episodeId: number;
}

const initialState: SceneState = {
    episodeId: 0,
}

export const sceneReducer = createReducer(
    initialState,
    on(episodeIdAction, (state, { episodeId }) => ({ ...state, ...{ episodeId } })),
);