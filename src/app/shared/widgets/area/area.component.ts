import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { TranslateService } from '@ngx-translate/core';
import { interval, Subscription } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-widgets-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  chartOptions: {};
  @Input() data: [];
  @Input() country: [];
  @Input() cases: [];
  @Input() deaths: [];
  @Input() recovered: [];
  @Input() dates: [];
  casesOnly: [] = [];
  lastDaysCases: any = [];
  lastDaysDates: any = [];
  lastDaysRecovered: any = [];
  lastDaysDeaths: any = [];
  lang: string;
  dir: string;
  subscription: Subscription;
  Highcharts = Highcharts;
  range: number;

  constructor(private translate: TranslateService, private localStorage: LocalStorageService) { }
  showGraph(days) {
    this.range = days;
    this.checkLang();
    this.lastDaysCases = [];
    this.lastDaysDates = [];
    this.lastDaysRecovered = [];
    this.lastDaysDeaths = [];
    if (days == 0)
      days = this.cases.length;

    for (let index = this.cases.length - days; index < this.cases.length; index++) {
      this.lastDaysCases.push(this.cases[index])
      this.lastDaysDates.push(this.dates[index])
      this.lastDaysDeaths.push(this.deaths[index])
      this.lastDaysRecovered.push(this.recovered[index])
    }
    // console.log('area')
    // console.log('dates')
    // console.log(this.lastDaysDates)
    // console.log('cases')
    // console.log(this.lastDaysCases)
    // console.log('recovered')
    // console.log(this.lastDaysRecovered)
    // console.log('deaths')
    // console.log(this.lastDaysDeaths)
    this.chartOptions = {
      chart: {
        type: 'area'
      },
      title: {
        text: `${this.translate.instant('Historical Report')}: ${this.translate.instant('last area')} ${days} ${this.translate.instant('days area')}`
      },
      subtitle: {
        text: this.country
      },
      xAxis: {
        categories: this.lastDaysDates,
        tickmarkPlacement: 'on',
        title: {
          enabled: false
        }
      },
      tooltip: {
        split: true,
        valueSuffix: ''
      },

      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
      },
      series:
        [{
          name: 'Cases',
          data: this.lastDaysCases
        }, {
          name: 'Recovered',
          data: this.lastDaysRecovered
        }, {
          name: 'Deaths',
          data: this.lastDaysDeaths
        }]
    };

  }

  checkLang() {
    const source = interval(1500);
    this.subscription = source.subscribe(val => {
      this.dir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
      if (this.dir === 'rtl' && this.lang === 'en') {
        this.lang = 'he';
        this.showGraph(this.range);
      }
      else if (this.dir === 'ltr' && this.lang === 'he') {
        this.lang = 'en';
        this.showGraph(this.range);
      }
    });
  }
  ngOnInit() {
    this.dir = this.localStorage.getObjFromStorage("COVID-APP-DIR");
    if (this.dir === 'rtl') {
      this.lang = 'he';
    }
    else {
      this.lang = 'en';
    }

    this.showGraph(30);


    HC_exporting(Highcharts);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}