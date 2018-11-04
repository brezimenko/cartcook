import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {concat, Observable, of, throwError} from 'rxjs';
import {ResponseStructure} from '../../models/response-structure';
import {catchError, delay, flatMap, map, retryWhen, take} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  // apiUrl = environment.production ? 'http://www.recipepuppy.com/api/' : 'https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/apis/';
  apiUrl = 'http://www.recipepuppy.com/api/';

  constructor(private _http: HttpClient,
              private toastr: ToastrService) {
  }

  get(url: string): Observable<ResponseStructure> {
    return this._http.get<ResponseStructure>(`${this.apiUrl}${url}`).pipe(
      retryWhen(error => {
        return error.pipe(flatMap((e: any) => {
            if (e.status === 503) {
              return of(e.status).pipe(delay(1000));
            }
            return throwError(e);
          }),
          take(2),
        );
      }),
      catchError(this.handleError.bind(this))
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      this.toastr.error('An error occurred:', error.error.message);
      console.error('An error occurred:', error.error.message);
    } else {
      this.toastr.error(`Backend returned code ${error.status}`, error.statusText);
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.statusText}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
