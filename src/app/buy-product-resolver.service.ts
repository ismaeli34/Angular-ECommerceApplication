import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './_model/Product.model';
import { ImageProcessingService } from './_services/image-processing.service';
import { ProductService } from './_services/product.service';

@Injectable({
  providedIn: 'root'
})
export class BuyProductResolverService implements Resolve<Product[]>{

  constructor(private productService:ProductService,
     private imageProcessingService:ImageProcessingService) { }



  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product[] | Observable<Product[]> | Promise<Product[]> {

  const id=  route.paramMap.get("id");
  const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
  return this.productService.getProductDetails(isSingleProductCheckout,id).pipe(
    map((x:Product[],i)=>x.map((product:Product) => this.imageProcessingService.createImages(product))
      
  )); 
    
    
  }
  


}
