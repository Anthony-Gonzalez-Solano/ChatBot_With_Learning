import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})  

export class QuestionsService {

    constructor(private http: HttpClient) { }

    List(): Observable<any> {
        return this.http.get("http://localhost:5000/myAPI/lista");
    }
    
    Insert(obj:any): Observable<any> {
        return this.http.post("http://localhost:5000/myAPI/insertar",obj);
    }

    Update(obj:any): Observable<any> {
        return this.http.put("http://localhost:5000/myAPI/modificar",obj);
    }

}