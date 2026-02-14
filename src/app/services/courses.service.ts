import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

export interface coursesModel {
id?: string;
subject_id?: string;
grade_id?: string;
main_teacher_id?: string;
academic_year?: Data;
is_active?: boolean;
}

@Injectable({ providedIn: 'root' })
export class CoursesService {

  private base = 'http://127.0.0.1:8000/api/courses/';
   private baseURL = 'http://127.0.0.1:8000/api/courses';

  constructor(private http: HttpClient) {}

  getcourses(): Observable<any[]> {
    return this.http.get<any[]>(this.base);
  }

  createcourses(data: any): Observable<any> {
    return this.http.post<any>(this.base, data);
  }

  updatecourses(id: string, data: any): Observable<any> {
     return this.http.put(`${this.baseURL}/${id}/`, data);
  }

  deletecourses(id: string): Observable<any> {
  return this.http.delete(`${this.base}${id}/`);
  }


}
