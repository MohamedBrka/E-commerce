import { Component, inject, Input, OnInit } from '@angular/core';
import { Products } from '../../../core/model/products.interface';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../../../features/wish-list/services/wish-list.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent implements OnInit {
  @Input({ required: true }) product: Products = {} as Products;
  private readonly cartService = inject(CartService);
  private readonly wishListService = inject(WishListService);
  private readonly toastrService = inject(ToastrService);

  isBlack: boolean = false; // الافتراضي أسود

  ngOnInit(): void {
    // أول ما يركب الكارت، شوف هل المنتج ده في المفضلة
    this.isBlack = this.wishListService.isInWishList(this.product._id);
    this.wishListService.wishList$.subscribe((ids) => {
    this.isBlack = ids.includes(this.product._id);
  });

    // وكمان نسمع أي تحديث في المفضلة
    this.wishListService.wishList$.subscribe((ids) => {
      this.isBlack = ids.includes(this.product._id);
    });
  }

  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.countNumber.next(res.numOfCartItems);
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductItemToWishList(id: string, event: Event): void {
    event.stopPropagation();
    this.wishListService.addProductToWishList(id).subscribe({
      next: (res) => {
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Wish List');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItemWish(id: string, event: Event): void {
    event.stopPropagation();
    this.wishListService.removeItemWishList(id).subscribe({
      next: () => {
        this.toastrService.success('🗑️ Item removed successfully!', 'Remove Item');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
