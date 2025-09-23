import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common'; // 👈 أضف دي
import { ProductDetailsService } from './services/product-details.service';
import { Products } from '../../core/model/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishListService } from '../wish-list/services/wish-list.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgClass], // 👈 أضف دي
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productDetailsService = inject(ProductDetailsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  private readonly wishListService = inject(WishListService);

  id: string | null = null;
  // productDetails: Products = {} as Products;
  @Input({ required: true }) productDetails: Products = {} as Products;
  isLoaded = false; // flag لتشغيل الأنيميشن بعد تحميل الداتا
isBlack: boolean = false;
  ngOnInit(): void {
    this.gitProductId();
    this.gitProductDetailsData();
      this.isBlack = this.wishListService.isInWishList(this.productDetails._id);
    this.wishListService.wishList$.subscribe((ids) => {
      this.isBlack = ids.includes(this.productDetails._id);
    });
  }

  gitProductId(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (urlParam) => {
        this.id = urlParam.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

gitProductDetailsData(): void {
  if (!this.id) return;

  this.productDetailsService.gitProductDetails(this.id).subscribe({
    next: (res) => {
      this.productDetails = res.data;

      // نشغل الأنيميشن بعد وصول البيانات
      setTimeout(() => {
        this.isLoaded = true;
      }, 100);
    },
    error: (err) => {
      console.log(err);
    },
  });
}


  addProductItemToCart(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.cartService.countNumber.set(res.numOfCartItems);
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
        console.log(res);
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
