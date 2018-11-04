import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any) {
    const router = this.injector.get(Router);
    console.log(`Request URL: ${router.url}`);
    // Potentially route to some error route, if something goes wrong.
    // Use sentry to log errors.

    if (error instanceof  HttpErrorResponse) {
      console.error('Oops, something went wrong', `${error.status} - ${error.message}`);
    } else {
      console.error('An error occurred:', error.message);
    }
  }
}
