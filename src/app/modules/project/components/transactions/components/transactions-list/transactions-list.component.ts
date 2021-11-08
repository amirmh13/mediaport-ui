import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';

@Component({
  selector: 'app-transactions-list',
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss']
})
export class TransactionsListComponent implements OnInit {

  categoryId: number = 0;

  constructor(
    private _route: ActivatedRoute,
    private _store: Store<RootState>,
  ) { }

  ngOnInit(): void {

    this._route.params.subscribe((params) => {
      if (params['categoryId']) {
        console.log(params['categoryId']);
        this.categoryId = params['categoryId'];
      }
    })
  }

}
