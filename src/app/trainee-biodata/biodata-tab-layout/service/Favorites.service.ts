import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Favorites } from '../models/Favorites';
import { IFavoritesPagination,FavoritesPagination } from '../models/FavoritesPagination';
import { PostResponse } from '../../../core/models/PostResponse';
import { map } from 'rxjs';
import { SelectedModel } from '../../../core/models/selectedModel';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  baseUrl = environment.apiUrl;
  Favoritess: Favorites[] = [];
  FavoritesPagination = new FavoritesPagination();
  constructor(private http: HttpClient) { }


  getSelectedFavoritesType(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/favorites-type/get-selectedFavoritesType')
  }

  
  getselectedLanguage(){
    return this.http.get<SelectedModel[]>(this.baseUrl + '/language/get-selectedLanguage')
  }

  getFavoritesByTraineeId(id: number){
    return this.http.get<Favorites[]>(this.baseUrl + '/favorites/get-listByTrainee?Traineeid=' + id).pipe(
      map(response => {
        return response;
      })
    );
  }

 
  find(id: number) {
    return this.http.get<Favorites>(this.baseUrl + '/favorites/get-favoritesDetail/' + id);
  }

  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/favorites/update-favorites/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/favorites/save-favorites', model).pipe(
      map((Favorites: PostResponse) => {
        if (Favorites) {
          console.log(Favorites);
          return Favorites;
        }
      })
    );
  }  
  delete(id:number){
    return this.http.delete(this.baseUrl + '/favorites/delete-favorites/'+id);
  }
}
