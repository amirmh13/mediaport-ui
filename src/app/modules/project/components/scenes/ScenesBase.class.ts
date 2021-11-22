import { Directive } from "@angular/core";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { RootState } from "src/app/state/App.reducers";
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

    currentEpisodeId!: number;
    currentSceneId!: number;

    constructor(
        public router: Router,
        public store: Store<RootState>,
    ) {
        store.subscribe(state => {
            this.currentEpisodeId = state.scenes?.episodeId;
            this.currentSceneId = state.scenes.sceneId;
        });
    }

    modeSelectChange(mode: number): void {
        switch (mode) {
            case Mode.EDITOR:
                this.router.navigate(['projects', this.currentProjectId, 'episode-scenes']);
                break;
            case Mode.CHOPPING:
                const firstSceneId: number | '' = this.scenesList[0]?.id || this.currentSceneId || '';
                this.router.navigate(['projects', this.currentProjectId, 'episode-scenes', this.selectedEpisodeId || this.currentEpisodeId, 'detail', firstSceneId]);
                break;
            case Mode.OVERVIEW:
                this.router.navigate(['projects', this.currentProjectId, 'episode-scenes', 'overview']);
                break;
        }
    }
}