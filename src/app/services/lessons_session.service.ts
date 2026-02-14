import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LessonSession {
  id?: string;
  timetable_slot: string;
  lesson?: string | null;
  session_date?: string | null;
  actual_start?: string | null;
  actual_end?: string | null;
  actual_end_datetime?: string | null;
}

@Injectable({ providedIn: 'root' })
export class LessonSessionsService {

  private base = 'http://127.0.0.1:8000/api/lesson-sessions/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<LessonSession[]> {
    return this.http.get<LessonSession[]>(this.base);
  }

  create(data: Partial<LessonSession>): Observable<LessonSession> {
    return this.http.post<LessonSession>(this.base, data);
  }

  update(id: string, data: Partial<LessonSession>): Observable<LessonSession> {
  return this.http.patch<LessonSession>(`${this.base}${id}/`, data);
}


  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}${id}/`);

  }
}
