import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }
  dbURL = 'http://localhost:3000/user';
  getUsers(): Observable<any>  {
    return this.http.get<any>('http://localhost:3000/user');
  }

  create(user): Observable<any> {
    return this.http.post<any>('http://localhost:3000/user', user);
  }

  delete(id: number): Observable<any>{
    const url = `${this.dbURL}/${id}`;
    return this.http.delete(url);
  }
  put(user): Observable<any> {
    return this.http.put<any>('http://localhost:3000/user/' + user.id, user);
  }

}
