import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './../shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetCategoryForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryForm: FormGroup;
  

  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private categoryApi: ApiService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.categoryApi.GetCategory(id).subscribe(data => {
      console.log(data.subjects)
      
      this.categoryForm = this.fb.group({
        category_id: [data.category_id, [Validators.required]],
        category_name: [data.category_name, [Validators.required]],
       
      })      
    })    
  }

  
  updateBookForm() {
    this.categoryForm = this.fb.group({
      category_id: ['', [Validators.required]],
      category_name: ['', [Validators.required]],
      
    })
  }

  
  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateCategoryForm() {
    console.log(this.categoryForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.categoryApi.UpdateCategory(id, this.categoryForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/category-list'))
      });
    }
  }
  
}

