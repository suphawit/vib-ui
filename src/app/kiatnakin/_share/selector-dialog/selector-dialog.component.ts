import { Component, EventEmitter, OnInit, OnChanges, Input, Output, SimpleChanges, SimpleChange } from '@angular/core';
import { Utils } from "../../../share/utils";
import { isNullOrUndefined } from "util";
import { OnMount } from "ng-dynamic";

@Component({
    selector: 'selector-dialog',
    templateUrl: './selector-dialog.component.html',
    styleUrls: ['./selector-dialog.component.sass']
})
export class SelectorDialogComponent implements OnInit, OnChanges, OnMount {

    @Output() onSelector = new EventEmitter();
    @Output() showSelector2 = new EventEmitter();
    // public SeletorId: string
    public SeletorId = "#seletor_content";
    // public SeletorId = `#${this.id}_content`;
    public backgroundId: string;
    public isShow: boolean = false;
    public isShowInputText: boolean = false;
    public searchTxt = '';

    @Input() id;
    @Input() DataList;
    @Input() Title;
    @Input() ActiveNow;
    @Input() InDiv;
    @Input() RespondCode;
    @Input() idClose;

    public totalDataList: any;

    constructor() {
    }

    ngOnInit() {

        if (this.InDiv !== true) {
            this.InDiv = false;
        }
        Utils.logDebug('ngOnInit', 'this.DataList : ' + JSON.stringify(this.DataList));
        Utils.logDebug('ngOnInit', 'this.id : ' + this.id);
        Utils.logDebug('ngOnInit', 'this.ActiveNow : ' + JSON.stringify(this.ActiveNow));

        this.backgroundId = `#${this.id}_bg`;
        this.totalDataList = this.DataList;
        if (this.DataList && !isNullOrUndefined(this.ActiveNow)) {
        } else {
            this.ActiveNow = { value: "" };
        }

        this.onOpenSelector();

    }

    ngOnChanges(changes: SimpleChanges) {
        const ActiveNow: SimpleChange = changes.ActiveNow;
        if (ActiveNow !== undefined) {
            this.ActiveNow = ActiveNow.currentValue;
            if (!isNullOrUndefined(this.ActiveNow) && this.ActiveNow.constructor === Array) {
                this.ActiveNow = this.ActiveNow[0];
            } else {
                this.ActiveNow = { value: "" };
            }
        }
    }

    dynamicOnMount(attr: Map<string, string>, innerHTML: string, el: any) {
        const _data_list = JSON.parse(decodeURI(attr.get("data_list")));
        const _title = attr.get("data_title");
        const _data_active_now = JSON.parse(decodeURI(attr.get("data_active_now")));
        this.id = attr.get("data_id");
        this.SeletorId = `#${this.id}_content`;
        this.backgroundId = `#${this.id}_bg`;

        $(`.selector-content`).hide();
        $(`.selector_content_bg`).hide();
        this.ActiveNow = _data_active_now;
        this.Title = _title;
        this.DataList = _data_list;
        this.isShowInputText = true;
    }

    onToggleDialog() {
        if (this.isShow) {
            this.onClickDismiss();
        }
        else {
            this.onOpenSelector();
        }
    }

    onOpenSelector() {
        $('#' + this.idClose).hide();
        Utils.animate(this.SeletorId, "fadeInUp")
            .then(() => {
                $(this.SeletorId).removeClass('animated fadeInUp');
                $(`${this.SeletorId},${this.backgroundId}`).show();
                this.showSelector2.emit(true);
                this.isShow = true;

                if (!isNullOrUndefined(this.ActiveNow) && this.ActiveNow.value !== "") {
                    const $container = $('#scroll_id'),
                        $scrollTo = $(`#${this.id}_${this.ActiveNow.value}`);
                    if (!isNullOrUndefined($scrollTo.offset())) {
                        $container.animate({
                            scrollTop: $scrollTo.offset().top - $container.offset().top + $container.scrollTop()
                        });
                    }

                }
            });
    }

    onClickDismiss() {
        Utils.animate(this.SeletorId, "fadeOutDown")
            .then(() => {
                $(this.SeletorId).removeClass('animated fadeOutDown');
                $(`${this.SeletorId},${this.backgroundId}`).hide();
                $('#' + this.idClose).show();
                this.showSelector2.emit(false);
                this.isShow = false;
            });
    }

    onClickSelect(selectedData) {
        this.ActiveNow = selectedData;
        Utils.animate(this.SeletorId, "fadeOutDown")
            .then(() => {
                $(this.SeletorId).removeClass('animated fadeOutDown');
                $(`${this.SeletorId},${this.backgroundId}`).hide();
                this.isShow = false;
                $('#' + this.idClose).show();
                this.showSelector2.emit(false);
                this.onSelector.emit({ "id": this.id, "selected": selectedData });
            });
    }

    onSearchChanged(event) {
        Utils.logDebug('selector-dialog : onSearchChanged', 'event : ' + event);
        if (isNullOrUndefined(this.searchTxt) || this.searchTxt === '') {
            this.DataList = this.totalDataList;
        }
        const filter = this.totalDataList.filter(item => {
            return item.data.indexOf(this.searchTxt) > -1;
        });
        this.DataList = filter;
    }
}
