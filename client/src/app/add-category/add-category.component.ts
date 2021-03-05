import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ApiService } from './.././shared/api.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetCategoryForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryForm: FormGroup;
  
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private categoryApi: ApiService
  ) { }

 
  submitBookForm() {
    this.categoryForm = this.fb.group({
      category_id: ['', [Validators.required]],
      category_name: ['', [Validators.required]],
     
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.categoryForm.controls[controlName].hasError(errorName);
  }  
  
  submitCategoryForm() {
    if (this.categoryForm.valid) {
      this.categoryApi.AddCategory(this.categoryForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/categorys-list'))
      });
    }
  }

}