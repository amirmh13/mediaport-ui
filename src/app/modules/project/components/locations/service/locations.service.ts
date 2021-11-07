import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DeletePb, PaginateDto } from '@shared/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationDto, LocationsListPostBody, LocationSubalternPb } from '../models';

@Injectable({
    providedIn: 'root'
})
export class LocationsService {

    constructor(
        private _http: HttpClient,
    ) { }

    getListOfLocations(body: LocationsListPostBody): Observable<PaginateDto<LocationDto>> {
        return this._http.post<PaginateDto<LocationDto>>(`${environment.apiBaseUrl}/v1/Project/Locations/GetListOfLocations`, body)
    }

    addLocation(body: LocationDto): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Locations/AddLocation`, body)
    }

    updateLocation(body: LocationDto): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Locations/UpdateLocation`, body)
    }

    deleteLocation(body: { projectId: number; id: number }): Observable<unknown> {
        return this._http.post<unknown>(`${environment.apiBaseUrl}/v1/Project/Locations/DeleteLocation`, body)
    }

    addLocationSubaltern(body: LocationSubalternPb): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Locations/AddLocationSubaltern`, body)
    }

    deleteLocationSubaltern(body: DeletePb): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Locations/DeleteLocationSubaltern`, body)
    }
}