import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IdNameDto } from '@shared/models';
import { LocationDto } from '../../../locations/models';
import { LocationsService } from '../../../locations/service/locations.service';
import { AddScenePb, AddSubScenePb } from '../../models';
import { ScenesService } from '../../service/scenes.service';

@Component({
  selector: 'app-add-or-update-scene',
  templateUrl: './add-or-update-scene.component.html',
  styleUrls: ['./add-or-update-scene.component.scss']
})
export class AddOrUpdateSceneComponent implements OnInit, AfterViewInit {

  @Input() addScenePb = new AddSubScenePb();
  @Input() currentProjectId: number = 0;
  @Input() projectEpisodeSceneId: number = 0;
  @Output() submitEmitter = new EventEmitter<AddSubScenePb>();

  @ViewChild('productionTimeHour') productionTimeHour!: ElementRef;
  @ViewChild('productionTimeMinute') productionTimeMinute!: ElementRef;
  @ViewChild('productionTimeSecond') productionTimeSecond!: ElementRef;
  @ViewChild('editTimeHour') editTimeHour!: ElementRef;
  @ViewChild('editTimeMinute') editTimeMinute!: ElementRef;
  @ViewChild('editTimeSecond') editTimeSecond!: ElementRef;

  locationTypes: IdNameDto[] = [];
  dayStatuses: IdNameDto[] = [];
  locations: LocationDto[] = [];

  constructor(
    private _scenesService: ScenesService,
    private _locationsService: LocationsService,
  ) { }

  onSubmitClick(): void {
    this.addScenePb.productionTime = this.convertHourMinuteToSecond(
      +this.productionTimeHour.nativeElement.value,
      +this.productionTimeMinute.nativeElement.value,
      +this.productionTimeSecond.nativeElement.value,
    );
    this.addScenePb.editTime = this.convertHourMinuteToSecond(
      +this.editTimeHour.nativeElement.value,
      +this.editTimeMinute.nativeElement.value,
      +this.editTimeSecond.nativeElement.value,
    );
    if (this.projectEpisodeSceneId) this.addScenePb.projectEpisodeSceneId = this.projectEpisodeSceneId;

    this.submitEmitter.emit(this.addScenePb);
  }

  convertHourMinuteToSecond(hour: number, minute: number, second: number): number {
    return (hour * 3600) + (minute * 60) + second;
  }

  getListOfLocationTypes(): void {
    this._scenesService.getListOfLocationTypes(this.currentProjectId).subscribe(res => {
      this.locationTypes = res;
    })
  }

  getListOfDayStatuses(): void {
    this._scenesService.getListOfDayStatuses(this.currentProjectId).subscribe(res => {
      this.dayStatuses = res;
    })
  }

  getListOfLocations(): void {
    this._locationsService.getListOfLocations({
      page: 1,
      pageSize: 10000,
      projectId: this.currentProjectId
    }).subscribe(res => {
      this.locations = res.data;
    })
  }

  convertSecondToHourMinute(sec: number): { h: number; m: number, s: number; } {
    let h = Math.floor(sec / 3600); // get hours
    let m = Math.floor((sec - (h * 3600)) / 60); // get minutes
    let s = sec - (h * 3600) - (m * 60); //  get seconds

    return { h, m, s };
  }

  ngOnInit(): void {
    this.getListOfLocationTypes();
    this.getListOfDayStatuses();
    this.getListOfLocations();
  }

  ngAfterViewInit(): void {
    if (this.addScenePb.productionTime) {
      const { h, m, s } = this.convertSecondToHourMinute(this.addScenePb.productionTime);
      this.productionTimeHour.nativeElement.value = h;
      this.productionTimeMinute.nativeElement.value = m;
      this.productionTimeSecond.nativeElement.value = s;
    }

    if (this.addScenePb.editTime) {
      const { h, m, s } = this.convertSecondToHourMinute(this.addScenePb.editTime);
      this.editTimeHour.nativeElement.value = h;
      this.editTimeMinute.nativeElement.value = m;
      this.editTimeSecond.nativeElement.value = s;
    }
  }

}
