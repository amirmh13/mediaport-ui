import { IdTitleDto } from "@shared/models";
import { Coordinate } from "./Coordinate.model";

export interface SubLocation extends IdTitleDto {
    Scenes: IdTitleDto[];
}
export class LocationDto {
    id?: number | undefined = undefined;
    projectId?: number | undefined | null = undefined;
    title: string = '';
    description: string = '';
    address: string = '';
    phoneNumber: string = '';
    createdAt: Date | null = null;
    coordinates: Coordinate = {
        latitude: 0,
        longitude: 0,
    };
    subLocations: SubLocation[] = [];
}