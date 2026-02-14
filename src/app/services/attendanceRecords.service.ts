import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AttendanceRecord {
  id?: string;

  // ✅ للارسال للـ backend (الـ serializer)
  student?: string;
  session?: string;

  student_id?: string;
  session_id?: string;

  status: 'present' | 'absent' | 'late';
  recorded_at?: string;

  // اختياري للعرض
  student_name?: string;
  session_name?: string;
}

@Injectable({ providedIn: 'root' })
export class AttendanceRecordsService {

  private base = 'http://localhost:8000/api/attendance-records/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AttendanceRecord[]> {
    return this.http.get<AttendanceRecord[]>(this.base);
  }
create(data: Partial<AttendanceRecord>) {
  return this.http.post<AttendanceRecord>(this.base, data);
}

update(id: string, data: Partial<AttendanceRecord>) {
  return this.http.put<AttendanceRecord>(`${this.base}${id}/`, data);
}


  delete(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
