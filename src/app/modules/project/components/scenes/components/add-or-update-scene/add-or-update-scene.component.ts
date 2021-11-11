import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddScenePb } from '../../models';

@Component({
  selector: 'app-add-or-update-scene',
  templateUrl: './add-or-update-scene.component.html',
  styleUrls: ['./add-or-update-scene.component.scss']
})
export class AddOrUpdateSceneComponent implements OnInit {

  @Input() addScenePb = new AddScenePb();
  @Output() submitEmitter = new EventEmitter<AddScenePb>();

  constructor() { }

  onSubmitClick(): void {
    this.submitEmitter.emit(this.addScenePb);
  }

  ngOnInit(): void {
  }

}
