import { createAction, props } from "@ngrx/store";

export const ProjectIdAction = createAction('[Project] set ProjectId', props < { projectId: number } > ());

export const ProjectNameAction = createAction('[Project] get ProjectName', props < { projectName: string } > ());