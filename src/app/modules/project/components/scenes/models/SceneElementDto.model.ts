import { IdNameDto } from "@shared/models";

export interface SceneElementDto {
    id: number;
    name: string;
    color: string;
    elementCount: number;
    elements: IdNameDto[];
}