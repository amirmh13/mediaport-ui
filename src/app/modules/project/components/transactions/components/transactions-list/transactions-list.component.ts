import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { PaginateDto } from '@shared/models';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { RootState } from 'src/app/state/App.reducers';
import { TransactionDto, TransactionListPostBody } from '../../models';
import { TransactionsService } from '../../service/transactions.service';
import { AddTransactionComponent } from '../add-transaction/add-transaction.component';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  transactionPostBody: TransactionListPostBody = {
    page: 1,
    pageSize: 10,
    transactionCategoryId: 0,
    projectId: 0
  };

  transactions: PaginateDto<TransactionDto> | undefined;

  constructor(
    public dialog: MatDialog,
    private _route: ActivatedRoute,
    private _store: Store<RootState>,
    private _transactionsService: TransactionsService
  ) { }


  getListOfTransactions() {
    this._transactionsService.getListOfProjectTransactions(this.transactionPostBody).subscribe(res => {
      this.transactions = res;
    })
  }

  paginateEvent(pageEvent: PageEvent) {
    this.transactionPostBody.page = pageEvent.pageIndex + 1;
    this.transactionPostBody.pageSize = pageEvent.pageSize;

    this.getListOfTransactions();
  }

  openAddTransactionDialogClick() {
    this.openAddTransactionDialog("افزودن هزینه");
  }

  openEditTransactionDialogClick(transaction: TransactionDto) {
    this.openAddTransactionDialog("ویرایش هزینه", transaction);
  }

  openAddTransactionDialog(headerText: string, transaction?: TransactionDto): void {
    const dialogRef = this.dialog.open(AddTransactionComponent, {
      width: '500px',
      direction: 'rtl',
    });

    if (transaction) {
      const transcationClone = transaction;
      dialogRef.componentInstance.transaction = { ...transcationClone };
    }
    dialogRef.componentInstance.modalHeader = headerText;
    dialogRef.componentInstance.transactionCategoryId =  this.transactionPostBody.transactionCategoryId;
    dialogRef.componentInstance.projectId =  this.transactionPostBody.projectId;
    dialogRef.componentInstance.transactionEmitter.subscribe(res => {
      this.getListOfTransactions();
      dialogRef.close();
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      if (params['categoryId']) {
        this.transactionPostBody.transactionCategoryId = params['categoryId'];
      }
    });

    this._store.pipe(select(selectProjectId)).subscribe(projectId => {
      this.transactionPostBody.projectId = projectId;
    });

    this.getListOfTransactions();
  }
}
