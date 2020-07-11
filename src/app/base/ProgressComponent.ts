import { Directive } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class ProgressComponent {
  protected readonly loading = new BehaviorSubject<boolean>(false);
  readonly loading$ = this.loading.asObservable();
}
