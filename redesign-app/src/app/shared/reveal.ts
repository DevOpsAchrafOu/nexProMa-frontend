import { Directive, ElementRef, afterNextRender, inject } from '@angular/core';

let observer: IntersectionObserver | null = null;

/**
 * Fades the element in when it scrolls into view (class "in").
 * Hidden only once JavaScript runs (html.js), so the generated HTML always shows everything.
 */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class Reveal {
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        el.classList.add('in');
        return;
      }
      observer ??= new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              e.target.classList.add('in');
              observer!.unobserve(e.target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px' },
      );
      observer.observe(el);
    });
  }
}
