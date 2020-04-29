import { Component, OnInit, Input } from '@angular/core';
import { GetJsonService } from '../../services/get-json.service';
import { CountryDetails } from '../../models/country-details';

@Component({
  selector: 'app-country-info',
  templateUrl: './country-info.component.html',
  styleUrls: ['./country-info.component.scss']
})
export class CountryInfoComponent implements OnInit {
  error: boolean = false;
  currencieNameDis: any;
  currencieNameSymbol: any;
  languageDis: any;

  constructor(private getJson: GetJsonService) { }
  @Input() country: string;
  countryDetails: CountryDetails[] = []
  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.getJson.getCountryDetailes(this.country).subscribe(

      ele => {
        this.error = false;
        this.currencieNameDis = ele[0].currencies[0].name;
        this.currencieNameSymbol = ele[0].currencies[0].symbol;
        this.languageDis = ele[0].languages[0].name;

        this.countryDetails.push({
          updated: ele[0].updated,
          flag: ele[0].flag,
          name: ele[0].name,
          topLevelDomain: ele[0].topLevelDomain,
          capital: ele[0].capital,
          region: ele[0].region,
          subregion: ele[0].subregion,
          population: ele[0].population,
          timezones: ele[0].timezones,
          borders: ele[0].borders,
          nativeName: ele[0].nativeName,
          currencieName: this.currencieNameDis,
          currencieSymbol: this.currencieNameSymbol,
          languages: this.languageDis
        })


      },
      err => { console.log('HTTP Error', err); this.error = true },
      () => console.log('HTTP request completed.')
    );

  }

}
