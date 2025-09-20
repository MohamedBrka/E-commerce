import { NgFor } from '@angular/common';
import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-side-color',
  standalone: true,
  imports: [NgFor],
  templateUrl: './side-color.component.html',
  styleUrl: './side-color.component.css',
})
export class SideColorComponent implements OnInit {
  isOpen = false;
  isBrowser: boolean;

  // مجموعة الألوان المتاحة (أول لون هو الافتراضي)
  colors: string[] = [
  // الأساسي
  '#8B5E35',

  // ألوان دافئة
  '#FF5733', '#E74C3C', '#C0392B', '#FF6F61',

  // ألوان باردة
  '#1E90FF', '#2980B9', '#3498DB', '#00BFFF', '#5DADE2',

  // أخضر
  '#2ECC71', '#27AE60', '#16A085', '#1ABC9C', '#2ED573',

  // أصفر / برتقالي
  '#F1C40F', '#F39C12', '#FFC312', '#FFD700', '#FFA502',

  // بنفسجي / وردي
  '#9B59B6', '#8E44AD', '#E84393', '#FD79A8', '#FF69B4',

  // بني / ترابي
  '#A0522D', '#D2B48C', '#CD853F', '#8B4513',

  // رمادي / أسود
  '#95A5A6', '#7F8C8D', '#34495E', '#2C3E50', '#000000', 
];


  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      const savedColor = localStorage.getItem('themeColor');
      const initialColor = savedColor || this.colors[0]; // اللون الافتراضي

      // نضبط المتغيرات في الـ CSS
      document.documentElement.style.setProperty('--main-color', initialColor);
      document.documentElement.style.setProperty('--mainColor', initialColor);
      document.documentElement.style.setProperty('--main-shadow', `${initialColor}80`);

      // نخزن اللون لو مفيش حاجة متخزنة
      if (!savedColor) {
        localStorage.setItem('themeColor', initialColor);
      }
    }
  }

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }

  setThemeColor(color: string) {
    if (this.isBrowser) {
      // نحدث المتغيرات
      document.documentElement.style.setProperty('--main-color', color);
      document.documentElement.style.setProperty('--mainColor', color);
      document.documentElement.style.setProperty('--main-shadow', `${color}80`);

      // نخزن اللون
      localStorage.setItem('themeColor', color);
    }
  }
}
