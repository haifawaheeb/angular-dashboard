import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LessonModel {
  id?: string;
  course_id?: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  lesson_type: string;
  sign_media_id?: string | null;
  order_index: number;
  is_published: boolean;
  created_at?: string;
}

@Injectable({ providedIn: 'root' })
export class LessonsService {
  private base = 'http://localhost:8000/api/lessons/';

  constructor(private http: HttpClient) {}

  getLessons(): Observable<LessonModel[]> {
    return this.http.get<LessonModel[]>(this.base);
  }

  createLessons(data: LessonModel): Observable<LessonModel> {
    return this.http.post<LessonModel>(this.base, data);
  }

  updateLessons(id: string, data: LessonModel): Observable<LessonModel> {
    return this.http.put<LessonModel>(`${this.base}${id}/`, data);
  }

  deleteLessons(id: string): Observable<any> {
    return this.http.delete(`${this.base}${id}/`);
  }
}
