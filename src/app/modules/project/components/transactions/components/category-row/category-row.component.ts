import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TransactionCategoryDto } from '../../models';
import { openCloseAnimation } from '@shared/animations'
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from 'src/app/modules/project/state/Project.selectors';
@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.scss'],
  animations: [openCloseAnimation]
})
export class CategoryRowComponent implements OnInit {

  @Input() transactionCategory: TransactionCategoryDto  | undefined;
  @Output() addSubCategoryEmitter = new EventEmitter<number>();
  @Output() editCategoryEmiiter = new EventEmitter<TransactionCategoryDto>();

  openDetail: boolean = false;
  projectId: number = 0;
  constructor(   private _store: Store<RootState>) { }

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

}
