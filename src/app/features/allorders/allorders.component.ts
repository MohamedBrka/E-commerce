import { Component, inject, OnInit } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { AuthService } from '../../core/auth/services/auth.service';
import { CartService } from '../cart/services/cart.service';
import { Itemsorders } from './model/itemsorders.interface';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe, DatePipe],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  tokenId: string | undefined;
  cartItemData: Itemsorders[] = [];

  ngOnInit(): void {
    this.getIdToken();
    this.getUserOrderData();
  }

  getIdToken(): void {
    const decoded = this.authService.decodeToken();
    this.tokenId = decoded?.id;
  }

  getUserOrderData(): void {
    this.cartService.getUserOrder(this.tokenId).subscribe({
      next: (res) => {
        console.log(res);
        this.cartItemData = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  
}
