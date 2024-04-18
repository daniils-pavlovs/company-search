import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ISearchResults } from '../../models/search-results';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  private searchTerm: string = '';
  searchResults: ISearchResults = {
    page_number: 0,
    kind: '',
    total_results: 0,
    items: []
  };

  length = 10;
  pageSize = 10;
  pageIndex = 1;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['query'];
      if (this.searchTerm) {
        this.apiService.searchCompanies(this.searchTerm).subscribe(
          data => {
            this.searchResults = data;
          }
        );
      } else {
        console.error('Search term is missing from the query string.');
      }
    });
  }
}
