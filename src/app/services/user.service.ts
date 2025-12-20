import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  signup(data:any): Observable<any> {
    return this.httpClient.post(`${this.url}/user/signup`, data,{
        headers: new HttpHeaders().set('Content-Type',"application/json")
      }
    )
  }


  forgotPassword(data: any): Observable<any> {
   return this.httpClient.post(`${this.url}/user/forgetpassword`, data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    }
   )
  }

  login(data:any): Observable<any>{
    return this.httpClient.post(`${this.url}/user/signin`, data,{
      headers: new HttpHeaders().set('content-Type', 'application/json')
    }
  )
  }


  checkToken() {
  const token = localStorage.getItem('token');

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.httpClient.get(this.url + "/user/checkToken", { headers });
}
  

  changePassword(data:any){
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post(this.url + "/user/changePassword", data, {headers});
  }


 getDetails() {
  const token = localStorage.getItem('token');

  return this.httpClient.get(`${this.url}/dashboard/details/`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

getUsers(){
  return this.httpClient.get(this.url + "/user/get")
}


update(data:any){
return this.httpClient.patch(this.url + "/user/update",data,{
  headers: new HttpHeaders().set('content-Type','application/json')
})
}


}

