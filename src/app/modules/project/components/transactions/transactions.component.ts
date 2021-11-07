import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { selectProjectId } from '../../state/Project.selectors';
import { TransactionsService } from './service/transactions.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  currentProjectId: number = 0;

  constructor(
    private _store: Store<RootState>,
    private _transactionsService: TransactionsService,
  ) { }

  ngOnInit(): void {
    this._store.pipe(
      select(selectProjectId)
    ).subscribe(projectId => {
      this.currentProjectId = projectId;
    })

  }

}
