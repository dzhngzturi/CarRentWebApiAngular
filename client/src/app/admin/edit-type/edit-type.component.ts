import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarTypeFormValues, IType } from 'src/app/shared/models/types';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {
  type: CarTypeFormValues;
  types: IType[];

  constructor(   
    private adminService: AdminService,
    private route: ActivatedRoute,
    private router: Router,
    private shopService: ShopService) 
    {
     this.type = new CarTypeFormValues();

    }

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path === 'type' ) {
        this.loadType();
    }
  }

  loadType(){
    if(!localStorage.getItem('firstReload') || localStorage.getItem('firstReload') == 'true'){
      localStorage.setItem('firstReload', 'false');
      window.location.reload();
     }
     else{
      localStorage.setItem('firstReload', 'true');
      this.shopService.getType(+ this.route.snapshot.paramMap.get('id'))
      .subscribe((response => {
      this.type = {...response};
      }));
    }
  }

  onSubmit(type: CarTypeFormValues) {
    if (this.route.snapshot.url[0].path === 'type'  ) {
      console.log(this.route.snapshot.url[0]);
      const updatedtype = {...type,};
      this.adminService.updateType(updatedtype, +this.route.snapshot.paramMap.get('id')).subscribe((response: any) => {
        this.router.navigate(['/admin/type']);
      });
    } else {
      const newtype = {...type};
      this.adminService.createType(newtype).subscribe((response: any) => {
        window.location.href = "/admin/type";
      });
    }
  }

}
