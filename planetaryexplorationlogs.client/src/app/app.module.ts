import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { PlanetService } from './features/planets/services/planet.service';


@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule,
        FormsModule,
        CoreModule], providers: [
        PlanetService,
        ErrorHandlerService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
