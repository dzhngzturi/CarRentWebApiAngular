import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryImageSize, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { map, Observable, of, Subject, switchMap } from 'rxjs';
import { CheckoutService } from 'src/app/checkout/checkout.service';
import { IBasketTotals } from 'src/app/shared/models/basket';
import { ICar } from 'src/app/shared/models/cars';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  car: ICar;
  quantity = 1;
  carRentForm: FormGroup;
  minDate?: string = '';
  maxDate?: string = '';
  rentMessage: string = '';


  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  id: any;
  availableMessage: string = '';
  buttonDisabled: boolean;

  constructor(
    private shopService: ShopService, 
    private activateRoute: ActivatedRoute,
    private bcService: BreadcrumbService,
    private checkoutService: CheckoutService,
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private http: HttpClient
    ) {
      this.bcService.set('@carDetails', ' ');
   
     }

  ngOnInit(): void {
    this.loadCar();
    
    this.checkCarReturned().subscribe(data => {
      if(data === true){
        this.availableMessage = '';
      }
      else{
        this.availableMessage = 'This car is not available now !';
        this.buttonDisabled = true;
      }
    });

  }


  initializeGallery() {
    this.galleryOptions = [
      {
        width: '500px',
        height: '600px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Fade,
        imageSize: NgxGalleryImageSize.Contain,
        thumbnailSize: NgxGalleryImageSize.Contain,
        preview: false
      }
    ];
    this.galleryImages = this.getImages();
  }

  getImages() {
    const imageUrls = [];
    for (const photo of this.car.photos) {
      imageUrls.push({
        small: photo.pictureUrl,
        medium: photo.pictureUrl,
        big: photo.pictureUrl,
      });
    }
    return imageUrls;
  }

  loadCar(){
    this.shopService.getCar(+this.activateRoute.snapshot.paramMap.get('id')).subscribe(car => {
      this.car = car;
      this.bcService.set('@carDetails', car.name);

      this.createCarRentForm();
      this.initializeGallery();
    }, error => {
      console.log(error);
    });
  }

  createCarRentForm(){
    this.carRentForm = this.formBuilder.group({
      rentDate: [
        this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
        Validators.required,
      ],
      returnDate: ['', Validators.required],
    });
  }

  minDateChange(date: any) {
    this.minDate = date.target.value;
    this.maxDate = this.datePipe.transform(
      new Date(
        new Date(this.minDate).setFullYear(new Date().getFullYear() + 1)
      ),
      'yyyy-MM-dd'
    );
  }

  maxDateChange(d : IBasketTotals) {
    let differance =
      new Date(this.carRentForm.value.returnDate).getTime() -
      new Date(this.carRentForm.value.rentDate).getTime();
     d.days = new Date(differance).getDate() - 1;
    this.rentMessage = `For ${d.days} days`;
    this.checkoutService.setday(d);
  }

  addItemToBasket(){
    this.checkoutService.addItemToBasket(
      this.car, this.quantity,
      this.carRentForm.value.rentDate,
      this.carRentForm.value.returnDate)
  }
    

  checkCarReturned(): Observable<boolean>{
    this.activateRoute.paramMap.subscribe((queryParams) => {
      this.id = queryParams.get('id');
    });
    return this.checkoutService.checkCarReturn(this.id).pipe(switchMap((response) => {
      if(response){
        return of(true)
      }
      else{
        this.availableMessage = 'This car is not available now !'
        return of(false)
      }
    }));
  }

  



}
