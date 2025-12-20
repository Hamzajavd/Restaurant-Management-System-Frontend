import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiwBillComponent } from './veiw-bill.component';

describe('VeiwBillComponent', () => {
  let component: VeiwBillComponent;
  let fixture: ComponentFixture<VeiwBillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VeiwBillComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiwBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
