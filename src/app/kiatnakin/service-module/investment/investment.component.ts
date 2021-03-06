import { Component, OnInit } from '@angular/core'
import { Router } from "@angular/router"
import { InvestmentService } from "../../_service/api/investment.service"
import { Modal } from "../../_share/modal-dialog/modal-dialog.component"
import { DataService } from 'app/kiatnakin/_service'
import { Investment } from "../../_model/investment"
import { TransactionService } from 'app/kiatnakin/_service/api/transaction.service'
import { isNullOrUndefined } from 'util';

@Component({ selector: 'investment', templateUrl: './investment.component.html', styleUrls: ['./investment.component.sass'] })
export class InvestmentComponent implements OnInit {

    public titleInvest;
    public fundList = new Array();
    public holderList = new Array();

    constructor(private router: Router, private investmentService: InvestmentService, private dataService: DataService) {
        if (isNullOrUndefined(this.dataService.transaction)) {
            this.dataService.transaction = new Investment()
        }
    }

    ngOnInit() {
        this.requestGetPortDetail()
    }

    requestGetPortDetail() {

        this
            .investmentService
            .getPortDetail()
            .subscribe((list) => {
                this.fundList = list.data[0].ListDetail
            }, (error) => {
                Modal.showAlert(error.responseStatus.responseMessage)
            })

        this
            .investmentService
            .getHolderList()
            .subscribe(list => {
                this.holderList = list.data
            }, error => { })
    }

    onSelectedTransaction(step) {

        const queryParams = {
            type: step
        };
        this
            .router
            .navigate([
                "kk", "investment", "fundList"
            ], { queryParams: queryParams });
    }

    onSelectedUnitHolder($event) {

    }

    public redirectToMain() {
        this.router.navigate(["kk"]);
    }

    public onClickBack() {
        this.router.navigate(["kk", "transactiontype"]);
    }
}
