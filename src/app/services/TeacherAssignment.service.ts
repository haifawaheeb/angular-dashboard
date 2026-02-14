import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TeachersAssegement {
  id?: string;
  teacher_id: string;
  grade_id: string;
  subject_id: string;
  is_active: boolean;
}

@Injectable({ providedIn: 'root' })
export class TeacherAssegementService {

private base = 'http://localhost:8000/api/teacher-assignments/';
private baseURL = 'http://localhost:8000/api/teacher-assignments';

constructor(private http: HttpClient) { }

  getAll(): Observable<TeachersAssegement[]> {
    return this.http.get<TeachersAssegement[]>(this.base);
  }
  create(data: TeachersAssegement): Observable<TeachersAssegement> {
    return this.http.post<TeachersAssegement>(this.base, data);
  }
  update(id: string, data: any) {
    return this.http.put(`${this.baseURL}/${id}/`, data);
  }
  delete(id: string) {
    return this.http.delete(`${this.base}${id}/`);
  }
}
