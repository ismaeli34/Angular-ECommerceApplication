import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  displayedColumns: string[] = ['Name','Description','Price','Discounted Price'];

  cartDetails:any[] = [];

  dataSource = ELEMENT_DATA;

  constructor(private productService:ProductService, 
    private router:Router) { }

  ngOnInit(): void {

    this.getCartDetails();
  }

  checkout(){

    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout:false,
      id:0
    }]);
    // this.productService.getProductDetails(false,0).subscribe((response)=>{
    //   console.log(response);
      
    // },
    // (error)=>{
    //   console.log(error);
    // }
    // )
  }


  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response:any[])=>{
        console.log(response);
        this.cartDetails = response;
        
      },

      (error)=>{
        console.log(error);
        
      }
    );
  }

}
