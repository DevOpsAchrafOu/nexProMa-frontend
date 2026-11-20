import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { I18n } from '../i18n';
import { Icon } from '../shared/icons';
import { REVIEWS } from '../data/site-data';

@Component({
  selector: 'section[appHowToOrder]',
  host: { id: 'how', class: 'white' },
  template: `
    <div class="wrap">
      <h2>{{ i18n.t('how_h') }}</h2>
      <p class="sub">{{ i18n.t('how_sub') }}</p>
      <div class="steps">
        @for (n of [1, 2, 3]; track n) {
          <div class="step">
            <b>{{ n }}</b>
            <h3>{{ i18n.t('s' + n + 'h') }}</h3>
            <p>{{ i18n.t('s' + n + 'p') }}</p>
          </div>
        }
      </div>
    </div>
  `,
})
export class HowToOrder {
  protected readonly i18n = inject(I18n);
}

/** Real WhatsApp conversations (screenshots), enlarged in a lightbox. */
@Component({
  selector: 'section[appReviews]',
  host: { id: 'avis' },
  template: `
    <div class="wrap">
      <h2>{{ i18n.t('rev_h') }}</h2>
      <p class="sub">{{ i18n.t('rev_sub') }} {{ i18n.t('rev_tap') }}</p>
      <div class="avis" tabindex="0">
        @for (i of reviews; track i) {
          <button type="button" class="av" (click)="open(i)">
            <img [src]="'img/avis' + i + '.jpg'" [alt]="i18n.t('avis_alt')" loading="lazy" width="420" height="866" />
          </button>
        }
      </div>
    </div>
    <dialog #lb id="lb" (click)="$event.target === lb && lb.close()">
      <button class="x" type="button" [attr.aria-label]="i18n.t('close')" (click)="lb.close()">×</button>
      @if (current(); as i) {
        <img [src]="'img/avisL' + i + '.jpg'" [alt]="i18n.t('avis_alt')" />
      }
    </dialog>
  `,
})
export class Reviews {
  protected readonly i18n = inject(I18n);
  protected readonly reviews = REVIEWS;
  protected readonly current = signal<number | null>(null);
  private readonly lightbox = viewChild.required<ElementRef<HTMLDialogElement>>('lb');

  protected open(i: number): void {
    this.current.set(i);
    this.lightbox().nativeElement.showModal();
  }
}

@Component({
  selector: 'section[appAbout]',
  imports: [Icon],
  host: { id: 'about', class: 'white' },
  template: `
    <div class="wrap about">
      <img src="img/about.svg" alt="" aria-hidden="true" />
      <div>
        <h2>{{ i18n.t('about_h') }}</h2>
        <p class="sub">{{ i18n.t('about_p') }}</p>
        <a class="btn wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />{{ i18n.t('about_c') }}</a>
      </div>
    </div>
  `,
})
export class About {
  protected readonly i18n = inject(I18n);
}

@Component({
  selector: 'section[appFaq]',
  host: { id: 'faq' },
  template: `
    <div class="wrap narrow">
      <h2>{{ i18n.t('faq_h') }}</h2>
      @for (n of [1, 2, 3, 4]; track n) {
        <details>
          <summary>{{ i18n.t('q' + n) }}</summary>
          <p>{{ i18n.t('a' + n) }}</p>
        </details>
      }
    </div>
  `,
})
export class Faq {
  protected readonly i18n = inject(I18n);
}

@Component({
  selector: 'section[appFinalCta]',
  imports: [Icon],
  host: { class: 'final' },
  template: `
    <div class="wrap">
      <h2>{{ i18n.t('fin_h') }}</h2>
      <p>{{ i18n.t('fin_p') }}</p>
      <a class="btn wa" [href]="i18n.waQuestion()" target="_blank" rel="noopener"><app-icon name="wa" />{{ i18n.t('fin_b') }}</a>
    </div>
  `,
})
export class FinalCta {
  protected readonly i18n = inject(I18n);
}
