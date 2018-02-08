import { OnInit, OnDestroy } from '@angular/core';
import { Directive, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import * as Dropzone from 'dropzone';
import { Subject } from 'rxjs/Subject';

declare var jQuery: any;

@Directive ({
    // tslint:disable-next-line:directive-selector
    selector: '[dropzone]'
})

export class DropzoneDirective implements OnInit, OnDestroy {
    @Input() private posturl: any;
    @Input() uploadComplete: Subject<boolean> = new Subject<boolean>();
    @Output() fileReady: EventEmitter<any> = new EventEmitter<any>();
    @Output() fileRemoved: EventEmitter<any> = new EventEmitter<any>();
    dropzone: any;
    fileCount = 0;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        let dz: typeof Dropzone = Dropzone;
        dz.autoDiscover = false;

        this.uploadComplete.subscribe(res => {
            if (res) {
                this.dropzone.removeAllFiles();
            }
        });

        if (!this.el.nativeElement.dropzone) {
            this.dropzone = new Dropzone(this.el.nativeElement, {
                url: this.posturl,
                addRemoveLinks: true,
                autoProcessQueue: false,
                maxFiles: 1,
                acceptedFiles: '.js'
            });
        }else {
            this.dropzone = this.el.nativeElement.dropzone;
        }

        this.dropzone.on('addedfile', (file) => {
                let myReader : FileReader = new FileReader();
                this.fileCount++;
                let that = this;
                myReader.onloadend = function (e) {
                    that.fileReady.emit({'Name' : file.name , 'Source' : myReader.result});
                }
                myReader.readAsText(file);
            }
        );

        this.dropzone.on('maxfilesexceeded', (file) => {
                this.fileCount--;
                this.dropzone.removeFile(file);
            }
        );

        this.dropzone.on('removedfile', (file) => {
                console.log('remove file' + this.fileCount);
                this.fileCount--;
                if (this.fileCount == 0) {
                    this.fileRemoved.emit('');
                }
            }
        );
    }

    ngOnDestroy() {
        this.dropzone.destroy();
        this.uploadComplete.unsubscribe();
    }
}
