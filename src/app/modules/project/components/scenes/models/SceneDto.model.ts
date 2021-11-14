import { IdNameDto } from "@shared/models";

export class SceneDto {
    id: number = 0;
    order: number = 0;
    subOrder: string = '';
    briefDescription: string = '';
    scene: string = '';
    dayStatus: IdNameDto = { id: 0, name: '' };
    locationType: IdNameDto = { id: 0, name: '' };
    mainLocation: IdNameDto = { id: 0, name: '' };
    subLocation: IdNameDto = { id: 0, name: '' };
    productionTime: number = 0;
    editTime: number = 0;
    productionTimeStr: string = '';
    editTimeStr: string = '';
    scenePageSize: number = 0;
    sceneTime: string = '';
    sceneCity: string = '';
    sceneNote: string = '';
    isDone: boolean = false;
}