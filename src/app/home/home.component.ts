import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  pageNumber:number =0;

  showLoadButton = false;
  constructor(private productService:ProductService,
    private router:Router,
    private imageProcessingService:ImageProcessingService) { }

  ngOnInit(): void {

    this.getAllProducts();


  }

  public getAllProducts(searchKey:string=""){
    this.productService.getAllProducts(this.pageNumber,searchKey)
    .pipe(map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product))))
    .subscribe(
      (response:Product[])=>{
        console.log(response);
        if(response.length===5){
          this.showLoadButton = true;
        }else{
          this.showLoadButton =false;
        }
        response.forEach(p=>this.productDetails.push(p))        
      },(error:HttpErrorResponse)=>{
        console.log(error) ;
        
      }
    )
  }

  viewDetails(productId){
    this.router.navigate(['/product-view-details',{productId:productId}])
  }

  loadMoreProducts(){
    this.pageNumber = this.pageNumber +1 ;
    this.getAllProducts();
  }


  searchByKeyword(value:string){
  console.log(value);
  this.pageNumber =0;
  this.productDetails = [];
  this.getAllProducts(value);

  }

}
