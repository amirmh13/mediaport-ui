import { IdNameDto } from '@shared/models';

export interface ProjectDto {
    id: number;
    name: string;
    episodesCount: number;
    progressPercent: number;
    type: IdNameDto;
  }