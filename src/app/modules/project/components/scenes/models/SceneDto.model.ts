import { IdNameDto } from "@shared/models";

export interface SceneDto {
    id: number;
    order: number;
    subOrder: string;
    briefDescription: string;
    scene: string;
    dayStatus: IdNameDto;
    locationType: IdNameDto;
    mainLocation: IdNameDto;
    subLocation: IdNameDto;
    productionTime: number;
    editTime: number;
    productionTimeStr: string;
    editTimeStr: string;
    scenePageSize: number;
    sceneTime: string;
    sceneCity: string;
    sceneNote: string;
    isDone: boolean;
}