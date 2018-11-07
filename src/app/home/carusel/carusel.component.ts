import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { CarouselService } from './carusel.service';
import { PersistenceService } from '@app/core/persistence.service';

@Component({
  selector: 'home-carousel',
  templateUrl: './carusel.component.html',
  styleUrls: ['./carusel.component.scss']
})
export class CarouselComponent implements OnInit {

  private apiUrl: string;
  isLoading: boolean;
  slides: any = [];

  constructor(private carouselService: CarouselService,
    private persistenceService: PersistenceService) {
      this.apiUrl = persistenceService.apiUrl;
    }

  ngOnInit() {
    this.isLoading = true;
    this.carouselService.getAllBanners().subscribe(value => { this.slides = value });
  }

}
