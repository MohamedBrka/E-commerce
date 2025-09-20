import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from './services/brands.service';
import { Brands } from './model/brands.interface';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-brands',
  imports: [NgxPaginationModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent implements OnInit {
  private readonly brandsService = inject(BrandsService);

  brandsItems: Brands[] = [];

  pageSize!: number;
  p!: number;
  total!: number;

  selectedBrand: Brands | null = null; // ✅ للـ Modal

  ngOnInit(): void {
    this.getAllBrandsData();
  }

  getAllBrandsData(pageNumber: number = 1): void {
    this.brandsService.getAllBrands(pageNumber).subscribe({
      next: (res) => {
        this.brandsItems = res.data;
        this.pageSize = res.metadata.limit;
        this.p = res.metadata.currentPage;
        this.total = res.results;
      },
      error: (err) => console.error(err),
    });
  }

  /** فتح المودال */
  openModal(brand: Brands): void {
    this.selectedBrand = brand;
  }

  /** قفل المودال */
  closeModal(): void {
    this.selectedBrand = null;
  }
}
