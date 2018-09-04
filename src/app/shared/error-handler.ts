import { ToastyService, ToastOptions } from 'ng2-toasty';
import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable()
export class ErrorsHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const toasty = this.injector.get(ToastyService);
    if (error instanceof HttpErrorResponse) {
      if (!navigator.onLine) {
        // Handle offline error
      } else {
        const toastOption: ToastOptions = {
          title: 'Server Error',
          msg: `${error.status} - ${error.message}`,
          showClose: true,
          timeout: 5000,
          theme: 'material'
        };
        toasty.error(toastOption);
        // Handle Http Error (error.status === 403, 404...)
      }
    } else {
      // Handle Client Error (Angular Error, ReferenceError...)
    }
    // Log the error anyway
    console.error('Error: ', error);
  }
}
