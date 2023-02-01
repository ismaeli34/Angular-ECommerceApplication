import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ArgumentOutOfRangeError } from "rxjs";
import { OrderDetails } from "../_model/order-details.model";
import { Product } from "../_model/Product.model";
import { ProductService } from "../_services/product.service";

@Component({
  selector: "app-buy-product",
  templateUrl: "./buy-product.component.html",
  styleUrls: ["./buy-product.component.css"],
})
export class BuyProductComponent implements OnInit {


  productDetails:Product[] = [];

  orderDetail: OrderDetails = {
    fullName: "",
    fullAddress: "",
    contactNumber: "",
    alternateContactNumber: "",
    orderProductQuantityList: [],
  };

  constructor(private activatedRoute:ActivatedRoute,
    private router:Router,
    private productService:ProductService) {}

  ngOnInit(): void {

 this.productDetails= this.activatedRoute.snapshot.data['productDetails']

 this.productDetails.forEach(
  x =>this.orderDetail.orderProductQuantityList.push(
    {productId:x.productId,quantity:1}
  )
 );
 console.log(this.productDetails);

 console.log(this.orderDetail);
 
  }

  placeOrder(orderForm: NgForm) {

    this.productService.placeOrder(this.orderDetail).subscribe(
      (response)=>{
        console.log(response);
        orderForm.reset();
        this.router.navigate(['/order-confirmation'])
      },
      (error)=>{
        console.log(error);
        
      }
    )
  }

  getQuantityForProduct(productId:any){
  const filteredProduct=  this.orderDetail.orderProductQuantityList.filter(
      (productQuantity)=>productQuantity.productId===productId
    );

   return filteredProduct[0].quantity;
  }

  getCalcultatedTotal(productId,productDiscountedPrice){
  const filteredProduct=  this.orderDetail.orderProductQuantityList.filter((productQuantity)=>productQuantity.productId===productId);
    return filteredProduct[0].quantity* productDiscountedPrice;

  }

  onQuantityChanged(q,productId){
    this.orderDetail.orderProductQuantityList.filter((orderProduct)=>orderProduct.productId===productId)[0].quantity = q

  }

  getCalcultatedGrandTotal(){
    let grandTotal = 0;

    this.orderDetail.orderProductQuantityList.forEach(
      (productQuantity)=>{
    const price=  this.productDetails.filter(product=>product.productId === productQuantity.productId)[0].productDiscountedPrice;
    grandTotal= grandTotal+price * productQuantity.quantity
      }
    );
    return grandTotal;
  }
}
