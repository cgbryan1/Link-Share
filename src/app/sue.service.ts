import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// If your API returns an object with properties, you will need to define an interface

export enum URLType {
  PASTEBIN = 'PASTEBIN',
  REDIRECT = 'REDIRECT', // just recreating the enum here instead of importing the file lol
}

export interface SueResponse {
  resource_id: string;
  resource_type: URLType;
  content: string;
}

@Injectable({
  providedIn: 'root',
})
export class SueService {
  constructor(private http: HttpClient) {}

  apiLink = 'https://ex01-comp590-140-25sp-cgbryan.apps.unc.edu';

  // need this for amy's access to resource list
  // i regret naming this file sue now. rip
  getResources(): Observable<SueResponse[]> {
    return this.http.get<SueResponse[]>(`${this.apiLink}`);
  }

  // which to call depends on which option they choose in form... implement choice in other file right?

  createPastebin(content: string, r_id?: string): Observable<SueResponse> {
    const body = { content, r_id }; // didn't implement timer so not including that here
    return this.http.post<SueResponse>(`${this.apiLink}/pastebin`, body);
  }

  createShortURL(content: string, r_id?: string): Observable<SueResponse> {
    const body = { content, r_id };
    return this.http.post<SueResponse>(`${this.apiLink}/redirect`, body);
  }
}
