import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../../../environment';
import { IOfficer } from '../models/officer';
import { ISearchResults } from '../models/search-results';

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

  constructor(private http: HttpClient) { }

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

  getCompany(companyId: string): Observable<any> {
    try {
      const company = this.companiesCachedList.searchResults.items.filter(x => x.company_number == companyId)
      return of(company[0])
    }
    catch (e) {
      return of(e)
    }
  }

  getOfficers(companyId: string): Observable<any> {
    if (this.companiesCachedList && this.companiesCachedList.companyId === companyId) {
      return of(this.companiesCachedList.officers);
    } else {
      return this.http.get(`${this.apiUrl}/Officers?CompanyNumber=${companyId}`).pipe(
        map((data: any) => {
          this.companiesCachedList.officers = data.items;
          this.companiesCachedList.companyId = companyId;
          return data.items;
        }),
        catchError((error) => {
          console.error('Error fetching officers:', error);
          return of(null);
        })
      );
    }
  }
}
