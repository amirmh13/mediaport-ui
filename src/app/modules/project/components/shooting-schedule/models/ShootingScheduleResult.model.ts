import { IdTitleDto } from "@shared/models";

export interface Scene {
    order: number;
    sceneId: number;
    locked: boolean;
    episodeName: string;
    briefDescription: string;
    sceneOrder: number;
    sceneSubOrder: string;
    mainLocation: IdTitleDto;
    subLocation: IdTitleDto;
    productionTime: number;
    editTime: number;
    productionTimeStr: string;
    editTimeStr: string;
    scenePageSize: number;
    dayStatus: IdTitleDto;
    locationType: IdTitleDto;
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
    warningState: boolean;
    scenes: Scene[];
}
