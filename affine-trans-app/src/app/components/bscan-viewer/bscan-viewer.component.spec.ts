import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BscanViewerComponent } from './bscan-viewer.component';

describe('BscanViewerComponent', () => {
  let component: BscanViewerComponent;
  let fixture: ComponentFixture<BscanViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BscanViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BscanViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
