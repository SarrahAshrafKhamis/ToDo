import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FlagRead } from '../Models/flag-read';
import { FlagWrite } from '../Models/flag-write';

const BASE_URL: string = 'https://localhost:7234/api/Flag';

@Injectable({
  providedIn: 'root',
})
export class FlagService {
  constructor(private http: HttpClient) {}

  getAllFlags(): Observable<FlagRead[]> {
    return this.http.get<FlagRead[]>(BASE_URL);
  }
  getFlagById(id: Number): Observable<FlagRead>{
    return this.http.get<FlagRead>(`${BASE_URL}/${id}`);
  }
  postFlag(flag: FlagWrite){
    return this.http.post(BASE_URL, flag);
  }
  putFlag(id: Number, flag: FlagWrite) {
    return this.http.put(`${BASE_URL}/${id}`, flag);
  }
  deleteFlag(id: Number) {
    return this.http.delete(`${BASE_URL}/${id}`);
  }
}
