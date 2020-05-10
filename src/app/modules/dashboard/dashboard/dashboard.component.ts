import { Component, OnInit } from '@angular/core';
import { GameService } from '@core/services/game.service';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, filter, debounceTime, distinctUntilChanged} from 'rxjs/operators';

export interface gameModel{
  title:string,
  platform:string,
  score:number,
  genre:string,
  editors_choice:string
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gameList = [];
  gameCategories = [];
  selectedTab:any = '';
  selectedGameTitle:any='';
  sortOptionsShow:boolean = false;
  gameCtrl = new FormControl();
  filteredGames:Observable<gameModel[]>;

  constructor(private _gameapi:GameService) { 
   
  }

  ngOnInit() {
    this.getGameList();
    this.gameCtrl.valueChanges.subscribe(value=>{
      if(!value) 
        this.selectedGameTitle = '';
    })
    this.filteredGames = this.gameCtrl.valueChanges
    .pipe(
      debounceTime(400),
      distinctUntilChanged(),
      map(value => typeof value === 'string' ? value : value.title),
      map(game => game? this.searchGameFilter(game):this.gameList.slice())
    );
  }

  isGameObj(obj) : obj is gameModel{
    return ('title' in obj && 'platform' in obj && 'score' in obj && 'genre' in obj && 'editors_choice' in obj);
  }

  searchGameFilter(value): gameModel[] {
    console.log("isde"+value)
    const filterValue = value.toLowerCase();

    return this.gameList.filter(game => game.title.toLowerCase().includes(filterValue));
  }

  onTabChange(category){
    this.selectedTab = category;
  }

  sortRadioChange(event){
    if(event.value === 'asc')
      this.gameList = this.gameList.sort((a,b)=>a.score-b.score)
    else 
      this.gameList = this.gameList.sort((a,b)=>b.score-a.score)  
    this.showSort();  
  }

  showSort(){
    this.sortOptionsShow = !this.sortOptionsShow;
  }

  getGameList(){
    this._gameapi.getAllGames().subscribe((data:any)=>{
      this.gameList = data.filter(obj => this.isGameObj(obj));
      this.gameList.forEach(gameObj => {
        let index = this.gameCategories.includes(gameObj.platform);
        if(index == false){
          this.gameCategories.push(gameObj.platform);
        }
      });
      this.selectedTab = this.gameCategories[0];

      console.log("JSON---"+this.gameList.length)
    },err => {
      console.log("err");
    })
  }

  getSelectedGame(gameObj){
    console.log("insideeeee selee"+JSON.stringify(gameObj));
    this.selectedTab = gameObj.platform;
    this.selectedGameTitle = gameObj.title;
    console.log(this.selectedTab)
  }

  getOptionText(game){
    return game && game.title? game.title : '';
  }

}
