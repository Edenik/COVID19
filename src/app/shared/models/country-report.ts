export class CountryReport {
    [x: string]: any;
    country: string;
    continent: string;
    cases: number;
    todayCases: number;
    deaths: number;
    todayDeaths: number;
    recovered: number;
    active: number;
    critical: number;
    casesPerOneMillion: number;
    deathsPerOneMillion: number;
    flag: string;
    tests: number;
    testsPerOneMillion: number;

    constructor(
        country: string,
        continent: string,
        flag: string,
        cases: number,
        todayCases: number,
        deaths: number,
        todayDeaths: number,
        recovered: number,
        active: number,
        critical: number,
        casesPerOneMillion: number,
        deathsPerOneMillion: number,
        tests: number,
        testsPerOneMillion: number) {
        this.country = country;
        this.continent = continent;
        this.cases = cases;
        this.todayCases = todayCases;
        this.deaths = deaths;
        this.todayDeaths = todayDeaths;
        this.recovered = recovered;
        this.active = active;
        this.critical = critical;
        this.casesPerOneMillion = casesPerOneMillion;
        this.deathsPerOneMillion = deathsPerOneMillion;
        this.flag = flag;
        this.tests = tests;
        this.testsPerOneMillion = testsPerOneMillion;
    }
}
