import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IdTitleDto } from '@shared/models';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface EpisodeDto extends IdTitleDto {
  lastUpdateTime: string;
  lastUpdateTimeStr: string;
}

export class AddEpisodePb {
  projectId: number = 0;
  title: string = '';
  description: string = '';
}


@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(
    private _http: HttpClient,
  ) { }

  addEpisode(body: { projectId: number; title: string; description: string; }): Observable<number> {
    return this._http.post<number>(`${environment.apiBaseUrl}/v1/Project/Episodes/AddEpisode`, body)
  }

  getListOfEpisodes(projectId: number): Observable<EpisodeDto[]> {
    return this._http.get<EpisodeDto[]>(`${environment.apiBaseUrl}/v1/Project/Episodes/GetListOfEpisodes`, { params: { projectId } })
  }
}
