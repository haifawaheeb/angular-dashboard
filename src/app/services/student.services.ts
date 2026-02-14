import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentModel {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  is_active: boolean;
}

@Injectable({ providedIn: 'root' })
export class StudentService {

  private base = 'http://localhost:8000/api/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(this.base);
  }

  createStudent(data: StudentModel): Observable<StudentModel> {
    return this.http.post<StudentModel>(this.base, data);
  }

  updateStudent(id: string, data: StudentModel): Observable<StudentModel> {
    return this.http.put<StudentModel>(`${this.base}/${id}`, data);
  }

  deleteStudent(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
