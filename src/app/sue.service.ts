import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// If your API returns an object with properties, you will need to define an interface
// Your method would return Observable<YourInterfaceName>.

export enum URLType {
  PASTEBIN = 'PASTEBIN',
  REDIRECT = 'REDIRECT', // just recreating the enum here instead of importing the file lol
}

export interface SueResponse {
  resource_id: string;
  resource_type: URLType; // how do i import my URLType from the last assignment?
  content: string;
  // timer?: number; didn't implement
  // views?: number; didn't implement i don't think
}

@Injectable({
  providedIn: 'root',
})
export class SueService {
  constructor(private http: HttpClient) {}

  apiLink = 'https://ex01-comp590-140-25sp-cgbryan.apps.unc.edu';

  // which to call depends on which option they choose in form... implement choice in other file right?

  createPastebin(content: string, r_id?: string): Observable<SueResponse> {
    const body = { content, r_id }; // didn't implement timer so not including that here
    return this.http.post<SueResponse>(`${this.apiLink}/pastebin`, body);

    /*
    return of({
      // changed given return type to match what my API returns rip
      resource_id: 'SueDemoPastebin',
      resource_type: URLType.PASTEBIN,
      content: content,
    }); */
  }

  createShortURL(content: string, r_id?: string): Observable<SueResponse> {
    const body = { content, r_id };

    return this.http.post<SueResponse>(`${this.apiLink}/redirect`, body);

    // TODO check that i did the of right for future ref
    /*
    return of({
      resource_id: 'SueDemoShortURL',
      resource_type: URLType.REDIRECT,
      content: content,
    }); */
  }
}
