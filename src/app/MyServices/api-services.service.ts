import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIServicesService {


  images = [ 
    "assets/assignImages/pics1.jpeg",
    "assets/assignImages/2nd.png",
    "assets/assignImages/3rd.png",
    "assets/assignImages/4th.png",
    "assets/assignImages/5th.png",
    "assets/assignImages/6th.png",
    "assets/assignImages/7th.png",
    "assets/assignImages/8th.png",
    "assets/assignImages/9th.png",
    "assets/assignImages/10th.png"
  ] ;
  // return this.http.get<SomeType>(url, {headers: this.headers})
  // .pipe(
  //    map( response => {  // NOTE: response is of type SomeType
  //        // Does something on response.data
  //        // modify the response.data as you see fit.

  //        // return the modified data:
  //        return response; // kind of useless
  //    }),
  //    catchError( error => {
  //        return throwError(error); // From 'rxjs'
  //    })
  // );
  constructor( private http:HttpClient) { }
  userData : any[] = [];
  users(): Observable<any>{
      return this.http.get<[]>('https://jsonplaceholder.typicode.com/users')
      .pipe(map((response) => {
        console.log("inside services");
        console.log(response);
        let arr: any = [];
        response.forEach((ele,index)=>{
          arr.push({ele,photo:this.images[index]});
        });

        // for(let i=0 ;i<response.length;i+=1){
        //   let customArr = [response[i],this.images[i]];
        //   arr.push(customArr);
          
        // }
        console.log("hello");
        console.log(arr);
        return arr;
      })
        )
     
  }
  post(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
}
ablum(): Observable<any>{
  return this.http.get('https://jsonplaceholder.typicode.com/albums');
}
todo(): Observable<any>{
  return this.http.get(`https://jsonplaceholder.typicode.com/todos`);
}
comment(): Observable<any>{
  return this.http.get('https://jsonplaceholder.typicode.com/comments');
}
userImages(): Observable<any>{
  return this.http.get('https://jsonplaceholder.typicode.com/photos');
}
}