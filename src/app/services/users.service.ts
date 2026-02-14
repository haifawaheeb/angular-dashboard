import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserModel {
  id?: string;
  full_name_en: string;
  full_name_ar: string;
  email: string;
  phone: string;
  national_id: string;
  is_active: boolean;
  created_at?: string;
  update_data?: boolean;
  role: string[];
}

@Injectable({ providedIn: 'root' })
export class UserService {

private base = 'http://127.0.0.1:8000/api/users/';
  constructor(private http: HttpClient) {}

  getAll(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(this.base);
  }

  create(data: UserModel): Observable<UserModel> {
    return this.http.post<UserModel>(this.base, data);
  }

  update(id: string, data: UserModel): Observable<UserModel> {
   return this.http.put<UserModel>(this.base + id + '/', data);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(this.base + id + '/');
  }
}
