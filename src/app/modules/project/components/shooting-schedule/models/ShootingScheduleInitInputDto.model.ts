export interface ShootingScheduleInitInputDto {
    projectId: number;
    breakdownTypeId: number;
    breakDownValue: number;
    orders: Order[];
}

export interface Order {
    order: number;
    orderableId: number;
}
