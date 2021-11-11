import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdNameDto } from '@shared/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddElementToScenePb, AddScenePb, AddSubScenePb, RemoveElementFromScenePb, SceneDto, SceneElementDto, ScenesListPb, UpdateAdditionalInfoPb, UpdateSceneScriptPb } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ScenesService {

  constructor(
    private _http: HttpClient,
  ) { }

  getListOfDayStatuses(projectId: number): Observable<IdNameDto[]> {
    return this._http.get<IdNameDto[]>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/GetListOfDayStatuses`, { params: { projectId } })
  }

  getListOfLocationTypes(projectId: number): Observable<IdNameDto[]> {
    return this._http.get<IdNameDto[]>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/GetListOfLocationTypes`, { params: { projectId } })
  }

  getListOfScenes(body: ScenesListPb): Observable<SceneDto[]> {
    return this._http.post<SceneDto[]>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/GetListOfScenes`, body)
  }

  addScene(body: AddScenePb): Observable<number> {
    return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/AddScene`, body)
  }

  addSubScene(body: AddSubScenePb): Observable<number> {
    return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/AddSubScene`, body)
  }

  updateSceneScript(body: UpdateSceneScriptPb): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/UpdateSceneScript`, body)
  }

  updateAdditionalInfo(body: UpdateAdditionalInfoPb): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/UpdateAdditionalInfo`, body)
  }

  setSceneDone(body: { projectId: number; sceneId: number; done: boolean; }): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/SetSceneDone`, body)
  }

  addElementToScene(body: AddElementToScenePb): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/AddElementToScene`, body)
  }

  removeElementFromScene(body: RemoveElementFromScenePb): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/RemoveElementFromScene`, body)
  }

  getListOfSceneElements(body: { projectId: number; episodeId: number; episodeSceneId: number; }): Observable<SceneElementDto[]> {
    return this._http.post<SceneElementDto[]>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/GetListOfSceneElements`, body)
  }
}
