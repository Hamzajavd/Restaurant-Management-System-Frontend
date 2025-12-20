import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { generate, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  url = environment.apiUrl;

  constructor(private httpClient:HttpClient) {}

    generateReport(data:any){
  return this.httpClient.post(this.url + "/bill/generateReport", data,{
    headers: new HttpHeaders().set('content-Type', "application/json")
  })
}

    getPDF(data:any):Observable<Blob>{
     return this.httpClient.post(this.url + "/bill/getPdf", data,{
      responseType: 'blob'  

     })
    }


    getBills(){
      return this.httpClient.get(this.url + "/bill/getbill/");
    }



    delete(id:any){
  return this.httpClient.delete(this.url + "/bill/delete/" + id,{
    headers: new HttpHeaders().set("content-Type","application/json")
  });
}
  
}
