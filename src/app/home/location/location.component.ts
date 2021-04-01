/// <reference types="@types/googlemaps" />
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Service } from '@app/core/types/service';
import { Sales } from '@app/core/types/sales';
import { SalesService } from '@app/admin/sales/sales.service';
import { ServiceService } from '@app/home/service/service.service';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-home-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  salesData: Sales[] = [];
  @ViewChild('gmapSales') gmapSales: ElementRef;
  mapSales: google.maps.Map;
  isLoading: boolean;

  constructor(private svc: SalesService) { }

  ngOnInit() {
    this.isLoading = true;
    const mapProp = {
      zoom: 15,
      maxZoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.svc.getAllSales().subscribe(data => {
      this.salesData = data;
      const boundsSrb = new google.maps.LatLngBounds();
      this.mapSales = new google.maps.Map(this.gmapSales.nativeElement, mapProp);
      const mapSales = this.mapSales;
      const markers: any = [];
      this.salesData.forEach(sales => {
        const latLng = { lat: parseFloat(sales.latitude), lng: parseFloat(sales.longitude) };
        const title = sales.title ? sales.title : '';
        const street = sales.street ? sales.street : '';
        const postal = sales.postal ? sales.postal : '';
        const city = sales.city ? sales.city : '';
        const country = sales.country ? sales.country : '';
        const phone = sales.phone ? sales.phone : '';
        const email = sales.email ? sales.email : '';
        const website = sales.website ? sales.website : '';
        const content = `<h3>${title}</h3>
      <p>${street} <br>
      ${postal} ${city} <br>
      ${country}</p>
      <p>${phone} <br>
      <a href="mailto:${email}">${email}</a> <br>
      <a href="${website}">${website}</a></p>`;
        const marker = new google.maps.Marker({
          position: latLng,
          map: mapSales
        });
        const infowindow = new google.maps.InfoWindow();
        boundsSrb.extend(latLng);
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', function () {
          infowindow.setContent(content);
          infowindow.open(mapSales, this);
        });
      });
      this.isLoading = false;
      if (markers.length) {
        this.mapSales.fitBounds(boundsSrb);
        this.mapSales.setCenter(boundsSrb.getCenter());
      } else {
        this.gmapSales.nativeElement.remove();
      }
    });
  }

}
