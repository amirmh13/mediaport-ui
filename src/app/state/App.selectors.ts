import { createSelector } from '@ngrx/store';
import { AppState, RootState } from './App.reducers';


export const selectApp = (state: RootState) => state.app;

export const selectCurrentRoute = createSelector(
    selectApp,
    (state: AppState) => state.currentRoute
);