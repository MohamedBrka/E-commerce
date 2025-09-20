import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-main-slaider',
  imports: [CarouselModule],
  templateUrl: './main-slaider.component.html',
  styleUrl: './main-slaider.component.css'
})
export class MainSlaiderComponent {
mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay:true,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    navSpeed: 1500,
    navText: ['<i class="fa-solid fa-angle-left"></i>', '<i class="fa-solid fa-angle-right"></i>'],
    items:1,
    nav: true
  }
}
