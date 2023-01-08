import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-edit-order-details',
  templateUrl: './edit-order-details.component.html',
  styleUrls: ['./edit-order-details.component.scss']
})
export class EditOrderDetailsComponent implements OnInit {
  @Input() orders: IOrder;

  constructor(private route: ActivatedRoute, private breadcrumbService: BreadcrumbService,
    private adminService: AdminService) {
      this.breadcrumbService.set('@OrderDetailed', '');
     }
     
  ngOnInit(): void {
    this.adminService.getOrderDetailedForAdmin(+ this.route.snapshot.paramMap.get('id'))
    .subscribe((order: IOrder) => {
      this.orders = order;
      this.breadcrumbService.set('@OrderDetailed', `Order# ${order.id} - ${order.status}`);
    }, error => {
      console.log(error);
    }); 
  }

}
