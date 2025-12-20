import { Component, OnInit, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-full',
  standalone: false,
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.css']
})
export class FullComponent implements OnInit, OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  isUserMenuOpen = false; 

  constructor(private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    console.log("FullComponent Loaded ✅");
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  // 👇 Toggle user dropdown menu
  toggleUserMenu() {
    this.isUserMenuOpen = !this.isUserMenuOpen;
  }

  // 👇 Optional: close the menu when clicked outside
  closeUserMenu() {
    this.isUserMenuOpen = false;
  } 
}


