import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private cateleraPage = 1;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key: 'e77eb2afc10ccf76ba64b51c2a6a992b',
      language: 'es-ES',
      page: this.cateleraPage.toString()
    }
  }

  getCartelera():Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing?`,{
      params: this.params
    }).pipe(
      tap( () => {
        this.cateleraPage += 1;
      })
    );
  }
}
