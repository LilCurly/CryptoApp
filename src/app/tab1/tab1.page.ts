import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { AnimationController, NavController } from '@ionic/angular';
import { CoinsService } from '../api/coins.service';
import { Swiper } from 'swiper';
import { Store } from '@ngrx/store';
import {
  selectSelectedTab,
  selectSortedCoins,
} from '../state/coins/coins.reducer';
import {
  CoinsApiActions,
  CoinsPageActions,
} from '../state/coins/coins.actions';
import { CoinResult } from '../models/CoinsResult';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit, AfterViewInit {
  sortedCoins$ = this.store.select(selectSortedCoins);
  selectedTab$ = this.store.select(selectSelectedTab);

  @ViewChildren('coinsList', { read: ElementRef })
  coinsListRef: QueryList<ElementRef> | null = null;
  shouldAnimateList = true;

  @ViewChild(CdkVirtualScrollViewport) vsv!: CdkVirtualScrollViewport;

  titleSize: string = '24px';
  titleBoxShadow: string = '0px 2px 9px 10px rgba(215,216,218,0)';
  slidesPerView: number = 3.5;

  titleOpts = {
    titleInitialSize: 24,
    maxOffest: 140,
    maxSizeMinimizer: 8,
    minBoxShadowOpacity: 0,
    maxBoxShadowOpacity: 1,
    initialSlidesPerView: 3.5,
    maxSlidesGrow: 0.5,
  };

  constructor(
    private coinsService: CoinsService,
    private animationCntrl: AnimationController,
    private store: Store,
    private navCtrl: NavController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadCoins();

    this.sortedCoins$.subscribe((_val) => {
      this.shouldAnimateList = true;
    });
  }

  ngAfterViewInit(): void {
    this.coinsListRef?.changes.subscribe((_) => {
      if (this.shouldAnimateList) {
        this.initListAnimation();
      }
      this.initHeaderAnimation();
    });
  }

  loadCoins() {
    this.coinsService.getCoins().subscribe((result) => {
      this.store.dispatch(
        CoinsApiActions.retrievedCoinsListSuccess({ coins: result.coins })
      );
    });
  }

  initListAnimation() {
    const itemRefArray = this.coinsListRef?.toArray();

    itemRefArray?.forEach((el, i) => {
      const element = el.nativeElement;

      this.animationCntrl
        .create()
        .addElement(element)
        .duration(700)
        .delay(i * (250 / 3))
        .easing('cubic-bezier(0.4, 0.0, 0.2, 1.0)')
        .fromTo('transform', 'translateX(100px)', 'translateX(0px)')
        .fromTo('opacity', '0', '1')
        .play();
    });

    this.shouldAnimateList = false;
  }

  initHeaderAnimation() {
    const divider = this.titleOpts.maxOffest / this.titleOpts.maxSizeMinimizer;
    this.vsv.elementScrolled().subscribe((_) => {
      const offset = this.vsv.measureScrollOffset('top');
      const size =
        this.titleOpts.titleInitialSize -
        Math.min(offset / divider, this.titleOpts.maxSizeMinimizer);
      const boxShadowOpacity = Math.min(
        (this.titleOpts.maxBoxShadowOpacity / this.titleOpts.maxOffest) *
          offset,
        this.titleOpts.maxBoxShadowOpacity
      );
      const slidesPerView =
        this.titleOpts.initialSlidesPerView +
        Math.min(
          (this.titleOpts.maxSlidesGrow / this.titleOpts.maxOffest) * offset,
          this.titleOpts.maxSlidesGrow
        );

      this.titleSize = size.toString().concat('px');
      this.titleBoxShadow = `0px 1px 8px rgba(215,216,218,${boxShadowOpacity})`;
      this.slidesPerView = slidesPerView;

      this.changeDetectorRef.detectChanges();
    });
  }

  onSlideChange([swiper]: [Swiper]) {
    this.store.dispatch(
      CoinsPageActions.updateSelectedTab({ selectedTab: swiper.realIndex % 4 })
    );
  }

  coinsTrackBy(_index: number, coin: CoinResult) {
    return coin.id;
  }

  itemClicked(coin: CoinResult) {
    this.navCtrl.navigateForward('coin-detail', { state: { coin: coin } });
  }
}
