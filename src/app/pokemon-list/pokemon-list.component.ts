import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {

  pokemons: any[] = [];
  pokemonsLetters: any[] = [];
  pokemon: any = "";
  pokemonByName: any = "";
  sortedMap: any = {};
  offset: number = 0;
  defaultLimit: number = 10;
  page: number = 1;
  totalPokemons: number = 0;
  chart: any = "";
  chartByName: any = "";
  selectedPokemon: any;
  myControl = new FormControl();
  filteredOptions: Observable<string[]> | undefined;
  allPokemons: any[] = [];

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
    this.getPokemons();
    this.seeMore("bulbasaur");
    this.getPokemonByName("charmander");
    this.getAllPokemons();
    this.dataService.getAllPokemons().subscribe((pokemons: any) => {
      pokemons.results.forEach((element: any) => {
        this.allPokemons.push(element.name);
      });
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((val) => this.filter(val))
    );
  }

  filter(val: any): any[] {
  return this.allPokemons.filter((item: any) => {
    if (typeof val === 'object') { val = "" };
    const TempString = item;
    return TempString.toLowerCase().includes(val.toLowerCase());
  });
  }

  AutoCompleteDisplay(item: any): any {
  if (item != undefined) { return item; }
  return undefined;
  }

  async getPokemons() {
    this.dataService.getPokemons(this.offset = (this.page * this.defaultLimit) - this.defaultLimit, this.defaultLimit)
      .subscribe((response: any) => {
        this.totalPokemons = response.count;
        response.results.forEach((element: any) => {
          this.dataService.getMoreData(element.name)
            .subscribe((res: any) => {
              this.pokemons.push(res);
            });
        });
      });
  }

  async getAllPokemons(){
    this.dataService.getAllPokemons().subscribe((resp: any) => {
      resp.results.forEach((element: any) => {
        this.pokemonsLetters.push(element.name);
      });
      let letterCount = this.pokemonsLetters.reduce((count: any, word: string) => {
        let firstLetter = word[0];
        count[firstLetter] = (count[firstLetter] || 0) + 1;
        return count;
      }, {});
      let count = new Map(Object.entries(letterCount).map(([k, v]) => [k.toUpperCase(), v]));
      let sortedCount = Array.from(count.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      this.sortedMap = new Map(sortedCount);
    });
  }

  getPokemonByName(name: string) {
    this.dataService.getPokemonByName(name.toLowerCase()).subscribe((res: any) => {
      this.pokemonByName = res;
      this.chartByName = {
        animationsEnabled: true,
        theme: "light1",
        title: {
            text: "Statistics",
            fontFamily: "tahoma",
        },
        axisY: {
          title: "Stats",
        },
        axisX: {
          title: "Names"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "HP", y: res.stats[0].base_stat },
                { label: "Attack", y: res.stats[1].base_stat },
                { label: "Defense", y: res.stats[2].base_stat },
                { label: "Sp. Attack", y: res.stats[3].base_stat },
                { label: "Sp. Defense", y: res.stats[4].base_stat },
                { label: "Speed", y: res.stats[5].base_stat }
            ]
        }]
      };
    });
  }

  seeMore(name: string) {
    this.dataService.getMoreData(name).subscribe((res: any) => {
      this.pokemon = res;
      this.chart = {
        animationsEnabled: true,
        title: {
            text: "Statistics",
            fontFamily: "tahoma",
        },
        data: [{
            type: "pie",
            dataPoints: [
                { label: "HP", y: res.stats[0].base_stat },
                { label: "Attack", y: res.stats[1].base_stat },
                { label: "Defense", y: res.stats[2].base_stat },
                { label: "Sp. Attack", y: res.stats[3].base_stat },
                { label: "Sp. Defense", y: res.stats[4].base_stat },
                { label: "Speed", y: res.stats[5].base_stat }
            ]
        }]
      };
    });
  }
}
