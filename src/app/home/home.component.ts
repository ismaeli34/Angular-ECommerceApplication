import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from '../_model/Product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productDetails:Product[]=[];

  constructor(private productService:ProductService,
    private imageProcessingService:ImageProcessingService) { }

  ngOnInit(): void {

    this.getAllProducts();


  }

  public getAllProducts(){

    this.productService.getAllProducts()
    .pipe(map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product))))
    .subscribe(
      (response:Product[])=>{
        console.log(response);
        this.productDetails = response
        
      },(error:HttpErrorResponse)=>{
        console.log(error) ;
        
      }
    )
  }

}
