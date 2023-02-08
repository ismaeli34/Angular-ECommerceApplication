import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ShowProductImagesDialogComponent } from '../show-product-images-dialog/show-product-images-dialog.component';
import { Product } from '../_model/Product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';






@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  pageNumber:number=0;
  showTable:boolean = false;
  showLoadMoreButton:boolean=false;
  productDetails:Product[]=[];
  displayedColumns: string[] = ['Id', 'Name', 'Description', 'Discounted Price','Product Actual Price','Actions'];



  constructor(private productService:ProductService,
    private imageProcessingService:ImageProcessingService,
    public imagesDialog: MatDialog,
    public router:Router) { }

  ngOnInit(): void {

    this.getAllProducts();
  }


  searchByKeyword(searchKeyword){
    console.log(searchKeyword); 
    this.pageNumber = 0;
    this.productDetails = [];
    this.getAllProducts(searchKeyword);

  }

  public getAllProducts(searchKeyword:string=""){
    this.showTable=false;
    this.productService.getAllProducts(this.pageNumber,searchKeyword)
    .pipe(
      map((x:Product[], i)=> x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe((response:Product[])=>{
      // console.log(response);
      if(response.length===5){
        this.showLoadMoreButton = true;
      }
      else{
        this.showLoadMoreButton=false;
      }
      response.forEach(p=>this.productDetails.push(p))      
      this.showTable=true;  

      // this.productDetails= response;
      
    },
    (error:HttpErrorResponse)=>{
      console.log(error);
      
    }
    
    )
 

  }

  showImages(product:Product){
    console.log(product);
    this.imagesDialog.open(ShowProductImagesDialogComponent,{
      data:{
        images: product.productImages
      },
      height:'500px',
      width:'800px'
     
    })

  }

  deleteProduct(productId){
    this.productService.deleteProduct(productId).subscribe((response)=>{
      console.log(response);
      this.getAllProducts();

    },
    (error:HttpErrorResponse)=>{
      console.log(error);
      
    }
    )

  }

  editProductElements(productId){
    this.router.navigate(['/addNewProduct',{productId:productId}]);
    console.log(productId);
    

  }

  loadMoreProducts(){
    this.pageNumber = this.pageNumber+1;
    this.getAllProducts();

  }

}
