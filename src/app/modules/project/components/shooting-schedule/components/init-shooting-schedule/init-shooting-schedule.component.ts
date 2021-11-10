import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IdNameDto } from '@shared/models';
import { ShootingScheduleBreakDownTypeEnum } from '../../enums/ShootingScheduleBreakDownTypeEnum.enum';
import { ShootingScheduleInitInputDto } from '../../models/ShootingScheduleInitInputDto.model';
import { ShootingScheduleService } from '../../service/shooting-schedule.service';

@Component({
  selector: 'app-init-shooting-schedule',
  templateUrl: './init-shooting-schedule.component.html',
  styleUrls: ['./init-shooting-schedule.component.scss']
})
export class InitShootingScheduleComponent implements OnInit {

  @Input() projectId: number = 0;
  @Output() initShootinScheduleEmitter = new EventEmitter<ShootingScheduleInitInputDto>();
  pageStep: number = 1;

  breakDownValue: string = "";
  breakDownType: ShootingScheduleBreakDownTypeEnum = ShootingScheduleBreakDownTypeEnum.page;
  shootingScheduleBreakDownTypeEnum = ShootingScheduleBreakDownTypeEnum

  orderableTypes: IdNameDto[] = [];
  firstOrderable: number = 1;
  secondOrderable: number = 2;

  res: ShootingScheduleInitInputDto = {
    projectId: this.projectId,
    breakdownTypeId: this.breakDownType,
    breakDownValue: 0,
    orders: []
  };

  constructor(private _shootingScheduleService: ShootingScheduleService) { }

  onStepOneSubmit(initScheduleFirstStepForm: NgForm) {
    if (!initScheduleFirstStepForm.valid)
      return;

    let breakDownValue: number;
    if (this.breakDownType == this.shootingScheduleBreakDownTypeEnum.workDay) {
      breakDownValue = parseFloat(this.breakDownValue) * 60 * 60;
    } else {
      breakDownValue = parseFloat(this.breakDownValue);
    }

    this.res = {
      projectId: this.projectId,
      breakdownTypeId: this.breakDownType,
      breakDownValue: breakDownValue,
      orders: []
    }

    this.pageStep = 2;
  }

  onStepTwoSubmit(initScheduleSecondStep: NgForm) {
    this.res?.orders.push({
      order: 1,
      orderableId: this.firstOrderable
    });

    this.res?.orders.push({
      order: 2,
      orderableId: this.secondOrderable
    })

    this.initShootinScheduleEmitter.emit(this.res);

    this.res.orders = [];
  }

  ngOnInit(): void {
    this._shootingScheduleService.getListOfOrderableTypes().subscribe(res => {
      this.orderableTypes = res;
    });
  }
}
