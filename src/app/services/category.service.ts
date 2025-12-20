import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  add(data: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post(`${this.url}/category/add/`, data, { headers })
  }


  update(data: any) {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.patch(this.url + "/category/update", data, { headers })
  }

  delete(id: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.delete(this.url + "/category/delete/" + id, {headers})
  }


  getCategorys() {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.get(`${this.url}/category/get/`, { headers });
  }
}
