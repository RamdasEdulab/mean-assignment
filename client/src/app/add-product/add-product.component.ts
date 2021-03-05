import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CatgeService } from './.././shared/catge.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetProductForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  productForm: FormGroup;
  
  ngOnInit() {
    this.submitBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private productApi: CatgeService
  ) { }

 
  submitBookForm() {
    this.productForm = this.fb.group({
      product_id: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
     
    })
  }
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }  
  
  submitProductForm() {
    if (this.productForm.valid) {
      this.productApi.AddProduct(this.productForm.value).subscribe(res => {
        this.ngZone.run(() => this.router.navigateByUrl('/products-list'))
      });
    }
  }

}