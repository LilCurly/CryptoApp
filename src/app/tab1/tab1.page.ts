import {
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { CoinsService } from '../api/coins.service';
import { CoinResult, CoinsResult } from '../models/CoinsResult';
import { Swiper } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1Page implements OnInit, AfterViewInit {
  @Input('coins') coins: CoinsResult | null = null;
  @Input() sortedCoins: CoinResult[] | null = null;

  @ViewChildren('coinsList', { read: ElementRef })
  coinsListRef: QueryList<ElementRef> | null = null;
  shouldAnimateList = true;

  @ViewChild(CdkVirtualForOf) vrList!: CdkVirtualForOf<any>;
  @ViewChild(CdkVirtualScrollViewport) vsv!: CdkVirtualScrollViewport;
  @ViewChild('swiper') mSwiper!: SwiperComponent;

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

  selectedTab = 0;

  constructor(
    private coinsService: CoinsService,
    private animationCntrl: AnimationController,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.coinsListRef?.changes.subscribe((_) => {
      if (this.shouldAnimateList) {
        this.initListAnimation();
      }
      this.initHeaderAnimation();
    });
    this.loadCoins();
  }

  loadCoins() {
    this.coinsService.getCoins().subscribe((result) => {
      this.coins = result;
      this.sortedCoins = result.coins;
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
    if (this.selectedTab != swiper.realIndex % 4) {
      this.selectedTab = swiper.realIndex % 4;
      this.shouldAnimateList = true;
      this.sortCoins(this.selectedTab);
      this.changeDetectorRef.detectChanges();
    }
  }

  sortCoins(selectedTab: number) {
    var val: CoinResult[] | undefined;
    if (selectedTab == 0) {
      val = this.coins?.coins;
    } else if (selectedTab == 4) {
      val = this.coins?.coins.sort((a, b) => {
        return a.marketCap - b.marketCap;
      });
    } else {
      val = this.coins?.coins.filter((el) => {
        if (selectedTab == 1) {
          return el.priceChange1d > 0;
        } else if (selectedTab == 2) {
          return el.priceChange1d < 0;
        }
        return el;
      });
    }
    if (val != undefined) {
      this.sortedCoins = val;
    }
  }
}
