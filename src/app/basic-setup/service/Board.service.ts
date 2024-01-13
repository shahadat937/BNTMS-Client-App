import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {IBoardPagination,BoardPagination } from '../models/BoardPagination'
import { Board } from '../models/Board';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BoardService {
  baseUrl = environment.apiUrl;
  Boards: Board[] = [];
  BoardPagination = new BoardPagination();
  constructor(private http: HttpClient) { }

  getBoards(pageNumber, pageSize, searchText) { 

    let params = new HttpParams();

    params = params.append('searchText', searchText.toString());
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    
    return this.http.get<IBoardPagination>(this.baseUrl + '/board/get-boards', { observe: 'response', params })
    .pipe(
      map(response => {
        this.Boards = [...this.Boards, ...response.body.items];
        this.BoardPagination = response.body;
        return this.BoardPagination;
      })
    );  
  }
  find(id: number) {
    return this.http.get<Board>(this.baseUrl + '/board/get-boardDetail/' + id);
  }
  update(id: number,model: any) {
    return this.http.put(this.baseUrl + '/board/update-board/'+id, model);
  }
  submit(model: any) {
    return this.http.post(this.baseUrl + '/board/save-board', model);
  } 
  delete(id:number){
    return this.http.delete(this.baseUrl + '/board/delete-board/'+id);
  }

}
