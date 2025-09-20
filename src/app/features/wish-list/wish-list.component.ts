import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../cart/model/cart.interface';
import { CartService } from '../cart/services/cart.service';
import { WishListService } from './services/wish-list.service';
import { WishList } from './model/wish-list.interface';

@Component({
  selector: 'app-wish-list',
  imports: [],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent implements OnInit {
private readonly cartService = inject(CartService)
private readonly toastrService = inject(ToastrService);
private readonly wishListService = inject(WishListService);

wishListDetails:WishList ={} as WishList ;
ngOnInit(): void {
  this.getLoggedUserData();
}
getLoggedUserData():void{
  this.wishListService.getLoggedUserWishList().subscribe({
    next:(res)=>{
      console.log(res);
      this.wishListDetails = res;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
removeItemWish(id:string):void{
  this.wishListService.removeItemWishList(id).subscribe({
    next:(res)=>{
      console.log(res);
     this.getLoggedUserData();
      this.toastrService.success(" 🗑️ Item removed successfully!" , `Remove Item`)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

 addProductItemToCart(id:string):void{
  this.cartService.addProductToCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      if(res.status==='success'){
        this.toastrService.success(res.message , "Fresh Cart")
      }
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
 }



}
