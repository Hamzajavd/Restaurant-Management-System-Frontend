import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwBillProdictsComponent } from './veiw-bill-prodicts.component';

describe('VeiwBillProdictsComponent', () => {
  let component: VeiwBillProdictsComponent;
  let fixture: ComponentFixture<VeiwBillProdictsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiwBillProdictsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwBillProdictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
