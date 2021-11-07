import { Component, Input, OnInit } from '@angular/core';
import { ContactsListDto } from '../../models';

@Component({
  selector: 'app-folder-item',
  templateUrl: './folder-item.component.html',
  styleUrls: ['./folder-item.component.scss']
})
export class FolderItemComponent implements OnInit {

  @Input() folderItem: ContactsListDto | null = null;
  selectedFolderId: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
