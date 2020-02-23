import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayGroundShellComponent } from './play-ground-shell.component';

describe('PlayGroundShellComponent', () => {
  let component: PlayGroundShellComponent;
  let fixture: ComponentFixture<PlayGroundShellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayGroundShellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGroundShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
