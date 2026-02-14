import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TimetableSlot {
  id?: string;
  classroom_id: string;
  course_id: string;
  weekday: string;
  start_time: string;
  end_time: string;
}

@Injectable({ providedIn: 'root' })
export class TimeSoltService {

  private base = 'http://localhost:8000/api/timetable-slots/';
  private baseURL = 'http://127.0.0.1:8000/api/timetable-slots';


  constructor(private http: HttpClient) {}

  getTimeSolt(): Observable<TimetableSlot[]> {
    return this.http.get<TimetableSlot[]>(this.base);
  }

  createTimeSolt(data: TimetableSlot): Observable<TimetableSlot> {
    return this.http.post<TimetableSlot>(this.base, data);
  }
  updateTimeSlot(id: string, data: TimetableSlot): Observable<TimetableSlot> {
    return this.http.put<TimetableSlot>(`${this.baseURL}/${id}/`, data);
  }


  deleteTimeSolt(id: string): Observable<any> {
   return this.http.delete(`${this.base}${id}/`);
  }
}
