import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProjectDto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(
    private _http: HttpClient,
  ) { }

  getProjectInfo(projectId: number): Observable<ProjectDto> {
    return this._http.get<ProjectDto>(`${environment.apiBaseUrl}/v1/Projects/GetProjectInfo`, { params: { projectId } })
  }
}
