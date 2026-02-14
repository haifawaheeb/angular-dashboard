import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SubjectModel {
  id?: string;
  grade : string;
  name_ar: string;
  name_en: string;
  code: string;
}

@Injectable({ providedIn: 'root' })
export class SubjectService {

  private base = 'http://localhost:8000/api/subjects/';
  private baseURL = 'http://127.0.0.1:8000/api/subjects';

  constructor(private http: HttpClient) {}

  getSubject(): Observable<SubjectModel[]> {
    return this.http.get<SubjectModel[]>(this.base);
  }

  createSubject(data: SubjectModel): Observable<SubjectModel> {
    return this.http.post<SubjectModel>(this.base, data);
  }

updateSubject(id: string, data: SubjectModel): Observable<SubjectModel> {
    return this.http.put<SubjectModel>(`${this.base}${id}/`, data);
  }

  deleteSubject(id: string): Observable<any> {
     return this.http.delete(`${this.baseURL}/${id}/`);
  }

}

