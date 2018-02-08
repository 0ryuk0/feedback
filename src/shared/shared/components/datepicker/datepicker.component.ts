import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {
  datePickerValue: Date = new Date();
  datePickerToggle: boolean = false;
  maxDateValue: Date = new Date();
  @Input() value : Date;
  @Output() dateSelected: EventEmitter<any> = new EventEmitter<any>();

  toggleDatePicker() {
    this.datePickerToggle = !this.datePickerToggle;
  }

  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   this.datePickerToggle = 
  // }

  onSelectionDone (e: any) {
    this.toggleDatePicker();
    this.dateSelected.emit(e);
  };

  getDate(): number {
    return this.datePickerValue && this.datePickerValue.getTime() || new Date().getTime()
  };

  constructor() { }

  ngOnInit() {
    this.datePickerValue = this.value;
  }
}
