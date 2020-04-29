import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CountryReport } from '../models/country-report';
import { CountryDetails } from '../models/country-details';
import { GlobalReport } from '../models/global-report';
import { HistoricalReport } from '../models/historical-report';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetJsonService {

  constructor(private http: HttpClient) { }
  readonly countriesReportUrl = "https://corona.lmao.ninja/v2/countries";
  readonly globalReportUrl = "https://corona.lmao.ninja/v2/all";
  readonly countryDetailesUrl = "https://restcountries.eu/rest/v2/name/";
  readonly historicalReportUrl = "https://corona.lmao.ninja/v2/historical";
  readonly newsUrl = "https://newsapi.org/v2/"
  getAllHistoricalReport(days): Observable<HistoricalReport> {
    return this.http.get<HistoricalReport>(`${this.historicalReportUrl}?lastdays=${days}`)
  }

  getCountryHistoricalReport(days, name): Observable<any> {
    return this.http.get<any>(`${this.historicalReportUrl}/${name}?lastdays=${days}`)
  }

  getCountryReport(name): Observable<CountryReport[]> {
    return this.http.get<CountryReport[]>(`${this.countriesReportUrl}/${name}`)
  }
  getAllCountriesReport(sortBy): Observable<CountryReport[]> {
    return this.http.get<CountryReport[]>(`${this.countriesReportUrl}?sort=${sortBy}`)
  }

  getGlobalReport(): Observable<GlobalReport> {
    return this.http.get<GlobalReport>(this.globalReportUrl)
  }

  getCountryDetailes(name): Observable<CountryDetails> {
    return this.http.get<CountryDetails>(`${this.countryDetailesUrl}${name}`)
  }
  getHebrewNews(): Observable<any> {
    return this.http.get<any>(`${this.newsUrl}everything?q=קורונה&sortBy=publishedAt&apiKey=${environment.newsApiKey}`)
  }

  getEnglishNews(): Observable<any> {
    return this.http.get<any>(`${this.newsUrl}top-headlines?country=us&category=health&apiKey=${environment.newsApiKey}`)
  }

}
