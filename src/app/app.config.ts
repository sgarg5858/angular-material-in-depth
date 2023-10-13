import { APP_INITIALIZER, PLATFORM_INITIALIZER, importProvidersFrom, inject } from "@angular/core";
import { ApplicationConfig } from "@angular/platform-browser";
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";
import { ThemeManager } from "./core/theme-manager.service";
import { MATERIAL_SANITY_CHECKS } from "@angular/material/core";

export const appConfig:ApplicationConfig={
    providers:[
      provideRouter(appRoutes),
      importProvidersFrom(NoopAnimationsModule,BrowserAnimationsModule),
      {
        provide:APP_INITIALIZER,
        useFactory:()=> inject(ThemeManager).theme$
      },
      {
        provide:MATERIAL_SANITY_CHECKS,
        useValue:{
          theme:false
        }
      }
    ]
}