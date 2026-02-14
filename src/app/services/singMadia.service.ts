import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {SignMedia} from '../core/models/singmedia.model';

@Injectable({ providedIn: 'root' })
export class SingMadiaService {

 private baseSing = 'http://127.0.0.1:8000/api/signmedia/';
 private baseUrl = 'http://127.0.0.1:8000/api/signmedia';
  constructor(private http: HttpClient) {}
  getAlls(): Observable<any[]> {
    return this.http.get<any[]>(this.baseSing);
  }

  create(data: any): Observable<any> {
    return this.http.post<any>(this.baseSing, data);
  }

delete(id: string) {
  return this.http.delete(`${this.baseUrl}/${id}/`);
}

update(id: string, data: any) {
  return this.http.put(`${this.baseUrl}/${id}/`, data);
}

}
