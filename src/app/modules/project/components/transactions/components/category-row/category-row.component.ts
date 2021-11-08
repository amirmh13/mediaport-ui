import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionCategoryDto } from '../../models';
import { openCloseAnimation } from '@shared/animations'
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.scss'],
  animations: [openCloseAnimation]
})
export class CategoryRowComponent implements OnInit {

  @Input() transactionCategory: TransactionCategoryDto | undefined;
  @Output() addSubCategoryEmitter = new EventEmitter<number>();
  @Output() editCategoryEmiiter = new EventEmitter<TransactionCategoryDto>();
  @Output() addTranscationEmiiter = new EventEmitter<void>();

  openDetail: boolean = false;
  projectId: number = 0;
  constructor(public dialog: MatDialog,
    private _store: Store<RootState>) { }

  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.projectId = projectId;
    });
  }

  addSubCategory(parentId?: number) {
    this.addSubCategoryEmitter.emit(parentId);
  }

  editCategory(model: TransactionCategoryDto) {
    this.editCategoryEmiiter.emit(model);
  }

  openAddTransactionDialogClick(transactionCategoryId : number){
    this.openAddTransactionDialog("افزودن هزینه",transactionCategoryId);
  }
  
  openAddTransactionDialog(headerText: string,transactionCategoryId : number): void {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      width: '500px',
      direction: 'rtl',
    });

    dialogRef.componentInstance.modalHeader = headerText;
    dialogRef.componentInstance.transactionCategoryId = transactionCategoryId;
    dialogRef.componentInstance.projectId = this.projectId;
    dialogRef.componentInstance.transactionEmitter.subscribe(res => {
      this.addTranscationEmiiter.emit();
      dialogRef.close();
    });
  }

}
