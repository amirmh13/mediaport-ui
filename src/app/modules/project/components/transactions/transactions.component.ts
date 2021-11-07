import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { TransactionsService } from './service/transactions.service'
import { MatDialog } from '@angular/material/dialog';
import { TransactionCategoryDto } from './models';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  projectId: number = 0;
  transactionCategories: TransactionCategoryDto[]=[];

  constructor(private store: Store<RootState>,
    private _transactionService: TransactionsService) { }

  getListOfTranscationCategories() {
    this._transactionService.getListOfProjectTransactionCategories(this.projectId).subscribe(res => {
      this.transactionCategories=res;
    });
  }

  openAddTransactionCategoryDialogClick() {
   
  }

  ngOnInit(): void {
    this.store.pipe(select(selectProjectId)).subscribe(res => {
      this.projectId = res;
    });

    this.getListOfTranscationCategories();
  }
}
