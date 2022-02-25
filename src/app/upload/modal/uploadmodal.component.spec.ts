import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadeModalCompoment } from './uploadmodal.component';

describe('UploadeModalCompoment', () => {
  let component: UploadeModalCompoment;
  let fixture: ComponentFixture<UploadeModalCompoment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadeModalCompoment ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadeModalCompoment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
