import { MailModule } from './mail.module';
import { MailAppCmp } from './mail';
import { inject, getTestBed, TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { Router, provideRoutes } from '@angular/router';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {addMatchers, advance} from './spec_utils';

describe('integration specs', () => {
  let router: Router;
  let location: SpyLocation;
  let f: ComponentFixture<MailAppCmp>;

  beforeEach(async(() => {
    addMatchers();
    TestBed.configureTestingModule({
      imports: [MailModule, RouterTestingModule],
      providers: [provideRoutes([])]
    });
    TestBed.compileComponents();
  }));

  beforeEach(() => {
    router = getTestBed().get(Router);
    location = getTestBed().get(Location);
    f = TestBed.createComponent(MailAppCmp);
  });

  it('should render a list of conversations', fakeAsync(() => {
    router.navigateByUrl("/inbox");

    advance(f);

    expect(f.debugElement.nativeElement).toHaveText('The Myth of Sisyphus');
    expect(f.debugElement.nativeElement).toHaveText('The Nicomachean Ethics');
  }));

  it('should navigate to a conversation', fakeAsync(() => {
    router.navigateByUrl("/inbox");

    advance(f);

    const c = f.debugElement.query(e => e.nativeElement.textContent === "The Myth of Sisyphus");
    c.nativeElement.click();

    advance(f);

    expect(location.path()).toEqual("/inbox/0");
    expect(f.nativeElement).toHaveText("The Path of the Absurd Man");
  }));
});
