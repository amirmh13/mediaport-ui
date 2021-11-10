import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IdNameDto } from '@shared/models';
import { ShootingScheduleResult } from '../models/ShootingScheduleResult.model'
import { ShootingScheduleInitInputDto } from '../models/ShootingScheduleInitInputDto.model'
import { DaySceneReorder } from '../models/DaySceneReorder.model';
import { LockUnlockSceneOrder } from '../models/LockUnlockSceneOrder.model';
import { SetShootingDayDate } from '../models/SetShootingDayDate.model';
import { SetSceneDoneDto } from '../models/SetSceneDone.model';

@Injectable({
  providedIn: 'root'
})
export class ShootingScheduleService {

  constructor(
    private _http: HttpClient,
  ) { }

  shootingScheduleExists(projectId: number): Observable<boolean> {
    return this._http.get<boolean>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/ShootingScheduleExists`, { params: { projectId } });
  }

  getListOfOrderableTypes(): Observable<IdNameDto[]> {
    return this._http.get<IdNameDto[]>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/GetListOfOrderableTypes`);
  }

  getListOfShootingScheduleDays(projectId: number): Observable<ShootingScheduleResult[]> {
    return this._http.get<ShootingScheduleResult[]>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/GetListOfShootingScheduleDays`, { params: { projectId } });
  }

  initializeShootingSchedule(model: ShootingScheduleInitInputDto): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/InitializeShootingSchedule`, model);
  }

  daySceneReorder(model: DaySceneReorder): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/DaySceneReorder`, model);
  }

  lockSceneReorder(model: LockUnlockSceneOrder): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/LockSceneReorder`, model);
  }

  unlockSceneReorder(model: LockUnlockSceneOrder): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/UnlockSceneReorder`, model);
  }

  setShootingScheduleDayDate(model: SetShootingDayDate): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/SetShootingScheduleDayDate`, model);
  }

  setSceneDone(model: SetSceneDoneDto): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/Episodes/Scenes/SetSceneDone`, model);
  }

  addNewShootingDay(projectId: number): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/AddNewShootingDay?projectId=` + projectId, {});
  }
}
