import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environment';
import { ISearchResults } from '../models/search-results';
import { IOfficer } from '../models/officer';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;
  private companiesCachedList = {} as {
    searchResults: ISearchResults;
    searchTerm: string;
    officers: IOfficer[];
    companyId: string;
  };

  constructor(private http:HttpClient) { }

  searchCompanies(searchTerm: string): Observable<any> {
    if (this.companiesCachedList && this.companiesCachedList.searchTerm === searchTerm) {
      return of(this.companiesCachedList.searchResults);
    } else {
      return this.http.get(`${this.apiUrl}/Search?Query=${searchTerm}`).pipe(
        map((data: any) => {
          this.companiesCachedList.searchResults = data;
          this.companiesCachedList.searchTerm = searchTerm;

          return data;
        }),
        catchError((error) => {
          console.error('Error fetching search results:', error);
          return of(null);
        })
      );
    }
  }
}
