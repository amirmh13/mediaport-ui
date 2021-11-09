import { IdNameDto } from "@shared/models";

export interface Scene {
    order: number;
    sceneId: number;
    locked: boolean;
    episodeName: string;
    briefDescription: string;
    sceneOrder: number;
    sceneSubOrder: string;
    mainLocation: IdNameDto;
    subLocation: IdNameDto;
    productionTime: number;
    editTime: number;
    productionTimeStr: string;
    editTimeStr: string;
    scenePageSize: number;
    dayStatus: IdNameDto;
    locationType: IdNameDto;
    isDone: boolean;
}

export interface ShootingScheduleResult {
    id: number;
    projectShootingScheduleId: number;
    dayNo: number;
    pageCounts: number;
    estimatedTime: number;
    estimatedTimeStr: string;
    date: Date;
    dateStr: string;
    warningState: boolean;
    scenes: Scene[];
}
