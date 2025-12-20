import { Component } from '@angular/core';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';
import { MenuItems } from '../../../shared/menu-items';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  token:any = localStorage.getItem('token');
  tokenPayload:any
  

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems:MenuItems
  ) {
    this.tokenPayload = jwtDecode(this.token);
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}

