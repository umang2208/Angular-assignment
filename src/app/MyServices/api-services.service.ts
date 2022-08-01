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
        //console("inside services");
        // //console(response);
        let arr: any = [];
        response.forEach((ele,index)=>{
          arr.push({ele,photo:this.images[index]});
        });

        // for(let i=0 ;i<response.length;i+=1){
        //   let customArr = [response[i],this.images[i]];
        //   arr.push(customArr);
          
        // }
        // //console("hello");
        // //console(arr);
        return arr;
      })
        )
     
  }
  post(userId:string): Observable<any>{
    return this.http.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
}
ablum(userId:string): Observable<any>{
  return this.http.get(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
}
todo(userId:string): Observable<any>{
  return this.http.get(`https://jsonplaceholder.typicode.com/users/${userId}/todos`);
}
comment(userId:string): Observable<any>{
  console.log("service" , userId);
  return this.http.get(`https://jsonplaceholder.typicode.com/posts/${userId}/comments`);
}
userImages(userId:string,albumId:string): Observable<any>{
  return this.http.get(`https://jsonplaceholder.typicode.com/albums/${userId}/photos`);
}
}
