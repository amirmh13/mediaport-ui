import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { AlertService } from '@shared/services/alert/alert.service';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { AddOrUpdateElementComponent } from './components/add-or-update-element/add-or-update-element.component';
import { AddElementTypePb, ElementTypeDto } from './models';
import { ElementsService } from './services/elements.service';

@Component({
    selector: 'app-elements',
    templateUrl: './elements.component.html',
    styleUrls: ['./elements.component.scss']
})
export class ElementsComponent implements OnInit {

    elementTypes: ElementTypeDto[] = [];
    currentProjectId: number = 0;

    constructor(
        private _elementsService: ElementsService,
        private _alertService: AlertService,
        public dialog: MatDialog,
        private store: Store<RootState>,
    ) { }

    getListOfElementTypes(): void {
        this._elementsService.GetListOfElementTypes(this.currentProjectId).subscribe(res => {
            this.elementTypes = res;
        })
    }

    onOpenAddOrUpdateModal(elementType?: ElementTypeDto | null): void {
        const modalRef = this.dialog.open(AddOrUpdateElementComponent, {
            width: '400px',
            direction: 'rtl',
            scrollStrategy: new NoopScrollStrategy(),
        })

        if (elementType) {
            const convertedElementType: AddElementTypePb = {
                color: elementType.color,
                name: elementType.name,
                id: elementType.id,
                projectId: this.currentProjectId
            }
            modalRef.componentInstance.elementPostBody = convertedElementType;
        }
        modalRef.componentInstance.callListEmitter.subscribe(res => {
            this.getListOfElementTypes();
            modalRef.close();
        });

    }

    onDeleteClick(elementType: ElementTypeDto): void {
        const modalTitle: string = 'حذف جز';
        const modalText: string = `آیا از حذف جز ${elementType.name} اطمینان دارید؟`;

        this._alertService.open(modalTitle, modalText).then(res => {
            console.log(elementType.id);
        })
    }

    deleteElement(elementId: number): void {
        this._elementsService.deleteElement({
            id: elementId,
            projectId: this.currentProjectId
        }).subscribe(res => {
            this.getListOfElementTypes();
        })
    }

    ngOnInit(): void {
        this.store.pipe(
            select(selectProjectId)
        ).subscribe(res => {
            this.currentProjectId = res;
        })

        this.getListOfElementTypes();
    }

}