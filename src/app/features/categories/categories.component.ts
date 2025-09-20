import { Component, inject, OnInit } from '@angular/core';
import { PopularCategoriesComponent } from "../home/component/popular-categories/popular-categories.component";
import { CategoriesService } from '../../core/services/categories.service';
import { Category } from '../../core/model/category.interface';

@Component({
  selector: 'app-categories',
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
private readonly categoriesService = inject(CategoriesService)
categoriesList:Category[]=[];

ngOnInit(): void {
  this.getAllCategoriesData()
}
getAllCategoriesData():void{
  this.categoriesService.getAllCategories().subscribe({
    next:(res)=>{
      console.log(res);
      this.categoriesList=res.data
      
    }
  })
}
}
