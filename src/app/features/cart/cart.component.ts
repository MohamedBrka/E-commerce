import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { CartService } from './services/cart.service';
import { Cart } from './model/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-cart',
  imports: [RouterLink,CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
private readonly cartService = inject(CartService)
private readonly toastrService = inject(ToastrService);

cartDetails:Cart={} as Cart;
ngOnInit(): void {
  this.getLoggedUserData();
}
getLoggedUserData():void{
  this.cartService.getLoggedUserCart().subscribe({
    next:(res)=>{
      console.log(res.data);
      this.cartDetails = res.data;
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
removeItemData(id:string):void{
  this.cartService.removeItemCart(id).subscribe({
    next:(res)=>{
      console.log(res);
      this.cartDetails = res.data;
      this.cartService.countNumber.set(res.numOfCartItems);
      this.toastrService.success(" 🗑️ Item removed successfully!" , `Remove Item`)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}

updateCountData(id:string , count:number):void{
  this.cartService.updateCountCart(id,count).subscribe({
     next:(res)=>{
      console.log(res);
      this.cartDetails = res.data;
      this.toastrService.success(" ✏️ Item updated successfully!", `"🔄 Changes saved."`)
    },
    error:(err)=>{
      console.log(err);
      
    }
  })
}
clearUserCart(): void {
  this.cartService.clearCart().subscribe({
    next: (res) => {
      console.log(res);
      this.getLoggedUserData(); // نفضي الداتا
      this.cartService.countNumber.set(0); // نرجّع العدد صفر في النافبار
      this.toastrService.success("🗑️ Cart cleared successfully!", "Clear Cart");
    },
    error: (err) => {
      console.log(err);
    }
  });
}

}
