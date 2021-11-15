import { Directive } from "@angular/core";
import { Router } from "@angular/router";
import { Mode } from "./enums";
import { SceneDto } from "./models";

@Directive()
export class ScenesBase {
    modeSelectOptions = [
        { name: 'ویرایشگر', id: Mode.EDITOR, svgId: 'edit-secondary' },
        { name: 'خرد کردن', id: Mode.CHOPPING, svgId: 'page-collection-secondary' },
        { name: 'نمای کلی', id: Mode.OVERVIEW, svgId: 'documents-secondary' },
    ];
    currentProjectId: number = 0;
    scenesList: SceneDto[] = [];
    selectedMode: number = 0;
    selectedEpisodeId: number = 0;

    constructor(
        public _router: Router,
    ) { }

    modeSelectChange(mode: number): void {
        switch (mode) {
            case Mode.EDITOR:
                this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', 'editor']);
                break;
            case Mode.CHOPPING:
                const firstSceneId: number | '' = this.scenesList[0]?.id || '';
                this._router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.selectedEpisodeId, 'detail', firstSceneId]);
                break;
        }
    }
}