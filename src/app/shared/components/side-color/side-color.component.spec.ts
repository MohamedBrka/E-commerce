import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideColorComponent } from './side-color.component';

describe('SideColorComponent', () => {
  let component: SideColorComponent;
  let fixture: ComponentFixture<SideColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
