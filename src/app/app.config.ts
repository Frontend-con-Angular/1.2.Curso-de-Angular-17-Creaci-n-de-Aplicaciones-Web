import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding} from '@angular/router';
//servicio para consumir api
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(),
    provideHttpClient(),
    provideRouter(
      routes,
      withComponentInputBinding()
    ),
  ]
};
