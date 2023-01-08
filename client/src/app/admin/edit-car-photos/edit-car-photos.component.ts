import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarFormValues, ICar } from 'src/app/shared/models/cars';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-car-photos',
  templateUrl: './edit-car-photos.component.html',
  styleUrls: ['./edit-car-photos.component.scss']
})
export class EditCarPhotosComponent implements OnInit {
  @Input() car: ICar;
  progress = 0;
  addPhotoMode = false;
  
  constructor(
    private router: Router,
    private adminService: AdminService,
    private toast: ToastrService)
  {
  }

  ngOnInit(): void {
  }

  addPhotoModeToggle(){
    this.addPhotoMode = !this.addPhotoMode;
  }

  uploadFile(file: File) {
    this.adminService.uploadImage(file, this.car.id).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.car = event.body;
          setTimeout(() => {
            this.progress = 0;
            this.addPhotoMode = false;
          }, 1500);
      }
    }, error => {
      if (error.errors) {
        this.toast.error(error.errors[0]);
      } else {
        this.toast.error('Problem uploading image');
      }
      this.progress = 0;
    });
  }

  deletePhoto(photoId: number) {
    this.adminService.deleteCarPhoto(photoId, this.car.id).subscribe(() => {
      const photoIndex = this.car.photos.findIndex(x => x.id === photoId);
      this.car.photos.splice(photoIndex, 1);
    }, error => {
      this.toast.error('Problem deleting photo');
      console.log(error);
    });
  }

  setMain(photoId: number){
    this.adminService.setMainPhoto(photoId, this.car.id).subscribe(() => {
      const photoIndex = this.car.photos.findIndex(x => x.id == photoId); 
      this.car.photos.splice(photoIndex, 1);
      this.router.navigate(['/admin']);
    }, error => {
      this.toast.error('Problem setting main photo');
      console.log(error);
    });
  }


}
