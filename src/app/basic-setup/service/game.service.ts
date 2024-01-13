import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';
import {IGamePagination, GamePagination } from '../models/gamePagination'
import { Game } from '../models/game';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GameService {
  baseUrl = environment.apiUrl;
  games: Game[] = [];
  gamePagination = new GamePagination();
  constructor(private http: HttpClient) { }

  getGames(pageNumber, pageSize,searchText) {

    let params = new HttpParams();
    
    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
   

    return this.http.get<IGamePagination>(this.baseUrl + '/game/get-games', { observe: 'response', params })
    .pipe(
      map(response => {
        this.games = [...this.games, ...response.body.items];
        this.gamePagination = response.body;
        return this.gamePagination;
      })
    );
   
  }
  find(id: number) {
    return this.http.get<Game>(this.baseUrl + '/game/get-gameDetail/' + id);
  }
   

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/game/update-game/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/game/save-game', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/game/delete-game/'+id);
  }
}
