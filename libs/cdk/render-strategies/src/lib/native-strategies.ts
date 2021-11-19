import { ɵmarkDirty as markDirty } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { RxCustomStrategyCredentials, RxNativeStrategyNames, RxRenderWork, RxStrategyCredentials } from './model';
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';

const animationFrameTick = () =>
  new Observable<number>((subscriber) => {
    // use the unpatched API no avoid zone interference
    const id = getZoneUnPatchedApi('requestAnimationFrame')(() => {
      subscriber.next(0);
      subscriber.complete();
    });
    return () => {
      // use the unpatched API no avoid zone interference
      getZoneUnPatchedApi('cancelAnimationFrame')(id);
    };
  });

const localCredentials: RxStrategyCredentials = {
  name: 'local',
  work: (cdRef, _, notification) => {
    cdRef.detectChanges();
  },
  behavior:
    (work: () => RxRenderWork, scope: Record<string, unknown>) => (o$) =>
      o$.pipe(
        coalesceWith(animationFrameTick(), scope),
        tap(() => work())
      ),
};

const globalCredentials: RxStrategyCredentials = {
  name: 'global',
  work: (_, context) => markDirty(context),
  behavior: (work: any) => (o$) => o$.pipe(tap(() => work())),
};

const noopCredentials: RxStrategyCredentials = {
  name: 'noop',
  work: () => void 0,
  behavior: () => (o$) => o$,
};

const nativeCredentials: RxStrategyCredentials = {
  name: 'native',
  work: (cdRef) => cdRef.markForCheck(),
  behavior: (work: any) => (o$) => o$.pipe(tap(() => work())),
};

export type RxNativeStrategies =
  RxCustomStrategyCredentials<RxNativeStrategyNames>;
export const RX_NATIVE_STRATEGIES: RxNativeStrategies = {
  global: globalCredentials,
  native: nativeCredentials,
  noop: noopCredentials,
  local: localCredentials,
};
