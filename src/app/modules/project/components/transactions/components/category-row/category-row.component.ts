import { Component, Input, OnInit } from '@angular/core';
import { TransactionCategoryDto } from '../../models';
import { openCloseAnimation } from '@shared/animations'
@Component({
  selector: 'app-category-row',
  templateUrl: './category-row.component.html',
  styleUrls: ['./category-row.component.scss'],
  animations:[openCloseAnimation]
})
export class CategoryRowComponent implements OnInit {

  @Input() transactionCategory : TransactionCategoryDto= {id:0,amount:0,code:"0",estimatedAmount:0,name:""};

  openDetail:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
