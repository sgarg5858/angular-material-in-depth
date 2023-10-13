import { PLATFORM_INITIALIZER, importProvidersFrom, inject } from "@angular/core";
import { ApplicationConfig } from "@angular/platform-browser";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { ThemeManager } from "./core/theme-manager.service";

export const appConfig:ApplicationConfig={
    providers:[
      provideRouter(appRoutes),
      importProvidersFrom(NoopAnimationsModule,BrowserAnimationsModule),
      {
        provide:PLATFORM_INITIALIZER,
        useFactory:()=> inject(ThemeManager).theme$
      }
    ]
}