import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RootState } from 'src/app/state/App.reducers';
import { TransactionsService } from '../../service/transactions.service';
import { select, Store } from '@ngrx/store';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
import { EditTransactionPostBody, TransactionDto } from '../../models';

@Component({
  selector: 'app-add-transaction',
  templateUrl: './add-transaction.component.html',
  styleUrls: ['./add-transaction.component.scss']
})
export class AddTransactionComponent implements OnInit {

  transactionBody: EditTransactionPostBody = { id: 0, estimatedAmount: 0, projectId: 0, projectTransactionCategoryId: 0, title: "", transactionTime: undefined };
  @Input() transaction!: TransactionDto;
  @Input() modalHeader: string = "";
  @Input() projectId: number = 0;
  @Input() transactionCategoryId: number = 0;

  @Output() transactionEmitter = new EventEmitter<void>();

  constructor(private _transactionService: TransactionsService) {

  }

  onSubmitFormClick(transactionFrom: NgForm): void {
    if (!this.transaction?.id) {
      this.addTransaction(this.transactionBody);
    } else {
      this.updateTransaction(this.transactionBody);
    }
  }

  addTransaction(model: EditTransactionPostBody) {
    this._transactionService.addTransaction(model).subscribe(res => {
      this.transactionEmitter.emit();
    });
  }

  updateTransaction(model: EditTransactionPostBody) {
    this._transactionService.editTransaction(model).subscribe(res => {
      this.transactionEmitter.emit();
    });
  }

  ngOnInit(): void {
    if (this.transaction) {
      this.transactionBody.id = this.transaction?.id;
      this.transactionBody.title = this.transaction?.title;
      this.transactionBody.description = this.transaction?.description;
      this.transactionBody.estimatedAmount = this.transaction?.estimatedAmount;
      this.transactionBody.amount = this.transaction?.amount;
      this.transactionBody.transactionTime = this.transaction?.transactionTime;
    }

    this.transactionBody.projectId = this.projectId;
    this.transactionBody.projectTransactionCategoryId = this.transactionCategoryId;
  }

}
