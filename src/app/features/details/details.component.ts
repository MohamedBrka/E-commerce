import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgClass } from '@angular/common'; // 👈 أضف دي
import { ProductDetailsService } from './services/product-details.service';
import { Products } from '../../core/model/products.interface';
import { CartService } from '../cart/services/cart.service';
import { ToastrService } from 'ngx-toastr';

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

  id: string | null = null;
  productDetails: Products = {} as Products;
  isLoaded = false; // flag لتشغيل الأنيميشن بعد تحميل الداتا

  ngOnInit(): void {
    this.gitProductId();
    this.gitProductDetailsData();
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
        if (res.status === 'success') {
          this.toastrService.success(res.message, 'Fresh Cart');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
