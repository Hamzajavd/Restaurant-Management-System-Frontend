import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }


  add(data: any) {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.httpClient.post(`${this.url}/product/add/`, data, { headers })
  }


  update(data: any) {
    return this.httpClient.patch(this.url + "/product/update", data, {
      headers: new HttpHeaders().set('content-Type', 'application/json')
    })
  }


  getProducts() {
    return this.httpClient.get(this.url + "/product/get/")
  }

  updateStatus(data: any) {
    return this.httpClient.patch(this.url + "/product/updateStatus", data, {
      headers: new HttpHeaders().set('content-Type', 'application/json')
    })
  }


  delete(id: any) {
    return this.httpClient.delete(this.url + "/product/delete/" + id, {
      headers: new HttpHeaders().set('content-Type', 'application/json')
    })
  }

  getProductsByCategory(id: any) {
    return this.httpClient.get(this.url + "/product/getByCategory/" + id);
  }


  getById(id: any) {
    return this.httpClient.get(this.url + "/product/getById/" + id)
  }


}
