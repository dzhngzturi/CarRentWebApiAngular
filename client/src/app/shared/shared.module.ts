import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './components/pager/pager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './components/stepper/stepper.component'
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { PhotoWidgetComponent } from './components/photo-widget/photo-widget.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagerComponent,
    TextInputComponent,
    OrderTotalsComponent,
    StepperComponent,
    PhotoWidgetComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    CdkStepperModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    NgxDropzoneModule,
    ImageCropperModule
  ],
  exports: [
    PaginationModule, 
    PagingHeaderComponent,
    PagerComponent,
    CarouselModule,
    ReactiveFormsModule,
    FormsModule,
    BsDropdownModule,
    TextInputComponent,
    OrderTotalsComponent,
    CdkStepperModule,
    StepperComponent,
    NgxGalleryModule,
    TabsModule,
    NgxDropzoneModule,
    ImageCropperModule,
    PhotoWidgetComponent
  ]
})
export class SharedModule { }
