import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { catchError, Observable, subscribeOn, throwError, timeout } from 'rxjs'; // rxjs 7.5.0
import { Observable, throwError } from 'rxjs'; // rxjs 6.5.4
import { catchError, timeout } from 'rxjs/operators'; // rxjs 6.5.4

@Injectable({
  providedIn: 'root'
})
export class JsonPlaceHolderTodoService {

  constructor(private readonly http: HttpClient) { }

  getTodos(id: number): Observable<any> {
    const url = `https://jsonplaceholder.typicode.com/todos/${id}`;
    return this.http.get<any>(url)
      .pipe(
        timeout(2000),
        catchError(this.handleError)
      );
  }

  fakeCall(): Observable<any> {
    return new Observable((subscriber) => {
      setTimeout(() => {
        subscriber.next(true);
        subscriber.complete();
      }, 1000);
    });
  }

  handleError(){
    console.error('error during http call');
    return throwError(() => new Error('Error'));
  }
}
