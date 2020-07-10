import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-inline-spinner',
  templateUrl: './inline-spinner.component.html',
  styleUrls: ['./inline-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineSpinnerComponent {}
