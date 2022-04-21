import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusRead } from '../Models/status-read';
import { StatusWrite } from '../Models/status-write';

const BASE_URL: string = 'https://localhost:7234/api/Status';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  constructor(private http: HttpClient) {}

  getAllStatuses(): Observable<StatusRead[]> {
    return this.http.get<StatusRead[]>(BASE_URL);
  }
  getStatusById(id: Number): Observable<StatusRead> {
    return this.http.get<StatusRead>(`${BASE_URL}/${id}`);
  }
  postStatus(status: StatusWrite) {
    return this.http.post(BASE_URL, status);
  }
  putStatus(id: Number, status: StatusWrite) {
    return this.http.put(`${BASE_URL}/${id}`, status);
  }
  deleteStatus(id: Number) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
