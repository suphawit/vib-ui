import {Component, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {Utils} from "../../../share/utils";

@Component({
    selector: 'template-flip-book',
    templateUrl: './template-flip-book.component.html',
    styleUrls: ['./template-flip-book.component.sass']
})
export class TemplateFlipBookComponent implements OnInit, OnDestroy, AfterViewInit {

    @Output() onStart: EventEmitter<any> = new EventEmitter();
    @Output() onTurning: EventEmitter<any> = new EventEmitter();
    @Output() onTurned: EventEmitter<any> = new EventEmitter();
    @Output() onEnd: EventEmitter<any> = new EventEmitter();
    @Output() onFlipInit: EventEmitter<any> = new EventEmitter();

    private savingBook = null;

    constructor() {

    }

    ngOnInit() {

    }

    ngOnDestroy() {
        if (this.savingBook != null) {
            this.savingBook.turn("destroy");
            this.savingBook = null;
        }
        window["cornerSize"] = null
    }

    ngAfterViewInit() {
        this.initFlipbook()
        this.onFlipInit.emit(this.savingBook);
    }

    initFlipbook() {
        const that = this;
        this.savingBook = $("#saving-book").turn({
            width: (700 * 2),
            height: 980,
            elevation: 30,
            acceleration: false,
            gradients: true,
            autoCenter: false,
            duration: 1500,
            when: {
                start: function (event, pageObject, corner) {
                    that.onStart.emit({page: event.target, event: event});
                },
                turning: function (event, pageIndex, page, pageObject) {
                    that.onTurning.emit({index: pageIndex, page: pageObject.context, event: event});
                },
                turned: function (event, pageIndex, page) {
                    that.onTurned.emit({index: pageIndex, page: page.context, event: event});
                },
                end: function (event, pageObject, turned) {
                    that.onEnd.emit({index: pageObject.page});
                },
                missing: function (e, pages) {

                },
                first: function (event) {

                },
                last: function (event) {

                }
            }
        }).turn("next");
    }
}
