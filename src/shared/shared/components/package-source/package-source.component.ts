import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Select2OptionData } from 'ng2-select2';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SelectOptions } from '../../model/selectoptions';

@Component({
  selector: 'app-package-source',
  templateUrl: './package-source.component.html'
})
export class PackageSourceComponent implements OnInit {
  @Input() value: Subject<string> = new Subject<string>();
  @Output() packageSourceChanged: EventEmitter<any> = new EventEmitter<any>();

  packageSourceSelect2Data: Array<Select2OptionData> = [
    { 'id': '1', text: 'AmazonS3'},
    { 'id': '2', text: 'Database' },
  ];
  sourceSelectedData: Observable<string> = Observable.of('1');
  selectOptions: any = SelectOptions.selectOptions;

  constructor() { }

  ngOnInit() {
    this.value.subscribe(res => {
      console.log(res);
      if(res){
        this.sourceSelectedData = Observable.of(res);
      }
      else{
        this.packageSourceChanged.emit({value : '1'});
      }
    });
  }

  onSourceChanged(e: any): void {
    this.packageSourceChanged.emit(e);
  }

  ngOnDestroy(){
    this.value.unsubscribe();
  }
}
