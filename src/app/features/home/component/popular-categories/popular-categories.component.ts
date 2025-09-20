import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/model/category.interface';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-popular-categories',
  imports: [CarouselModule],
  templateUrl: './popular-categories.component.html',
  styleUrl: './popular-categories.component.css',
})
export class PopularCategoriesComponent implements OnInit {
  private readonly categoriesService = inject(CategoriesService);
categoryList:Category[]=[];

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay:true,
    autoplayTimeout:3000,
    margin:10,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      },
      1100:{
        items:6
      }
    },
    nav: false
  }

   ngOnInit(): void {
      this.getAllCategoriesData()
    }
  getAllCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoryList=res.data
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }
}
