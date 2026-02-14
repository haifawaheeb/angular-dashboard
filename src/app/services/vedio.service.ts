import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignMedia } from '../core/models/singmedia.model';

@Injectable({ providedIn: 'root' })
export class VedioService {

  private base = 'http://localhost:8000/api/sign-media';

  constructor(private http: HttpClient) {}

  getVideos(): Observable<SignMedia[]> {
    return this.http.get<SignMedia[]>(this.base);
  }

  createVideo(data: SignMedia): Observable<SignMedia> {
    return this.http.post<SignMedia>(this.base, data);
  }

  updateVideo(id: string, data: SignMedia): Observable<SignMedia> {
    return this.http.put<SignMedia>(`${this.base}/${id}`, data);
  }

  deleteVideo(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
