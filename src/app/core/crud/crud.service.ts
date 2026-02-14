import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CrudService {

  private base = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  list(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(this.base + endpoint);
  }

  create(endpoint: string, data: any): Observable<any> {
    return this.http.post<any>(this.base + endpoint, data);
  }

  update(endpoint: string, id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.base}${endpoint}/${id}`, data);
  }

  delete(endpoint: string, id: any): Observable<any> {
    return this.http.delete(`${this.base}${endpoint}/${id}`);
  }
}
