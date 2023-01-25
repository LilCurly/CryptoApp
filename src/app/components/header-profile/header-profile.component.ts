import { Component, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  @Input('userName') userName: String = '';

  @Input() shouldShowFilter: boolean = false
  @Input() onFilterClick!: () => void

  constructor() {}

  ngOnInit() {}
}
