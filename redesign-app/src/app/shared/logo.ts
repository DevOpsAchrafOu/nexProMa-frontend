import { Component, computed, input } from '@angular/core';

/**
 * nexProMa logo ("Sparkle", chosen by the owner on 2026-11-21): the blue tile with a white "n"
 * and the green sparkle (same drawing as public/favicon.svg), next to the "nexProMa" wordmark.
 * `dark` = on a dark background ("nex" in white, "ProMa" in light blue).
 */
@Component({
  selector: 'app-logo',
  host: { class: 'brand', '[class.on-dark]': 'dark()' },
  template: `
    <svg class="mark" viewBox="0 0 48 48" [attr.width]="size()" [attr.height]="size()" aria-hidden="true">
      <defs>
        <linearGradient [attr.id]="gid" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#3b74ff" /><stop offset="1" stop-color="#0d4ee1" />
        </linearGradient>
      </defs>
      <rect width="48" height="48" rx="13" [attr.fill]="'url(#' + gid + ')'" />
      <path d="M12.5 37V17.5h5.6v2.9c1.7-2.3 4.3-3.5 7.4-3.5 5.6 0 9.4 3.7 9.4 9.7V37h-5.6v-9.6c0-3.4-1.9-5.4-4.9-5.4-3.2 0-6.3 2.1-6.3 6.3V37z" fill="#fff" />
      <path d="M37.5 5.5c.45 3.9 3.6 7.05 7.5 7.5-3.9.45-7.05 3.6-7.5 7.5-.45-3.9-3.6-7.05-7.5-7.5 3.9-.45 7.05-3.6 7.5-7.5z" fill="#00d555" stroke="#0d4ee1" stroke-width="1.2" stroke-linejoin="round" />
    </svg>
    <span class="wm" aria-hidden="true"><span class="nex">nex</span><span class="pro">ProMa</span></span>
  `,
})
export class Logo {
  readonly dark = input(false);
  readonly size = input(36);
  /** Gradient id: header (light) and footer (dark) are on the same page, so each gets its own. Same on server and browser. */
  protected readonly gidSig = computed(() => (this.dark() ? 'nxg-dark' : 'nxg-light'));
  protected get gid(): string {
    return this.gidSig();
  }
}
