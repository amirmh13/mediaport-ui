export class AddScenePb {
    id?: number;
    projectId: number = 0;
    projectEpisodeId: number = 0;
    briefDescription: string = '';
    dayStatusId: number = 0;
    locationTypeId: number = 0;
    projectLocationId: number | null = null;
    projectLocationSubalternId: number | null = null;
    productionTime: number = 0;
    editTime: number = 0;
    scenePageSize: number = 0;
    sceneTime: string = '';
    sceneCity: string = '';
    sceneNote: string = '';
}