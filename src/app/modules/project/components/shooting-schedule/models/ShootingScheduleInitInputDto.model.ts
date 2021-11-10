import { ShootingScheduleBreakDownTypeEnum } from "../enums/ShootingScheduleBreakDownTypeEnum.enum";

export interface ShootingScheduleInitInputDto {
    projectId: number;
    breakdownTypeId: ShootingScheduleBreakDownTypeEnum;
    breakDownValue: number;
    orders: Order[];
}

export interface Order {
    order: number;
    orderableId: number;
}
