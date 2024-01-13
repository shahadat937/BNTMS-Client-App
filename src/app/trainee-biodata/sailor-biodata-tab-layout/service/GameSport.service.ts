import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GameSport } from '../models/GameSport';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class GameSportService {
  baseUrl = environment.apiUrl;
  GameSports: GameSport[] = [];
  constructor(private http: HttpClient) { }

  

  getselectedgame(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/game/get-selectedGame')
  }

  getdatabytraineeid(id: number){
    return this.http.get<GameSport[]>(this.baseUrl + '/game-sport/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        //this.EducationalQualifications = [...this.EducationalQualifications, ...response.body.items];        
        //response = this.EducationalQualifications;
        return response;
      })
    );
  }


  find(id: number) {
    return this.http.get<GameSport>(this.baseUrl + '/game-sport/get-gameSportDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/game-sport/update-gameSport/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/game-sport/save-gameSport', model).pipe(
      map((GameSport: PostResponse) => {
        if (GameSport) {
          console.log(GameSport);
          return GameSport;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/game-sport/delete-gameSport/'+id);
  }
}
