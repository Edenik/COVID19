import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { CountryReport } from '../../models/country-report';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { GetJsonService } from '../../services/get-json.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-widgets-stacked',
  templateUrl: './stacked.component.html',
  styleUrls: ['./stacked.component.scss']
})
export class StackedComponent implements OnInit {

  constructor(private translate: TranslateService, private localStorage: LocalStorageService) { }
  Highcharts = Highcharts;
  chartOptions: {};
  chartOptionsPer: {};
  @Input() data: CountryReport[];
  countries: any[] = [];
  cases: any[] = [];
  active: any[] = [];
  deaths: any[] = [];
  recovered: any[] = [];
  todayCases: any[] = [];
  todayDeaths: any[] = [];
  casesPer1Mil: any[] = [];
  deathsPer1Mil: any[] = [];
  critical: any[] = [];
  tests: any[] = [];
  testsPer1Mil: any[] = [];
  subscription: Subscription;
  lang: string;
  dir: string;


  checkLang() {
    const source = interval(1500);
    this.subscription = source.subscribe(val => {
      this.dir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
      if (this.dir === 'rtl' && this.lang === 'en') {
        this.lang = 'he';
        this.showGraph();
      }
      else if (this.dir === 'ltr' && this.lang === 'he') {
        this.lang = 'en';
        this.showGraph();
      }
    });
  }

  showGraph() {
    this.checkLang();
    this.chartOptions = {
      chart: {
        type: 'bar'
      },
      title: {
        text: `${this.translate.instant('chart')} ${this.translate.instant('comprasion')}: ${this.translate.instant('general')}`
      },
      xAxis: {
        categories: this.countries
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'Tests',
        data: this.tests
      }, {
        name: 'Recovered',
        data: this.recovered
      }, {
        name: 'Critical',
        data: this.critical
      }, {
        name: 'Active',
        data: this.active
      }, {
        name: 'Today Deaths',
        data: this.todayDeaths
      }, {
        name: 'Deaths',
        data: this.deaths
      }, {
        name: 'Today Cases',
        data: this.active
      }, {
        name: 'Cases',
        data: this.cases
      }]
    }

    this.chartOptionsPer = {
      chart: {
        type: 'bar'
      },
      title: {
        text: `${this.translate.instant('chart')} ${this.translate.instant('comprasion')}: ${this.translate.instant('per 1 mil')}`
      },
      xAxis: {
        categories: this.countries
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      legend: {
        reversed: true
      },
      plotOptions: {
        series: {
          stacking: 'normal'
        }
      },
      series: [{
        name: 'Tests per 1 mil',
        data: this.testsPer1Mil
      },
      {
        name: 'Deaths per 1 mil',
        data: this.deathsPer1Mil
      },
      {
        name: 'Cases per 1 mil',
        data: this.casesPer1Mil
      }
      ]
    }
  }

  ngOnInit(): void {
    console.table(this.data);
    this.data.forEach(ele => {
      this.countries.push(ele.country)
      this.cases.push(ele.cases)
      this.active.push(ele.active)
      this.deaths.push(ele.deaths)
      this.recovered.push(ele.recovered)
      this.todayCases.push(ele.todayCases)
      this.todayDeaths.push(ele.todayDeaths)
      this.casesPer1Mil.push(ele.casesPerOneMillion)
      this.deathsPer1Mil.push(ele.deathsPerOneMillion)
      this.critical.push(ele.critical)
      this.tests.push(ele.tests)
      this.testsPer1Mil.push(ele.testsPerOneMillion)
    })

    this.dir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
    if (this.dir === 'rtl') {
      this.lang = 'he';
    }
    else {
      this.lang = 'en';
    }

    this.showGraph();


    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
