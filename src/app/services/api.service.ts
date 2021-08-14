import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';
import { person } from './person';


@Injectable({
  providedIn: 'root'
})
export class APIService {

  // API nodejs y postgresql
  API: string="http://localhost:3000/personas"

  constructor(private clientHttp:HttpClient){}

  sendPerson(dataPerson:person):Observable<any> {
      return this.clientHttp.post(this.API,dataPerson);
  }

  getPerson(){
    return this.clientHttp.get(this.API)
  }
}
