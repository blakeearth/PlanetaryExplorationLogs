import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { RetryInterceptor } from './interceptors/retry.interceptor';
import { ErrorHandlerService } from './services/error-handler.service';

@NgModule({ declarations: [], imports: [CommonModule], providers: [
        ErrorHandlerService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RetryInterceptor,
            multi: true
        },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import CoreModule only in AppModule.');
    }
  }
}
