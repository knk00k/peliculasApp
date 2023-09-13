import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import Swiper from 'swiper';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input() movies: Movie[] = [];

  public mySwiper: Swiper | undefined;

  constructor(private router: Router) { }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper', {
      loop: true,

    });
  }
  
  ngOnInit(): void {
  }  

  onSlidePrev(){
    this.mySwiper?.slidePrev();
  }

  onSlideNext(){
    this.mySwiper?.slideNext();
  }

  onMovieClick( movie: Movie ){
    this.router.navigate(['/pelicula', movie.id]);
  }
}
