import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { openCloseAnimation } from '@shared/animations';
import Quill from 'quill';
import { QuillModules } from 'ngx-quill';
import { SceneDto } from '../../models';
import { ScenesService } from '../../service/scenes.service';
import { Store } from '@ngrx/store';
import { RootState } from 'src/app/state/App.reducers';
import { SwalService } from '@shared/services/swal/swal.service';

const font = Quill.import('formats/font')
// We do not add Aref Ruqaa since it is the default
font.whitelist = ['iransans', 'roboto', 'aref', 'serif', 'sansserif', 'monospace']
Quill.register(font, true)
@Component({
  selector: 'mp-scene-card',
  templateUrl: './scene-card.component.html',
  styleUrls: ['./scene-card.component.scss'],
  animations: [openCloseAnimation]
})
export class SceneCardComponent implements OnInit {

  @Input() scene!: SceneDto;
  @Input() isOpen: boolean = false;
  @Input() isDetail: boolean = false;
  @Input() id: string = '';
  @Output() addSubSceneEmitter = new EventEmitter<void>();
  @Output() editSceneEmitter = new EventEmitter<void>();

  projectId!: number;
  projectEpisodeId!: number;

  modules: QuillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      // [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [
        { 'color': ["#000000", "#3847e9", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] },
        { 'background': ["#000000", "#3847e9", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }
      ],          // dropdown with defaults from theme
      // [{ 'font': [] }],
      [{ 'align': [] }],

      // ['clean'],                                         // remove formatting button

      // ['link', 'image', 'video']                         // link and image, video
    ],
  }

  constructor(
    private _scenesService: ScenesService,
    private _store: Store<RootState>,
    private _swalService: SwalService,
  ) { }

  saveScript(): void {
    this._scenesService.updateSceneScript({
      projectEpisodeId: this.projectEpisodeId,
      projectId: this.projectId,
      projectEpisodeSceneId: this.scene.id,
      sceneScript: this.scene.scene,
    }).subscribe(() => {
      this._swalService.success('متن با موفقیت ذخیره شد');
    })
  }

  ngOnInit(): void {
    this._store.subscribe(state => {
      this.projectId = state.project.projectId;
      this.projectEpisodeId = state.scenes.episodeId;
    })
  }

}
