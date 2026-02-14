import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClassroomModel {
  id?: string;
  grade_id: string;
  name: string;
  capacity: number;
}

@Injectable({ providedIn: 'root' })
export class ClassRoomsService {

  private base = 'http://127.0.0.1:8000/api/classrooms/';
  // TODO: unify delete URL once API routing is refactored

  private readonly baseUrl = 'http://127.0.0.1:8000/api/classrooms';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClassroomModel[]> {
    return this.http.get<ClassroomModel[]>(this.base);
  }

  create(data: ClassroomModel): Observable<ClassroomModel> {
    return this.http.post<ClassroomModel>(this.base, data);
  }

update(id: string, data: ClassroomModel): Observable<ClassroomModel> {
  return this.http.put<ClassroomModel>(
    `${this.base}${id}/`,
    data
  );
}

  delete(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}/`);
  }

}
