import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { AdminComponent } from "./admin/admin.component";
import { BuyProductResolverService } from "./buy-product-resolver.service";
import { BuyProductComponent } from "./buy-product/buy-product.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { ProductResolveService } from "./product-resolve.service";
import { ProductViewDetailsComponent } from "./product-view-details/product-view-details.component";
import { ShowProductsComponent } from "./show-products/show-products.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./_auth/auth.guard";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
  },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent },
  {
    path: "addNewProduct",
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: "show-product",
    component: ShowProductsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "product-view-details",
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolveService },
  },
  {
    path: "buyProduct",
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
    resolve: { productDetails: BuyProductResolverService }
  },
  {
    path:"order-confirmation",
    component:OrderConfirmationComponent,
    canActivate:[AuthGuard],
    data:{roles:["User"]}
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
