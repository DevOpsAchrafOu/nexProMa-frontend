import { Component, ContentChild, ElementRef, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { fromEvent, Subject } from 'rxjs';
import { filter, switchMapTo, take } from 'rxjs/operators';
import { EditModeDirective } from 'src/app/directives/edit-mode.directive';
import { ViewModeDirective } from 'src/app/directives/view-mode.directive';


@UntilDestroy()
@Component({
  selector: 'editable',
  template: `
    <ng-container  *ngTemplateOutlet="currentView"></ng-container>
  `
})
export class EditableComponent implements OnInit {


  editMode = new Subject();
  editMode$ = this.editMode.asObservable();


  @Output() update = new EventEmitter();
  @ContentChild(ViewModeDirective) viewModeTpl: any;// ViewModeDirective ;
  @ContentChild(EditModeDirective) editModeTpl: any;//EditModeDirective;

  mode: 'view' | 'edit' = 'edit';

  constructor(private host: ElementRef) {

  }

  get currentView() {
    return this.mode === 'view' ? this.viewModeTpl.tpl : this.editModeTpl.tpl;
  }


  ngOnInit() {
    this.viewModeHandler();
    this.editModeHandler();
  }

  private get element() {
    return this.host.nativeElement;//pour pointer sur lui meme <editable></editable>
  }


  private viewModeHandler() {
     fromEvent(this.element, 'dblclick').pipe(//fromEvent(this.element, 'dblclick').pipe(
     untilDestroyed(this)//désabonner automatiquement les observables
   ).subscribe(() => {
     this.mode = 'edit';
     this.editMode.next(true);
   });
 }

 private editModeHandler() {
  const clickOutside$ = fromEvent(document, 'click').pipe(
    filter(({ target }) => this.element.contains(target) === false),//filter by condition
    take(1)//take one element
  )

  this.editMode$.pipe(
    switchMapTo(clickOutside$),//??
    untilDestroyed(this)//désabonner automatiquement les observables
  ).subscribe(event => {
    this.update.next();
    this.mode = 'view';
  });
}

}
