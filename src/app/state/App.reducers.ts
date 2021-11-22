import { createReducer, on } from "@ngrx/store";
import { SceneState } from "../modules/project/components/scenes/state/Scenes.reducers";
import { ProjectState } from "../modules/project/state/Project.reducers";
import { currentRouteAction } from "./App.actions";

export interface AppState {
    currentRoute: string;
}

export interface RootState {
    project: ProjectState;
    scenes: SceneState;
    app: AppState;
}

export const initialAppState: AppState = {
    currentRoute: '',
}

export const appReducer = createReducer(
    initialAppState,
    on(currentRouteAction, (state, { currentRoute }) => {
        return { ...state, ...{ currentRoute } }
    })
)