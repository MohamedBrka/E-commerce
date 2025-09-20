import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Observable } from 'rxjs';
import { log } from 'console';
import { Products } from '../../core/model/products.interface';
import { CardComponent } from "../../shared/components/card/card.component";
import { MainSlaiderComponent } from "./component/main-slaider/main-slaider.component";
import { PopularCategoriesComponent } from "./component/popular-categories/popular-categories.component";
import { PopularProductsComponent } from "./component/popular-products/popular-products.component";
import { FooterComponent } from "../../shared/components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [CardComponent, MainSlaiderComponent, PopularCategoriesComponent, PopularProductsComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  {



}
