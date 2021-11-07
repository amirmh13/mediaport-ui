import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as L from 'leaflet';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { LocationDto } from '../../models';
import { LocationsService } from '../../service/locations.service';

@Component({
    selector: 'app-add-location',
    templateUrl: './add-location.component.html',
    styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit, AfterViewInit {

    @Input() location: LocationDto = new LocationDto();
    @Output() locationEmitter = new EventEmitter < void > ();

    map: any;
    selectedMarker: any;
    defaultCoordinate = {
        lat: 35.697831,
        long: 51.3378147
    }

    constructor(
        private _locationService: LocationsService,
        private store: Store < RootState > ,
    ) {}

    onSubmitFormClick(locationForm: NgForm): void {
        if (this.location.id) {
            this.updateLocation();
        } else {
            delete this.location.id;
            this.addLocation();
        }
    }

    addLocation(): void {
        this._locationService.addLocation(this.location).subscribe(res => {
            this.locationEmitter.emit();
        })
    }

    updateLocation(): void {
        this._locationService.updateLocation(this.location).subscribe(res => {
            this.locationEmitter.emit();
        })
    }

    ngOnInit(): void {
        this.store.pipe(
            select(selectProjectId)
        ).subscribe(res=> {
            this.location.projectId = res;
        })
    }

    ngAfterViewInit(): void {
        if (this.map) {
            this.map.off();
            this.map.remove();
        }
        var originalTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
        this.map = L.map('map', {
            center: [this.location.coordinates.latitude || this.defaultCoordinate.lat, this.location.coordinates.longitude || this.defaultCoordinate.long],
            zoom: 15,
            attributionControl: true,
            layers: [originalTile],
            dragging: true,
            scrollWheelZoom: true,
            zoomControl: true,
            doubleClickZoom: true,

        });

        var customPin = L.icon({
            iconUrl: '/assets/images/marker-primary.svg',
            shadowUrl: '',
            iconSize: [80, 80],
            shadowSize: [0, 0],
            iconAnchor: [40, 50],
            shadowAnchor: [0, 0],
            popupAnchor: [-3, -76],
        });


        this.map.on('click', (e: any) => {
            if (this.selectedMarker) this.map.removeLayer(this.selectedMarker);
            this.location.coordinates.latitude = e.latlng.lat;
            this.location.coordinates.longitude = e.latlng.lng;
            this.selectedMarker = L.marker([this.location.coordinates.latitude, this.location.coordinates.longitude], { icon: customPin }).addTo(this.map);
        })

        if (this.location?.coordinates.latitude && this.location?.coordinates.longitude) {

            this.selectedMarker = L.marker([this.location.coordinates.latitude, this.location.coordinates.longitude], { icon: customPin }).addTo(this.map);
        }
    }

}