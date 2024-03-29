import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddElementPb, AddElementTypePb, ElementDto, ElementTypeDto, UpdateElementPb } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ElementsService {

    constructor(
        private _http: HttpClient,
    ) { }

    GetListOfElementTypes(projectId: number): Observable<ElementTypeDto[]> {
        return this._http.get<ElementTypeDto[]>(`${environment.apiBaseUrl}/v1/Project/Elements/GetListOfElementTypes`, { params: { projectId } })
    }

    addElementType(body: AddElementTypePb): Observable<number> {
        return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Elements/AddElementType`, body)
    }

    getListOfElements(body: { projectId: number; elementTypeId: number; }): Observable<ElementDto[]> {
        return this._http.post<ElementDto[]>(`${environment.apiBaseUrl}/v1/Project/Elements/GetListOfElements`, body)
    }

    updateElement(body: UpdateElementPb): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Elements/UpdateElement`, body)
    }

    addElement(body: AddElementPb): Observable<number> {
        return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Elements/AddElement`, body)
    }

    deleteElement(body: { projectId: number; id: number }): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Elements/DeleteElement`, body)
    }

    setElementTypeColor(body: { projectId: number; projectElementTypeId: number; color: string; }): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Elements/SetElementTypeColor`, body)
    }

}