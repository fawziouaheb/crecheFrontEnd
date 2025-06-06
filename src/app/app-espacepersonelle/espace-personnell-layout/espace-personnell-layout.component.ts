import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { clearToken } from '../../store/authentification/auth.actions';

@Component({
  selector: 'app-espace-personnell-layout',
  templateUrl: './espace-personnell-layout.component.html',
  styleUrls: ['./espace-personnell-layout.component.css'],
})
export class EspacePersonnellLayoutComponent implements OnInit, OnChanges {
  @Input() isDropdownVisible: boolean = false;
  @Input() username: string | null = '';
  @Input() items: string[] = [];
  @Input() value: string = '';
  @Input() menuItems: {
    name: string;
    url: string;
    selected: boolean;
    hovered: boolean;
  }[] = [];

  @Output() valueChange = new EventEmitter<string>();

  public sidebarVisible: boolean = false;

  constructor(private router: Router, private store: Store) {}

  ngOnInit(): void {
    console.log('broken : ', this.menuItems);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items'] && this.items.length > 0 && !this.value) {
      // Définit la première structure si aucune n'est sélectionnée
      this.value = this.items[0];
      this.valueChange.emit(this.value);
    }
  }

  setValue(event: Event, item: string) {
    event.preventDefault();
    if (this.value !== item) {
      this.value = item;
      this.valueChange.emit(this.value);
    }
  }

  selectMenuItem(item: any) {
    this.menuItems.forEach((i) => (i.selected = false));
    item.selected = true;
    this.navigateTo(item.url);
  }

  navigateTo(url: string) {
    this.router.navigate([url]);
  }

  logout() {
    this.store.dispatch(clearToken());
  }
}
