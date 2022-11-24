import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { describeEngine } from '../engine.service';

const { injectState, provideState } = describeEngine({
  count: 0,
});

@Component({
  selector: 'rxa-ignite-basic-example',
  template: `
    <div class="row mb-2" #row>
      <div class="col">
        <button mat-raised-button (click)="increment()">Update</button>
      </div>
    </div>
    <rxa-dirty-check></rxa-dirty-check>
    <div class="row">
      <div class="col-4">
        <div class="mat-headline">Value</div>
        <div>
          {{ engine.get('count') }}
        </div>
      </div>
      <div class="col-4">
        <div class="mat-headline">Value</div>
        <div>
          {{ engine.get('count') }}
        </div>
      </div>
      <div class="col-4">
        <div class="mat-headline">Value</div>
        <div>
          {{ engine.get('count') }}
        </div>
      </div>
    </div>
  `,
  styles: [``],
  providers: [provideState()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineBasicComponent {
  readonly engine = injectState();

  @ViewChild('row') set row(row: ElementRef) {
    console.log(row);
  }

  increment() {
    this.engine.set(({ count }) => ({ count: count + 1 }));
  }
}
