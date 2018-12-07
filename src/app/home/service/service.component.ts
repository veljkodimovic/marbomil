import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Service} from '@app/core/types/service';
import {Banner} from '@app/core/types/banner';
import { PersistenceService } from '@app/core/persistence.service';
import {ServiceService} from '@app/home/service/service.service';
import {BannerService} from '@app/admin/banner/banner.service';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-home-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  servicesAll: Service[] = [];
  serviceSerbia: Service[] = [];
  serviceCroatia: Service[] = [];
  serviceMacedonia: Service[] = [];
  serviceMontenegro: Service[] = [];
  serviceRSrpska: Service[] = [];
  banner: Banner;
  private apiUrl: string;
  @ViewChild('gmapSrb') gmapSrb: ElementRef;
  @ViewChild('gmapCro') gmapCro: ElementRef;
  @ViewChild('gmapMcd') gmapMcd: ElementRef;
  @ViewChild('gmapMne') gmapMne: ElementRef;
  @ViewChild('gmapBih') gmapBih: ElementRef;
  mapSrb: google.maps.Map;
  mapCro: google.maps.Map;
  mapMcd: google.maps.Map;
  mapMne: google.maps.Map;
  mapBih: google.maps.Map;

  constructor(private svc: ServiceService,
    private persistenceService: PersistenceService,
              private svcBanner: BannerService) {
                this.apiUrl = persistenceService.apiUrl;
              }

  ngOnInit() {
    const mapProp = {
      zoom: 15,
      maxZoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.svc.getAllServices().subscribe(data => {
      this.servicesAll = data;
      const that = this;
      this.servicesAll.forEach(function (service: Service) {
        if (service.country === 'Srbija') {
          that.serviceSerbia.push(service);
        } else if (service.country === 'Hrvatska') {
          that.serviceCroatia.push(service);
        } else if (service.country === 'Makedonija') {
          that.serviceMacedonia.push(service);
        } else if (service.country === 'Crna Gora') {
          that.serviceMontenegro.push(service);
        } else if (service.country === 'Republika Srpska') {
          that.serviceRSrpska.push(service);
        }
      });
      if (this.serviceSerbia.length) {
        const boundsSrb = new google.maps.LatLngBounds();
        this.mapSrb = new google.maps.Map(this.gmapSrb.nativeElement, mapProp);
        const mapSrb = this.mapSrb;
        const markers: any = [];
        this.serviceSerbia.forEach(function (service: Service) {
          if (parseFloat(service.latitude) > 0 && parseFloat(service.longitude) > 0) {
            const latLng = {lat: parseFloat(service.latitude), lng: parseFloat(service.longitude)};
            const marker = new google.maps.Marker({
              position: latLng,
              map: mapSrb
            });
            boundsSrb.extend(latLng);
            markers.push(marker);
          }
        });
        if (markers.length) {
          this.mapSrb.fitBounds(boundsSrb);
          this.mapSrb.setCenter(boundsSrb.getCenter());
        } else {
          this.gmapSrb.nativeElement.remove();
        }
      } else {
        this.gmapSrb.nativeElement.parentNode.parentNode.remove();
      }
      if (this.serviceCroatia.length) {
        const boundsCro = new google.maps.LatLngBounds();
        this.mapCro = new google.maps.Map(this.gmapCro.nativeElement, mapProp);
        const mapCro = this.mapCro;
        const markers: any = [];
        this.serviceMontenegro.forEach(function (service: Service) {
          if (parseFloat(service.latitude) > 0 && parseFloat(service.longitude) > 0) {
            const latLng = {lat: parseFloat(service.latitude), lng: parseFloat(service.longitude)};
            const marker = new google.maps.Marker({
              position: latLng,
              map: mapCro
            });
            boundsCro.extend(latLng);
            markers.push(marker);
          }
        });
        if (markers.length) {
          this.mapCro.fitBounds(boundsCro);
          this.mapCro.setCenter(boundsCro.getCenter());
        } else {
          this.gmapCro.nativeElement.remove();
        }
      } else {
        this.gmapCro.nativeElement.parentNode.parentNode.remove();
      }
      if (this.serviceMacedonia.length) {
        const boundsMcd = new google.maps.LatLngBounds();
        this.mapMcd = new google.maps.Map(this.gmapMcd.nativeElement, mapProp);
        const mapMcd = this.mapMcd;
        const markers: any = [];
        this.serviceMacedonia.forEach(function (service: Service) {
          if (parseFloat(service.latitude) > 0 && parseFloat(service.longitude) > 0) {
            const latLng = {lat: parseFloat(service.latitude), lng: parseFloat(service.longitude)};
            const marker = new google.maps.Marker({
              position: latLng,
              map: mapMcd
            });
            boundsMcd.extend(latLng);
            markers.push(marker);
          }
        });
        if (markers.length) {
          this.mapMcd.fitBounds(boundsMcd);
          this.mapMcd.setCenter(boundsMcd.getCenter());
        } else {
          this.gmapMcd.nativeElement.remove();
        }
      } else {
        this.gmapMcd.nativeElement.parentNode.parentNode.remove();
      }
      if (this.serviceMontenegro.length) {
        const boundsMne = new google.maps.LatLngBounds();
        this.mapMne = new google.maps.Map(this.gmapMne.nativeElement, mapProp);
        const mapMne = this.mapMne;
        const markers: any = [];
        this.serviceMontenegro.forEach(function (service: Service) {
          if (parseFloat(service.latitude) > 0 && parseFloat(service.longitude) > 0) {
            const latLng = {lat: parseFloat(service.latitude), lng: parseFloat(service.longitude)};
            const marker = new google.maps.Marker({
              position: latLng,
              map: mapMne
            });
            boundsMne.extend(latLng);
            markers.push(marker);
          }
        });
        if (markers.length) {
          this.mapMne.fitBounds(boundsMne);
          this.mapMne.setCenter(boundsMne.getCenter());
        } else {
          this.gmapMne.nativeElement.remove();
        }
      } else {
        this.gmapMne.nativeElement.parentNode.parentNode.remove();
      }
      if (this.serviceRSrpska.length) {
        const boundsBih = new google.maps.LatLngBounds();
        this.mapBih = new google.maps.Map(this.gmapBih.nativeElement, mapProp);
        const mapBih = this.mapBih;
        const markers: any = [];
        this.serviceRSrpska.forEach(function (service: Service) {
          if (parseFloat(service.latitude) > 0 && parseFloat(service.longitude) > 0) {
            const latLng = {lat: parseFloat(service.latitude), lng: parseFloat(service.longitude)};
            const marker = new google.maps.Marker({
              position: latLng,
              map: mapBih
            });
            boundsBih.extend(latLng);
            markers.push(marker);
          }
        });
        if (markers.length) {
          this.mapBih.fitBounds(boundsBih);
          this.mapBih.setCenter(boundsBih.getCenter());
        } else {
          this.gmapBih.nativeElement.remove();
        }
      } else {
        this.gmapBih.nativeElement.parentNode.parentNode.remove();
      }
      this.svcBanner.getBannerById(2).subscribe(data => {
        this.banner = data;
      });
    });

  }

}
