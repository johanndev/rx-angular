import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PushModule } from '@rx-angular/template';
import { UnpatchModule } from '@rx-angular/template/unpatch';
import { DirtyChecksModule } from '../../../../shared/debug-helper/dirty-checks/index';
import { EngineBasicComponent } from './engine-basic.component';
import { ROUTES } from './engine-basic.routes';

const DECLARATIONS = [EngineBasicComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    PushModule,
    DirtyChecksModule,
    MatButtonModule,
    UnpatchModule,
  ],
  exports: [DECLARATIONS],
})
export class EngineBasicModule {}
