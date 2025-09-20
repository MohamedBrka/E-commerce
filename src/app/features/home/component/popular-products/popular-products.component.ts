import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from "../../../../shared/components/card/card.component";
import { Products } from '../../../../core/model/products.interface';
import { ProductsService } from '../../../../core/services/products.service';

@Component({
  selector: 'app-popular-products',
  imports: [CardComponent],
  templateUrl: './popular-products.component.html',
  styleUrl: './popular-products.component.css'
})
export class PopularProductsComponent implements OnInit{
private readonly productsService = inject(ProductsService)

productList:Products[]=[];
  ngOnInit(): void {
    this.gitProductsData()
  
  }  

  gitProductsData():void{
     this.productsService.gitProducts().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.productList=res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
