import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './error-snack-bar.component.html',
  styleUrls: ['./error-snack-bar.component.scss']
})
export class ErrorSnackBarComponent implements OnInit {

  @Input() message:string = '';

  constructor(
    public snackBarRef: MatSnackBarRef<ErrorSnackBarComponent>,
  ) { }

  ngOnInit(): void {
  }

}
