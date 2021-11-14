import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() { }

  scrollToElement(elementId: string): void {
    const el = document.getElementById(elementId);

    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'auto' });
    }
  }
}
