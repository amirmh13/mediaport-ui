import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { TransactionsService } from './service/transactions.service'
import { MatDialog } from '@angular/material/dialog';
import { TransactionCategoryDto } from './models';
import { AddCategoryComponent } from './components/add-category/add-category.component';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  projectId: number = 0;
  transactionCategories: TransactionCategoryDto[] = [];

  constructor(
    public dialog: MatDialog,
    private _store: Store<RootState>,
    private _transactionService: TransactionsService,
  ) { }

  getListOfTransactionCategories() {
    this._transactionService.getListOfProjectTransactionCategories(this.projectId).subscribe(res => {
      this.transactionCategories = res;
    });
  }

  openAddTransactionCategoryDialogClick() {
    this.openAddTransactionCategoryDialog("افزودن کد جدید");
  }

  openAddTransactionSubCategoryClick(parentId: number) {
    const categoryClone = { id: 0, amount: 0, code: "", estimatedAmount: 0, name: "", parentId: parentId };
    this.openAddTransactionCategoryDialog("افزودن زیر کد جدید", categoryClone);
  }

  openEditTransactionCategoryClick(category: TransactionCategoryDto) {
    this.openAddTransactionCategoryDialog("ویرایش کد", category);
  }

  addTranscationEvent() {
    this.getListOfTransactionCategories();
  }

  openAddTransactionCategoryDialog(headerText: string, category?: TransactionCategoryDto): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '500px',
      direction: 'rtl',
    });

    const categoryClone = category || { id: 0, amount: 0, code: "", estimatedAmount: 0, name: "" };
    dialogRef.componentInstance.transactionCategory = { ...categoryClone };
    dialogRef.componentInstance.modalHeader = headerText;
    dialogRef.componentInstance.transactionCategoryEmitter.subscribe(res => {
      this.getListOfTransactionCategories();
      dialogRef.close();
    });
  }


  ngOnInit(): void {
    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.projectId = projectId;
    });

    this.getListOfTransactionCategories();
  }
}
