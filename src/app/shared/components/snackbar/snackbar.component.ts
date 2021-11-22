import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-snack-bar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {

  @Input() message:string = '';

  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
  ) { }

  ngOnInit(): void {
  }

}
