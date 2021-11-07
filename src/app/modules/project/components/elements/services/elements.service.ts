import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddElementPostBody, ElementDto, ElementType, UpdateElementPb } from '../models';

@Injectable({
    providedIn: 'root'
})
export class ElementsService {

    constructor(
        private _http: HttpClient,
    ) { }

    GetListOfElementTypes(projectId: number): Observable<ElementType[]> {
        return this._http.get<ElementType[]>(`${environment.apiBaseUrl}/v1/Project/Elements/GetListOfElementTypes`, { params: { projectId } })
    }

    addElementType(body: AddElementPostBody): Observable<number> {
        return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Elements/AddElementType`, body)
    }

    getListOfElements(body: { projectId: number; elementTypeId: number; }): Observable<ElementDto[]> {
        return this._http.post<ElementDto[]>(`${environment.apiBaseUrl}/v1/Project/Elements/GetListOfElements`, body)
    }

    updateElement(body: UpdateElementPb): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Elements/UpdateElement`, body)
    }

    deleteElement(body: { projectId: number; id: number }): Observable<unknown> {
        return this._http.post(`${environment.apiBaseUrl}/v1/Project/Elements/DeleteElement`, body)
    }

}