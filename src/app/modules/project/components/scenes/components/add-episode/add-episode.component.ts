import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AddEpisodePb } from '../../service/episodes.service';

@Component({
  selector: 'app-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: ['./add-episode.component.scss']
})
export class AddEpisodeComponent implements OnInit {

  @Output() submitEmitter = new EventEmitter<AddEpisodePb>();

  addEpisodePb = new AddEpisodePb();

  constructor() { }

  onSubmitClick(): void {
    this.submitEmitter.emit(this.addEpisodePb);
  }

  ngOnInit(): void {
  }

}
