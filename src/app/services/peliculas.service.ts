import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private cateleraPage = 1;

  public cargando: boolean = false;

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key: 'e77eb2afc10ccf76ba64b51c2a6a992b',
      language: 'es-ES',
      page: this.cateleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]> {

    if(this.cargando){
      // of transforma un observable que emite lo que esta dentro como ejemplo esto emite un arreglo vacio
      return of([]);
    }

    console.log('Cargando API');

    this.cargando = true;

    return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing?`,{
      params: this.params
    }).pipe(
      // Esto lo transforma la respuesta del observable
      map( (resp) => resp.results ),
      tap( () => {
        this.cateleraPage += 1;
        this.cargando = false;
      })
    );
  }
}
