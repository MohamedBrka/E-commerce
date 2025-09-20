import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./shared/components/footer/footer.component";
import { NgxSpinnerComponent } from "ngx-spinner";
import { BackToTopComponent } from "./shared/components/back-to-top/back-to-top.component";
import { SideColorComponent } from "./shared/components/side-color/side-color.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FooterComponent, NgxSpinnerComponent, BackToTopComponent, SideColorComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'E-commerce';
}
