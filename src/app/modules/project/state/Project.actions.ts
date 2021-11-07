import { createAction, props } from "@ngrx/store";

export const ProjectIdAction = createAction('[Project] set ProjectId', props < { projectId: number } > ());