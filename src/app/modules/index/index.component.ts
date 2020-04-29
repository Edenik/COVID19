import { Component, OnInit } from '@angular/core';
import { GetJsonService } from 'src/app/shared/services/get-json.service';
import { CountryReport } from 'src/app/shared/models/country-report';
import { GlobalReport } from 'src/app/shared/models/global-report';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {



  constructor(private getJson: GetJsonService,
    private translate: TranslateService) { }


  countriesReport: CountryReport[] = [];
  globalReport: GlobalReport[] = [];
  sortOptions: string[] = ['cases', 'todayCases', 'deaths', 'todayDeaths', 'recovered', 'active', 'critical', 'casesPerOneMillion', 'deathsPerOneMillion'];
  error: boolean = false;

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getGlobalReport() {
    this.getJson.getGlobalReport().subscribe(
      ele => {
        this.error = false;
        this.globalReport.push({
          updated: ele.updated, cases: ele.cases, todayCases: ele.todayCases,
          deaths: ele.deaths, todayDeaths: ele.todayDeaths, recovered: ele.recovered,
          active: ele.active, critical: ele.critical, casesPerOneMillion: ele.casesPerOneMillion,
          deathsPerOneMillion: ele.deathsPerOneMillion, tests: ele.tests, testsPerOneMillion: ele.testsPerOneMillion,
          affectedCountries: ele.affectedCountries, continent: ele.continent
        })
      },
      err => { console.log('HTTP Error', err); this.error = true; },
      () => console.log('HTTP request completed.')
    )
  }


  getCountriesReport(sortBy) {
    this.getJson.getAllCountriesReport(sortBy).subscribe(
      ele => {
        this.error = false;
        this.countriesReport = [];
        ele.forEach(ele => {
          this.countriesReport.push({ country: ele.country, cases: ele.cases, deaths: ele.deaths, todayDeaths: ele.todayDeaths, todayCases: ele.todayCases, recovered: ele.recovered, active: ele.active, critical: ele.critical, casesPerOneMillion: ele.casesPerOneMillion, deathsPerOneMillion: ele.deathsPerOneMillion, flag: ele.countryInfo.flag, continent: ele.continent, tests: ele.tests, testsPerOneMillion: ele.testsPerOneMillion, updated: ele.updated })
        });
      },
      err => { console.log('HTTP Error', err); this.error = true; },
      () => console.log('HTTP request completed.')
    )
  }



  sort(sortBy) {
    this.countriesReport = [];
    this.getCountriesReport(sortBy);
  }

  ngOnInit(): void {
    this.getCountriesReport('cases');
    this.getGlobalReport();
  }

}
