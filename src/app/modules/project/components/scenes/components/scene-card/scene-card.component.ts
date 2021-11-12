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

  @Input() scene: SceneDto | any = null;

  isOpen: boolean = false;
  editorConfigs = {

    plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
    imagetools_cors_hosts: ['picsum.photos'],
    menubar: 'file edit view insert format tools table help',
    toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: '30s',
    autosave_prefix: '{path}{query}-{id}-',
    autosave_restore_when_empty: false,
    autosave_retention: '2m',
    image_advtab: true,
    link_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
      { title: 'My page 1', value: 'https://www.tiny.cloud' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    // file_picker_callback: function (callback, value, meta) {
    //   /* Provide file and text for the link dialog */
    //   if (meta.filetype === 'file') {
    //     callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
    //   }

    //   /* Provide image and alt text for the image dialog */
    //   if (meta.filetype === 'image') {
    //     callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
    //   }

    //   /* Provide alternative source and posted for the media dialog */
    //   if (meta.filetype === 'media') {
    //     callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
    //   }
    // },
    templates: [
      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],
    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    height: 600,
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image imagetools table',
    skin: true ? 'oxide-dark' : 'oxide',
    content_css: true ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif,iransans; font-size:16px }'
  }

  configs = {
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [
          { 'color': ["#000000", "#3847e9", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] },
          { 'background': ["#000000", "#3847e9", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }
        ]
      ]
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
