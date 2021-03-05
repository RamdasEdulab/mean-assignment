import { Product } from '../../app/product';
import { ProducService } from './../shared/produc.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  
  ProductData: any = [];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['product_id', 'product_name','category_id','category_name','action'];

  constructor(private productApi: ProducService) {
    this.productApi.GetProducts().subscribe(data => {
      this.ProductData = data;
      this.dataSource = new MatTableDataSource<Product>(this.ProductData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteProduct(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.productApi.DeleteProduct(e._id).subscribe()
    }
  }

}