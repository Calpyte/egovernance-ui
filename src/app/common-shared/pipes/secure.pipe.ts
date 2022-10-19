import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { CommonHttpClientService } from '../commonHttpService';
import { AppConfiguration } from '../AppConfiguration';


@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  constructor(private commonHttpClientService:CommonHttpClientService,private appConfiguration:AppConfiguration) { }

  transform(url): Observable<SafeUrl> {
      return this.commonHttpClientService.httpImageGet(this.appConfiguration.file.getImgById+url);
      // return this.http
      //     .get(url, { responseType: 'blob' })
      //     .map(val => this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(val)));
  }

}
