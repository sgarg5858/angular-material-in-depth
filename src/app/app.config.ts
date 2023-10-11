import { importProvidersFrom } from "@angular/core";
import { ApplicationConfig } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";
import { appRoutes } from "./app.routes";

export const appConfig:ApplicationConfig={
    providers:[
      provideRouter(appRoutes),
      importProvidersFrom(BrowserAnimationsModule)
    ]
}