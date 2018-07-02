import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CarouselService } from './carusel.service';

@Component({
  selector: 'home-carousel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss']
})
export class CarouselComponent implements OnInit {

  isLoading: boolean;
  slides: any = [];

  constructor(private carouselService: CarouselService) { }

  ngOnInit() {
    this.isLoading = true;
    this.carouselService.getAllBanners().subscribe(value => { this.slides = value });
  }

}
