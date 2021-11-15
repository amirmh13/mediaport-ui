import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss']
})
export class AddElementComponent implements OnInit {

  constructor() { }

  onSubmitClick(): void {
    console.log('submitted!');
  }

  ngOnInit(): void {
  }

}
