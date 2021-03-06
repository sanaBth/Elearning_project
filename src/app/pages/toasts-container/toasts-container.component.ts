import {  OnInit } from '@angular/core';
import {Component, TemplateRef} from '@angular/core';
import { ToastService } from 'app/service/toast.service';

@Component({
  selector: 'app-toasts-container',
  template: `
  <ngb-toast
    *ngFor="let toast of toastService.toasts"
    [header]="toast.headertext"
    [class]="toast.classname"
    [autohide]="true"
    [delay]="toast.delay || 4000"
    (hide)="toastService.remove(toast)"
  >
    <ng-template [ngIf]="isTemplate(toast)" [ngIfElse]="text">
      <ng-template [ngTemplateOutlet]="toast.textOrTpl"></ng-template>
    </ng-template>

    <ng-template #text>{{ toast.textOrTpl }}</ng-template>
  </ngb-toast>
`,
host: {'[class.ngb-toasts]': 'true'},

})
export class ToastsContainerComponent {

  constructor(public toastService: ToastService) {}

  isTemplate(toast) { return toast.textOrTpl instanceof TemplateRef; }
}
