import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { retryInterceptor } from './app/core/interceptors/retry.interceptor';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withInterceptors([retryInterceptor])
    )
  ]
}).catch(err => console.error(err));
