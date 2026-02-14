import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EducationStage } from '../core/models/education-stage.model';

@Injectable({ providedIn: 'root' })
export class StageService {

  private base = 'http://127.0.0.1:8000/api/stages';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<any[]>(`${this.base}/`);
  }

  getOne(id: string) {
    return this.http.get<any>(`${this.base}/${id}/`);
  }

  create(data: any) {
    return this.http.post(`${this.base}/`, data);
  }

  update(id: string, data: any) {
    return this.http.patch(`${this.base}/${id}/`, data);
  }

  delete(id: string) {
    return this.http.delete(`${this.base}/${id}/`);
  }
}
