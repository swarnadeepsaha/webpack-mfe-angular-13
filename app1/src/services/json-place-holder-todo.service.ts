import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError, timeout } from 'rxjs';

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

  handleError(){
    console.error('error during http call');
    return throwError(() => new Error('Error'));
  }
}
