import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { describeEngine } from '../engine.service';

const { provideEngine, injectEngine } = describeEngine({
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
          {{ vm.count }}
        </div>
      </div>
      <div class="col-4">
        <div class="mat-headline">Value</div>
        <div>
          {{ vm.count }}
        </div>
      </div>
      <div class="col-4">
        <div class="mat-headline">Value</div>
        <div>
          {{ vm.count }}
        </div>
      </div>
    </div>
  `,
  styles: [``],
  providers: [provideEngine()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EngineBasicComponent implements OnInit, AfterViewInit {
  readonly vm = injectEngine().vm;

  @ViewChild('row') set row(row: ElementRef) {
    console.log(row);
  }

  ngOnInit() {
    console.log('NgOnInit');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit');
  }

  increment() {
    this.vm.count++;
  }
}
