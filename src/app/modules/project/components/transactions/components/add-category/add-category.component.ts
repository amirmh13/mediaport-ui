import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddTransactionCategoryPostBody, EditTransactionCategoryPostBody, TransactionCategoryDto } from '../../models';
import { NgForm } from '@angular/forms';
import { RootState } from 'src/app/state/App.reducers';
import { TransactionsService } from '../../service/transactions.service';
import { select, Store } from '@ngrx/store';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  @Input() transactionCategory: TransactionCategoryDto = { id: 0, amount: 0, code: "0", estimatedAmount: 0, name: "" };
  @Input() modalHeader: string = "";

  @Output() transactionCategoryEmitter = new EventEmitter<void>();

  projectId: number = 0;

  constructor(private store: Store<RootState>,
    private _transactionService: TransactionsService) { }


  onSubmitFormClick(locationForm: NgForm): void {
    if (this.transactionCategory.id == 0) {
      this.addCategory(
        {
          code: this.transactionCategory.code,
          name: this.transactionCategory.name,
          parentId: this.transactionCategory.parentId,
          projectId: this.projectId
        }
      )
    } else {
      this.updateCategory(
        {
          code: this.transactionCategory.code,
          id: this.transactionCategory.id,
          name: this.transactionCategory.name,
          projectId: this.projectId
        }
      )
    }
  }


  addCategory(model: AddTransactionCategoryPostBody) {
    this._transactionService.addTransactionCategory(model).subscribe(res => {
      this.transactionCategoryEmitter.emit();
    });
  }

  updateCategory(model: EditTransactionCategoryPostBody) {
    this._transactionService.editTransactionCategory(model).subscribe(res => {
      this.transactionCategoryEmitter.emit();
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(selectProjectId)).subscribe(res => {
      this.projectId = res;
    });
  }

}
