import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { openCloseAnimation } from '@shared/animations'
import { AlertService } from '@shared/services/alert/alert.service';
import * as L from 'leaflet';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { LocationDto } from '../../models';
import { LocationsService } from '../../service/locations.service';


const THUMBUP_ICON = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
`;

@Component({
    selector: 'app-location-card',
    templateUrl: './location-card.component.html',
    styleUrls: ['./location-card.component.scss'],
    animations: [openCloseAnimation]
})
export class LocationCardComponent implements OnInit, AfterViewInit {

    @Input() location: LocationDto = new LocationDto();
    @Input() mapId: number = 0;
    @Output() editEmitter = new EventEmitter<void>();
    @Output() removeEmitter = new EventEmitter<void>();
    @Output() callListEmitter = new EventEmitter<void>();

    currentProjectId: number = 0;
    map: any;
    selectedMarker: any;

    constructor(
        private _locationService: LocationsService,
        private _store: Store<RootState>,
        private _alertService: AlertService,
    ) { }

    onAddSubLocationClick(title: string): void {
        this._locationService.addLocationSubaltern({
            parentLocationId: Number(this.location.id),
            projectId: this.currentProjectId,
            title
        }).subscribe(res => {
            this.callListEmitter.emit();
        })
    }

    onDeleteSubLocationClick(id: number): void {
        this._alertService.open('', 'آیا از حذف این لوکیشن فرعی اطمینان دارید؟').then(result => {
            this._locationService.deleteLocationSubaltern({
                id,
                projectId: this.currentProjectId
            }).subscribe(res => {
                this.callListEmitter.emit();
            })
        })
    }

    ngOnInit(): void {
        this._store.pipe(select(selectProjectId)).subscribe(projectId => this.currentProjectId = projectId);
        this.mapId = Math.floor(Math.random() * (1000 - 1 + 1));
    }

    ngAfterViewInit(): void {

        if (this.map) {
            //to remove any initialization of a previous map
            this.map.off();
            this.map.remove();
        }
        // tiles are used to load and display tile layers on the map.
        var originalTile = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19 });
        // var grayscale = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution}),
        // streets   = L.tileLayer(mapboxUrl, {id: 'MapID', tileSize: 512, zoomOffset: -1, attribution: mapboxAttribution});
        // declaring the leaflet map
        this.map = L.map('mini-map-' + this.mapId, {
            //choose the default view coordinates
            center: [this.location?.coordinates.latitude, this.location?.coordinates.longitude],
            //choose the zooming level
            zoom: 15,
            //to remove the attribution
            attributionControl: true,
            //to add predefined layers
            layers: [originalTile],
            dragging: false,
            scrollWheelZoom: false,
            zoomControl: false,
            doubleClickZoom: false,

        });

        var customPin = L.icon({
            iconUrl: '/assets/images/marker-primary.svg',
            shadowUrl: '',

            iconSize: [80, 80], // size of the icon
            shadowSize: [0, 0], // size of the shadow
            iconAnchor: [40, 50], // point of the icon which will correspond to marker's location
            shadowAnchor: [0, 0], // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        });



        this.selectedMarker = L.marker([this.location?.coordinates.latitude, this.location?.coordinates.longitude], { icon: customPin }).addTo(this.map);
    }

}