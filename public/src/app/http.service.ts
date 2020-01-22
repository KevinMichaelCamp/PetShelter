import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets() {
    return this._http.get('/animals');
  }

  createPet(pet: object) {
    return this._http.post(`/animals`, pet);
  }

  getPet(id: string) {
    return this._http.get(`/animals/${id}`);
  }

  likePet(id: string, pet: object) {
    return this._http.put(`/like/${id}`, pet);
  }

  updatePet(id: string, pet: object) {
    return this._http.put(`/animals/${id}`, pet);
  }

  deletePet(id: string) {
    return this._http.delete(`/animals/${id}`);
  }
}
