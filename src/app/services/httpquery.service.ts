import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import {  Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class HttpqueryService {
  params: any;
  url:string="http://localhost"; //scanner/public_html/admin   .. or domain name ex. https://domain.com
  server: string = this.url+"/server.php";
  fileUrl: string="";;
  constructor(private http:HttpClient) {
     this.http=http;
   }
   sendGet() {
    let params:any=this.params;
      return this.http.get(this.server,{params,withCredentials: true});
   }
   sendBlob(){

    let params:HttpParams=this.params;
   console.log(params);

    let h={"Content-Type": "application/x-www-form-urlencoded"};
    let headers = new HttpHeaders(h);
      this.http.post<Blob>(  this.server,  params, {

        headers:headers ,
        withCredentials: true,

        observe: 'response',
        responseType: 'blob' as 'json'
      }).subscribe((response:HttpResponse<Blob>)=>{

        let contentDisposition=response.headers.get('Content-Disposition') as string;
        let filename = contentDisposition.split(';')[1].split('filename')[1].split('=')[1].trim();
        this.downloadFile(response.body, filename);
        })
   }
   sendPost(){

    let params:any=this.params;
    let h={"Content-Type": "application/x-www-form-urlencoded"};
      let headers = new HttpHeaders(h);
      return  this.http.post(this.server, params, { headers:headers ,withCredentials: true});
   }
   sendFiles(){

    let params:any=this.params;

      return  this.http.post(this.server, params, { withCredentials: true});
   }

  scrollUp(time=1){
    if (time<1) window.scrollTo(0, 0);
    let scrollToTop = setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
       clearInterval(scrollToTop);
      }
  }, time);
  }
  downloadFile(data: any, filename:string) {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    this.fileUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a')
    a.href = this.fileUrl;
    a.download =filename;
    a.click();
  }
}