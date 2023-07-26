import { Injectable } from '@angular/core';
import { environments } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LeaseService {

  private apiUrl: string = `${environments.apiUrl}/lease`


  constructor(private http: HttpClient) { }

  createLease( lease: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, lease);
  }
}
