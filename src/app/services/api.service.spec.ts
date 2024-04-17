
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api.service';
import { environment } from '../../../environment';
import { sampleSearchData } from '../dummy-data/dummy-response-data';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cached search results if search term is the same', () => {
    const searchTerm = 'test';
    const cachedResults = {
      searchResults: sampleSearchData,
      searchTerm: searchTerm,
      officers: [],
      companyId: ''
    };

    service['companiesCachedList'] = cachedResults;

    service.searchCompanies(searchTerm).subscribe((results) => {
      expect(results).toEqual(cachedResults.searchResults);
    });

    const req = httpMock.expectNone(`${environment.apiUrl}/Search?Query=${searchTerm}`);
  });

  it('should make an HTTP request if search term is different', () => {
    const searchTerm = 'test';
    const newResults = { /* mocked search results */ };

    service.searchCompanies(searchTerm).subscribe((results) => {
      expect(results).toEqual(newResults);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Search?Query=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.flush(newResults);
  });

  it('should handle HTTP request error', () => {
    const searchTerm = 'test';
    const errorMessage = 'Error fetching search results';

    service.searchCompanies(searchTerm).subscribe((results) => {
      expect(results).toBeNull();
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/Search?Query=${searchTerm}`);
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent(errorMessage));
  });
});