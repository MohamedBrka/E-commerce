import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../shared/components/card/card.component';
import { Products } from '../../core/model/products.interface';
import { ProductsService } from '../../core/services/products.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from '../../shared/pipes/search-pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CardComponent, NgxPaginationModule,SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  pageSize!: number;
  p!: number;
  total!: number;
  text:string='';

  productList: Products[] = [];
  ngOnInit(): void {
    this.gitProductsData();
  }

  gitProductsData(pageNabmer: number = 1): void {
    this.productsService.gitProducts(pageNabmer).subscribe({
      next: (res) => {
        console.log(res.data);
        this.productList = res.data;

        console.log(res.metadata.limit);
        this.pageSize = res.metadata.limit;

        console.log(res.metadata.currentPage);
        this.p = res.metadata.currentPage;
        
        console.log(res.results);
        this.total = res.results;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
