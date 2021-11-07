import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MATERIAL_COMMON_MODULES } from 'src/app/MaterialModulesArray.const';
import { AddLocationComponent } from './components/add-location/add-location.component';
import { LocationCardComponent } from './components/location-card/location-card.component';
import { LocationsRoutingModule } from './locations-routing.module';
import { LocationsComponent } from './locations.component';

@NgModule({
    declarations: [
        LocationsComponent,
        LocationCardComponent,
        AddLocationComponent,
    ],
    imports: [
        CommonModule,
        LocationsRoutingModule,
        MATERIAL_COMMON_MODULES,
        FormsModule,
    ]
})
export class LocationsModule {}