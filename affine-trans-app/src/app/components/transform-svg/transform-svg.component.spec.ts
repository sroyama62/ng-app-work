import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransformSvgComponent } from './transform-svg.component';

describe('TransformSvgComponent', () => {
  let component: TransformSvgComponent;
  let fixture: ComponentFixture<TransformSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransformSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransformSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
