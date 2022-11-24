import {
  ChangeDetectorRef,
  Injectable,
  InjectFlags,
  StaticProvider,
  ViewRef,
  ɵɵdirectiveInject as inject,
} from '@angular/core';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { RxState, select } from '@rx-angular/state';

export function describeEngine<T extends object>(initialState?: Partial<T>) {
  const injectState = (): RxEngine<T> => {
    return inject(RxEngine, InjectFlags.Self);
  };
  const provideState = (): StaticProvider => {
    return {
      provide: RxEngine,
      useFactory: () => {
        const cdRef = inject(ChangeDetectorRef);
        const service = new RxEngine(cdRef, initialState);
        (cdRef as ViewRef).onDestroy(() => {
          service.ngOnDestroy();
        });
        return service;
      },
    };
  };
  return { injectState, provideState };
}

@Injectable()
export class RxEngine<T extends object> extends RxState<T> {
  constructor(private cdRef: ChangeDetectorRef, private initialState?: T) {
    super();
    cdRef.detach();
    const strategyProvider = inject(RxStrategyProvider);
    if (initialState) {
      this.set({ ...initialState });
    }
    this.hold(
      this.$.pipe(select()).pipe(
        strategyProvider.scheduleWith(
          () => {
            cdRef.detectChanges();
          },
          {
            scope: (cdRef as any).context,
          }
        )
      )
    );
  }
}
