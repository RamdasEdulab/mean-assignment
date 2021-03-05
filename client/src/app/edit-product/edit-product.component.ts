import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CatgeService } from './../shared/catge.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";



@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList', { static: true }) chipList;
  @ViewChild('resetCategoryForm', { static: true }) myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  productForm: FormGroup;
  
  ngOnInit() {
    this.updateBookForm();
  }

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private productApi: CatgeService
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.productApi.GetProduct(id).subscribe(data => {
      console.log(data.subjects)
      
      this.productForm = this.fb.group({
        product_id: [data.product_id, [Validators.required]],
        product_name: [data.product_name, [Validators.required]],
        
      })      
    })    
  }

  /* Reactive book form */
  updateBookForm() {
    this.productForm = this.fb.group({
      product_id: ['', [Validators.required]],
      product_name: ['', [Validators.required]],
      
    })
  }

  
  

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.productForm.controls[controlName].hasError(errorName);
  }

  /* Update book */
  updateProductForm() {
    console.log(this.productForm.value)
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are you sure you want to update?')) {
      this.productApi.UpdateProduct(id, this.productForm.value).subscribe( res => {
        this.ngZone.run(() => this.router.navigateByUrl('/product-list'))
      });
    }
  }
  
}

