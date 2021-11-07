import { animate, state, style, transition, trigger, } from '@angular/animations';

export const rotateAnimation = trigger('rotateAnimation', [
    // 'remove' the element when is not opened
    state('false', style({ transform: 'rotate(0deg)' })),
    state('true', style({ transform: 'rotate(180deg)' })),
    // Closed to Opened
    transition('false <=> true', animate('250ms ease-out'))
]);