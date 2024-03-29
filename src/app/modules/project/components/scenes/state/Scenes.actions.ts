import { createAction, props } from "@ngrx/store";

export const episodeIdAction = createAction('[Scene] Set episode id', props<{ episodeId: number }>());
export const sceneIdAction = createAction('[Scene] Set scene id', props<{ sceneId: number }>());