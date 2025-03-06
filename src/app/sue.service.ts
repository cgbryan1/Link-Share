import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

// If your API returns an object with properties, you will need to define an interface
// Your method would return Observable<YourInterfaceName>.
export interface SueResponse {
  resource_id: string;
  resource_type: URLType; // how do i import my URLType from the last assignment?
  content: string;
  // timer?: number; didn't implement
}

@Injectable({
  providedIn: 'root',
})
export class SueService {
  constructor(private http: HttpClient) {}

  createShareLink(
    content: string,
    type: string,
    r_id?: string
  ): Observable<SueResponse> {
    return of({
      resource_id: 'https://foo.bar',
      resource_type: URLType.PASTEBIN,
      content: 'hello',
    });
  }

  // (which will be provided by the component) for creating a resource for your API (e.g. the type of resource and the content of the resource).
}
