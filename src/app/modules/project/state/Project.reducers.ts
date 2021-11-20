import { createReducer, on } from "@ngrx/store";
import { ProjectIdAction, ProjectNameAction } from "./Project.actions";

export interface ProjectState {
    projectId: number;
    projectName: string;
}


export const initialState: ProjectState = {
    projectId: 0,
    projectName: '',
}

export const projectReducer = createReducer(
    initialState,
    on(ProjectIdAction, (state, { projectId }) => {
        return { ...state, ...{ projectId } }
    }),
    on(ProjectNameAction, (state, { projectName }) => {
        return { ...state, ...{ projectName } }
    })
)