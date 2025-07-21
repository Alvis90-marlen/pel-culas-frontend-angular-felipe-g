import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasAdminComponent } from './peliculas-admin.component';

describe('PeliculasAdminComponent', () => {
  let component: PeliculasAdminComponent;
  let fixture: ComponentFixture<PeliculasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculasAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
