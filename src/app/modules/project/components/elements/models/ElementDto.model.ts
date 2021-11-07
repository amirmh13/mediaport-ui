import { IdTitleDto } from "@shared/models";

export interface ElementDto {
    id: number;
    name: string;
    scene: IdTitleDto[];
}