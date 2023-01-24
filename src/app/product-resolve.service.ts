import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './_model/Product.model';
import { ImageProcessingService } from './_services/image-processing.service';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolveService implements Resolve<Product> {

  constructor(private productService:ProductService,
     private imageService:ImageProcessingService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<Product>  {

    const id =route.paramMap.get("productId");
    if(id){
      //then we have to fetch details from backend
     return this.productService.getProductDetailsById(id).pipe(map(p=> this.imageService.createImages(p)));
    }else{
      //return empty product observable
      return of(this.getProductDetails());

    }
  }


  getProductDetails(){
    return {
      productId:null,
      productName: "",
      productDescription: "",
      productDiscountedPrice: 0,
      productActualPrice: 0,
      productImages:[]
    }
  }
}
