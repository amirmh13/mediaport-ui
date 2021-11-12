import { Component, Input, OnInit } from '@angular/core';
import { openCloseAnimation } from '@shared/animations';
import { SceneDto } from '../../models';

@Component({
  selector: 'mp-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.scss'],
  animations: [openCloseAnimation]
})
export class SceneCardComponent implements OnInit {

  @Input() scene: SceneDto | null = null;

  isOpen: boolean = false;
  editorConfigs = {
    // base_url: '/tinymce',
    // suffix: '.min',
    plugins: [
      'lists link image paste help wordcount code preview'
    ],
    default_link_target: '_blank',
    // toolbar: 'bold italic undo redo | numlist bullist outdent indent | removeformat | code preview',
    // toolbar: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    toolbar:
       'undo redo | formatselect | bold italic backcolor | \
       alignleft aligncenter alignright alignjustify | \
       bullist numlist outdent indent | removeformat | code help preview',
    min_height: 200,
    branding: false,
    table_responsive_width: true,
    image_advtab: false,
    autoresize_bottom_margin: 20,
    // contextmenu: 'link image table',
    // language: 'fa_IR',
    // language_url: '/assets/i18n/tinymce/langs/fa_IR.js',
    menubar: false,
    statusbar: false,
    paste_as_text: false,
    forced_root_block: false
  }

  constructor() { }

  ngOnInit(): void {
  }

}
