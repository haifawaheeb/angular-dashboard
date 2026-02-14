import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grade } from '../core/models';



@Injectable({ providedIn: 'root' })
export class GradesService {

  private base = 'http://127.0.0.1:8000/api/grades/';

  constructor(private http: HttpClient) { }

  getGrades() {
    return this.http.get<any[]>(this.base);
  }
  // getAll() {
  //   return this.http.get<Grade[]>(this.base);
  // }

  createGrade(data: any) {
    return this.http.post(this.base, data);
  }

  updateGrade(id: string, data: any) {
    return this.http.put<Grade>(`${this.base}${id}/`, data);
  }



  deleteGrade(id: string) {
    const cleanBase = this.base.replace(/\/+$/, '');
    const cleanId = (id ?? '').toString().replace(/^\/+/, '');

    const url = `${cleanBase}/${cleanId}/`;

    console.log('BASE:', this.base);
    console.log('ID:', id);
    console.log('FINAL URL:', url);

    return this.http.delete(url);
  }


}

