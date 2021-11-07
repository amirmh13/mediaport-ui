import { createAction, props } from "@ngrx/store";


export const currentRouteAction = createAction('[App] set current route', props < { currentRoute: string } > ())