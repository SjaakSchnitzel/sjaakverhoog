import { Component, signal, linkedSignal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactMethode {
  id: number;
  naam: string;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  
  naam = signal<string>('');
  email = signal<string>('');
  telefoonnummer = signal<string>('');
  adres = signal<string>('');
  plaats = signal<string>('');
  bericht = signal<string>('');

  confirmationMessage = signal<string>('');

  contactMethodeOptions = signal<ContactMethode[]>([
    { id: 1, naam: 'E-Mail' },
    { id: 2, naam: 'Telefoon' },
    { id: 3, naam: 'Afspraak maken' }
  ]);

  selectedOption = linkedSignal(() => this.contactMethodeOptions()[0]);

  get formFields() {
    const selected = this.selectedOption();
    if (selected.naam === 'E-Mail') {
      return ['naam', 'email', 'bericht'];
    } else if (selected.naam === 'Telefoon') {
      return ['naam', 'telefoonnummer', 'bericht'];
    } else if (selected.naam === 'Afspraak maken') {
      return ['naam', 'adres', 'plaats', 'telefoonnummer', 'bericht'];
    }
    return [];
  }

  changeContact(newOptionIndex: number) {
    this.selectedOption.set(this.contactMethodeOptions()[newOptionIndex]);
    this.confirmationMessage.set('');
  }

  updateSignal(signal: WritableSignal<string>, event: Event) {
    const input = event.target as HTMLInputElement;
    signal.set(input.value);
  }

  generateConfirmationMessage() {
    const naam = this.naam() || '...';
    const selectedOption = this.selectedOption();
    let bericht = `Beste ${naam},\n\n`;

    if (selectedOption.naam === 'E-Mail') {
      bericht += `Je hebt gekozen voor contact via e-mail.`;
      bericht += `\nWe sturen u binnen 2 werkdagen een e-mail op het adres: ${this.email() || '...'}.\n`;
    } else if (selectedOption.naam === 'Telefoon') {
      bericht += `Je hebt gekozen voor telefonisch contact.`;
      bericht += `\nWe bellen u binnen 2 werkdagen op telefoonnummer: ${this.telefoonnummer() || '...'}.\n`;
    } else if (selectedOption.naam === 'Afspraak maken') {
      bericht += `Je wil graag een afspraak voor een bezoek inplannen.`;
      bericht += `\nWe bellen u binnen 2 werkdagen op telefoonnummer: ${this.telefoonnummer() || '...'}\nom een afspraak in te plannen voor een bezoek op:\n${this.adres() || '...'} te ${this.plaats() || '...'}.\n`;
    }

    bericht += `\nBedankt dat u contact met ons op hebt genomen.`;
    this.confirmationMessage.set(bericht);
  }

  onSubmit() {
    this.generateConfirmationMessage();
  }

}
