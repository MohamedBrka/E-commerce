import { Component, computed, inject, Input, input, PLATFORM_ID, Signal, signal } from '@angular/core';
import { FlowbiteService } from '../../../core/services/flowbite.service';
import { initFlowbite } from 'flowbite';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/auth/services/auth.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { WishListService } from '../../../features/wish-list/services/wish-list.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  constructor(private flowbiteService: FlowbiteService, private wishListService: WishListService) {}
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly id = inject(PLATFORM_ID);
  count:Signal<number>= computed(()=>this.cartService.countNumber());
  heart:Signal<number>= computed(()=>this.wishListService.countHeart());
  @Input({ required: true }) islogin!: boolean;

  ngOnInit(): void {
    this.wishListService.loadUserWishList();
    
    if(isPlatformBrowser(this.id)){
      this. getAllDataCart();
    }
    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }

  getAllDataCart(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.countNumber.set(res.numOfCartItems);
      },
    });
  }

  signout(): void {
    this.authService.logoutForm();
  }
}
