import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarBrandFormValues, IBrand } from 'src/app/shared/models/brands';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {
  brand: CarBrandFormValues;
  brands: IBrand[];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService) 
  { 
    this.brand = new CarBrandFormValues();
  }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'brand' && this.route.snapshot.url[1].path === 'create'){
      this.loadBrand();
    }
  }

  loadBrand(){
   if(!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') == 'true'){
    localStorage.setItem('firstReload', 'false');
    window.location.reload();
   }
   else{
    localStorage.setItem('firstReload', 'true');
    this.shopService.getBrand(+ this.route.snapshot.paramMap.get('id'))
    .subscribe((response => {
      this.brand = {... response};
    }));
   }
  }

  onSubmit(brand: CarBrandFormValues) {
    if (this.route.snapshot.url[0].path === 'brand'  ) {
      console.log(this.route.snapshot.url[0]);
      const updatedbrand = {...brand,};
      this.adminService.updateBrand(updatedbrand, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.router.navigate(['/admin/brand']);
      });
    } else {
      const newbrand = {...brand};
      this.adminService.createBrand(newbrand).subscribe((response: any) => {
        window.location.href = "/admin/brand";
      });
    }
  }

}
