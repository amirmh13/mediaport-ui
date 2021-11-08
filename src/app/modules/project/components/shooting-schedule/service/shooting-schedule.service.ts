import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IdTitleDto } from '@shared/models';
import { ShootingScheduleResult } from '../models/ShootingScheduleResult.model'
import { ShootingScheduleInitInputDto } from '../models/ShootingScheduleInitInputDto.model'

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

  getListOfOrderableTypes(): Observable<IdTitleDto[]> {
    return this._http.get<IdTitleDto[]>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/GetListOfOrderableTypes`);
  }

  getListOfShootingScheduleDays(projectId: number): Observable<ShootingScheduleResult[]> {
    return this._http.get<ShootingScheduleResult[]>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/GetListOfShootingScheduleDays`, { params: { projectId } });
  }

  initializeShootingSchedule(model: ShootingScheduleInitInputDto): Observable<void> {
    return this._http.post<void>(`${environment.apiBaseUrl}/v1/Project/ShootingSchedules/InitializeShootingSchedule`, model);
  }
}
