import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Teachers {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  is_active: boolean;

}

@Injectable({ providedIn: 'root' })
export class TeacherService {

  private base = 'http://localhost:8000/api/teachers/';
  private baseURL = 'http://localhost:8000/api/teachers';


  constructor(private http: HttpClient) {}

  getAlls(): Observable<Teachers[]> {
    return this.http.get<Teachers[]>(this.base);
  }

  create(data: Teachers): Observable<Teachers> {
    return this.http.post<Teachers>(this.base, data);
  }

 update(id: string, data: any) {
  return this.http.put(`${this.baseURL}/${id}/`, data);
}


delete(id: string) {
  return this.http.delete(`${this.base}${id}/`);
}

}
