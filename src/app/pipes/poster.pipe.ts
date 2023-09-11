import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  transform( poster: string ): string {
    if ( poster ) {
      return `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${ poster }`;
    }else{
      return './assets/img/no-image.jpg';
    }
  }

}
