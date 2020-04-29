export class CountryDetails {
    updated: string;
    flag: string;
    name?: string;
    topLevelDomain?: string;
    capital?: string;
    region?: string;
    subregion?: string;
    population?: number;
    timezones?: string;
    borders?: string;
    nativeName?: string;
    currencieName?: string;
    currencieSymbol?: string;
    languages?: string;

    constructor(
        updated: string,
        flag: string,
        name: string,
        topLevelDomain: string,
        capital: string,
        region: string,
        subregion: string,
        population: number,
        timezones: string,
        borders: string,
        nativeName: string,
        currencieName: string,
        currencieSymbol: string,
        languages: string,
    ) {
        this.updated = updated;
        this.flag = flag;
        this.name = name;
        this.topLevelDomain = topLevelDomain;
        this.capital = capital;
        this.region = region;
        this.subregion = subregion;
        this.population = population;
        this.timezones = timezones;
        this.borders = borders;
        this.nativeName = nativeName;
        this.currencieName = currencieName;
        this.currencieSymbol = currencieSymbol,
            this.languages = languages;
    }
}
