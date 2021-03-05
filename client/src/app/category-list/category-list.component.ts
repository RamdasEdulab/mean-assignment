import { Category } from '../../app/category';
import { ApiService } from './../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  CategoryData: any = [];
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  displayedColumns: string[] = ['category_id', 'category_name','action'];

  constructor(private categoryApi: ApiService) {
    this.categoryApi.GetCategorys().subscribe(data => {
      this.CategoryData = data;
      this.dataSource = new MatTableDataSource<Category>(this.CategoryData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    })    
  }

  ngOnInit() { }

  deleteCategory(index: number, e){
    if(window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.categoryApi.DeleteCategory(e._id).subscribe()
    }
  }

}