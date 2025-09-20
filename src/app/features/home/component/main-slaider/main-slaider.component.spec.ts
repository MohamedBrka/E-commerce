import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSlaiderComponent } from './main-slaider.component';

describe('MainSlaiderComponent', () => {
  let component: MainSlaiderComponent;
  let fixture: ComponentFixture<MainSlaiderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSlaiderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSlaiderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
