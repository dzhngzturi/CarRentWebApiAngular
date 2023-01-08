import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CarBrandFormValues } from '../shared/models/brands';
import { CarFormValues } from '../shared/models/cars';
import { CarTypeFormValues } from '../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  createCar(car: CarFormValues){
   return this.http.post(this.baseUrl + 'Cars' , car);
  }

  updateCar(car: CarFormValues, id: number){
    return this.http.put(this.baseUrl + 'Cars/' + id, car);
  }

  deleteCar(id: number){
    return this.http.delete(this.baseUrl + 'Cars/' + id);
  }

  createType(type: CarTypeFormValues){
    return this.http.post(this.baseUrl + 'Cars/types', type);
  }

  updateType(type: CarTypeFormValues, id: number){
    return this.http.put(this.baseUrl + 'Cars/' + id + '/types', type)
  }

  deleteType(id: number){
    return this.http.delete(this.baseUrl + 'Cars/' + id + '/types');
  }

  createBrand(brand: CarBrandFormValues){
    return this.http.post(this.baseUrl + 'Cars/brands', brand);
  }

  updateBrand(brand: CarBrandFormValues, id: number){
    return this.http.put(this.baseUrl +  'Cars/' + id + '/brands', brand);
  }

  deleteBrand(id: number){
    return this.http.delete(this.baseUrl + 'Cars/' + id + '/brands');
  }

  uploadImage(file: File, id: number) {
    const formData = new FormData();
    formData.append('photo', file, 'image.png');
    return this.http.put(this.baseUrl + 'Cars/' + id + '/photo', formData, {
      reportProgress: true,
      observe: 'events'
    });
  }

  deleteCarPhoto(photoId: number, carId: number) {
    return this.http.delete(this.baseUrl + 'Cars/' + carId + '/photo/' + photoId);
  }

  setMainPhoto(photoId: number, carId: number) {
    return this.http.post(this.baseUrl + 'Cars/' + carId + '/photo/' + photoId, {});
  }
  
  getOrdersForAdmin(){
    return this.http.get(this.baseUrl + 'orders/getOrdersForAdmin');
  }

  getOrderDetailedForAdmin(id: number){
    return this.http.get(this.baseUrl + 'orders/getOrderForAdmin/' + id);
  }
}
