import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { PaginateDto } from '@shared/models';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationDto, LocationsListPostBody } from './models';
import { LocationsService } from './service/locations.service';
import { AlertService } from '@shared/services/alert/alert.service';

@Component({
    selector: 'app-locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {

    locationsListPostBody: LocationsListPostBody = {
        page: 1,
        pageSize: 1000,
    };
    locationListDto: PaginateDto<LocationDto> | null = null;
    locationsList: LocationDto[] = [];
    projectId: number = 0;

    constructor(
        private _locationsService: LocationsService,
        public dialog: MatDialog,
        private _alertService: AlertService,
        private store: Store<RootState>,
    ) { }

    getListOfLocations(): void {
        this._locationsService.getListOfLocations(this.locationsListPostBody).subscribe(res => {
            this.locationListDto = res;
            this.locationsList = this.locationListDto.data;
        })
    }

    openAddLocationDialogClick() {
        this.openLocationDialog();;
    }

    onLocationCardClick(location: LocationDto): void {
        this.openLocationDialog(location);
    }

    onDeletedLocationClick(location: LocationDto): void {
        const modalTitle: string = 'حذف لوکیشین';
        const modalText: string = `آیا از حذف لوکیشن ${location.title} اطمینان دارید؟`;

        this._alertService.open(modalTitle, modalText).then(res => {
            this.deleteLocation(Number(location.id));
        });
    }

    deleteLocation(locationId: number | undefined): void {
        this._locationsService.deleteLocation({
            id: Number(locationId),
            projectId: Number(this.locationsListPostBody.projectId)
        }).subscribe(res => {
            this.getListOfLocations();
        })
    }

    openLocationDialog(location?: LocationDto): void {
        const dialogRef = this.dialog.open(AddLocationComponent, {
            width: '500px',
            direction: 'rtl',
        });

        const LocationClone = location || new LocationDto()
        dialogRef.componentInstance.location = { ...LocationClone };
        dialogRef.componentInstance.locationEmitter.subscribe(res => {
            this.getListOfLocations();
            dialogRef.close();
        });
    }

    ngOnInit(): void {
        this.store.pipe(
            select(selectProjectId)
        ).subscribe(res => {

            this.locationsListPostBody.projectId = res;
        })

        this.getListOfLocations();
    }

}