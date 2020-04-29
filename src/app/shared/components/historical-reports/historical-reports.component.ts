import { Component, OnInit, Input } from '@angular/core';
import { GetJsonService } from '../../services/get-json.service';
import { HistoricalReport } from '../../models/historical-report';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-historical-reports',
  templateUrl: './historical-reports.component.html',
  styleUrls: ['./historical-reports.component.scss'],
  providers: [DatePipe]
})
export class HistoricalReportsComponent implements OnInit {

  constructor(private getJson: GetJsonService, private datePipe: DatePipe) { }
  @Input() country: string;
  chartOptions: {};
  error: boolean = false;

  report: HistoricalReport[] = [];
  cases: any[] = [];
  deaths: any[] = [];
  recovered: any[] = [];
  dates: any[] = [];
  unsortedDates: any[] = [];
  data: any = [];
  lastDaysCases: any = [];
  lastDaysDates: any = [];
  lastDaysRecovered: any = [];
  lastDaysDeaths: any = [];

  getCountryHistoricalReport(country) {
    this.getJson.getCountryHistoricalReport("all", country).subscribe(ele => {
      // console.log(ele)
      this.data = Object.values(ele);
      // console.log(this.data)
      this.unsortedDates = Object.keys(this.data[2].cases)

      this.unsortedDates.forEach(ele => {
        this.dates.push(this.datePipe.transform(ele, 'dd-MM-yy'));
      })
      // console.log('dates from historical')
      // console.log(this.dates)
      this.cases = Object.values(this.data[2].cases)
      // console.log(this.cases)
      this.deaths = Object.values(this.data[2].deaths)
      // console.log(this.deaths)
      this.recovered = Object.values(this.data[2].recovered)
      // console.log(this.recovered)

    },
      err => { console.log('HTTP Error', err); this.error = true },
      () => console.log('HTTP request completed.')
    );

  }



  ngOnInit(): void {
    this.getCountryHistoricalReport(this.country);
  }

}