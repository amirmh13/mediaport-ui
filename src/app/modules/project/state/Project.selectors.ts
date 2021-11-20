import { createSelector } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { ProjectState } from './Project.reducers';




export const selectProject = (state: RootState) => state.project;

export const selectProjectId = createSelector(
    selectProject,
    (state: ProjectState) => state.projectId
);

export const selectProjectName = createSelector(
    selectProject,
    (state: ProjectState) => state.projectName
);