import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserModel {
  id?: string;
  full_name: string;
  full_name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  is_active: boolean;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class PymentsService {

  private base = 'http://localhost:8000/api/users';

  constructor(private http: HttpClient) {}

  getPyment(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.base);
  }

  createPyment(data: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.base, data);
  }

  updatePyment(id: string, data: UserModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${this.base}/${id}`, data);
  }

  deletePyment(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
