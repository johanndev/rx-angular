import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

export const ROUTES = [
  {
    path: '',
    redirectTo: 'basic',
  },
  {
    path: 'basic',
    loadChildren: () =>
      import('./basic/engine-basic.module').then((m) => m.EngineBasicModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
})
export class EngineDemoModule {}
