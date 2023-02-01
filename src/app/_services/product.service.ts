import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }


  /**
   * 
   * @param product 
   */

  public addProduct(product:FormData){

    return this.httpClient.post<Product>("http://localhost:8080/addNewProduct",product);

  }


  public getAllProducts(){
    return this.httpClient.get<Product[]>("http://localhost:8080/getAllProducts");
  }


  public deleteProduct(productId:number){

   return this.httpClient.delete("http://localhost:8080/deleteProductDetails/"+productId);

  }

  public getProductDetailsById(productId){
    return this.httpClient.get<Product>("http://localhost:8080/getProductDetailsById/"+ productId);
  }

  public getProductDetails(isSingleProductCheckout,productId){
    return this.httpClient.get<Product[]>("http://localhost:8080/getProductDetails/"+ isSingleProductCheckout+"/"+productId); 
  }


  public placeOrder(orderDetail:OrderDetails){
    return this.httpClient.post("http://localhost:8080/placeOrder",orderDetail)
  }
}
