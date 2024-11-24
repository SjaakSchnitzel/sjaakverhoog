import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule], 
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  
  items = signal<string[]>(['Voorbeeld 1', 'Voorbeeld 2']); 
  newItem = signal<string>(''); 

  
  addItem() {
    if (this.newItem()) {
      this.items.update(items => [...items, this.newItem()]);
      this.newItem.set(''); 
    }
  }

  
  removeItem(index: number) {
    this.items.update(items => items.filter((_, i) => i !== index));
  }
}
