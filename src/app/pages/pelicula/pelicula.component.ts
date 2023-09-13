import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Genre, MovieResponse } from 'src/app/interfaces/movie-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { Cast } from 'src/app/interfaces/credits-response';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movie: MovieResponse | any;
  public cast: Cast[] = [];
  public generos: Genre[] | any;
  public duracionPelicula: { hours: number; minutes: number; } | undefined;

  constructor(  private activatedRoute: ActivatedRoute,
                private peliculasService: PeliculasService,
                private location: Location,
                private router: Router ) { }

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;
  
    // Realizar todas las llamadas asincrónicas que necesitas en paralelo usando forkJoin
    forkJoin([
      this.peliculasService.getPeliculaDetalle(id),
      this.peliculasService.getCast(id),
      this.peliculasService.getGeneros()
    ]).subscribe(
      ([movie, cast, genres]) => {
        if (!movie) {
          this.router.navigateByUrl('/home');
          return;
        }
  
        this.movie = movie;
        this.cast = cast.filter(actor => actor.profile_path !== null);


          // Calcular horas y minutos
        const minutos = movie.runtime;
        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;

        this.duracionPelicula = {
          hours: horas,
          minutes: minutosRestantes
        };

  
        // Asignar nombres de géneros
        this.movie.genres.forEach((genre: { id: any; name: any }) => {
          const idx = genres.findIndex((g: { id: any }) => g.id === genre.id);
          if (idx !== -1) {
            genre.name = genres[idx].name;
          }
        });
  
        this.generos = this.movie.genres;
      },

      error => {
        console.error(error);
        // Manejar errores aquí si es necesario
      }
    );
  }

  onRegresar() {
    this.location.back();
    window.scrollTo(0, 0);

  }

}
