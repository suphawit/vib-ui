import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BankAccount } from "../_model/bankAccount";
import { ServiceCategory } from "../_model/serviceCategory";
import { Transaction } from "../_model/transaction";
import { Transfer } from "../_model/transfer";
import { isNullOrUndefined } from "util";
import { UserService } from "./user.service";
import { Product } from "../_model/Product";
import { LocalStorage, SessionStorage } from "ngx-webstorage";
import { Bank } from '../_model';

@Injectable()
export class DataService {

    @SessionStorage("LastDateTellerAuthorized", "")
    LastDateTellerAuthorized: string

    @SessionStorage("tellertoken", "")
    tellerToken: string

    @SessionStorage("tokenOtt", "")
    tokenOtt: string

    netProfit;
    netAssetValueStr;
    netProfitStr;
    currentUrl: string;
    backFromDepositType: boolean;
    fromMenuFundManagement: boolean;
    dataBankList: [Bank]
    authenList: [any];
    selectedDepositType: string;
    isAnonymousMode: Boolean = false;
    selectedAccount: BankAccount | BankAccount[] | any;
    selectedMutualfundAccount;
    selectedOutstanding;
    ownBankAccountList: BankAccount | BankAccount[] | any;
    selectedProduct: Product | any;
    selectedProductList: Product | any;
    selectedProductDetail: Product | any;
    selectedService: ServiceCategory;
    transaction: any = null;
    isAuthenticated: boolean = false;
    isAcceptedTermMutualFund: boolean = false;
    isGetFundCondition: string = 'N';
    dataFrom: string;
    SubService: boolean;
    absorption: boolean = false;
    openFunction: string;
    isTransferFund: boolean = false;
    suitQuestion;
    config = {
        displayLoginCard: true
    };

    constructor(private userService: UserService) {
        this.config.displayLoginCard = true;
    }

    resetInterLogin() {
        if (!isNullOrUndefined(this.transaction)) {
            this.transaction.loginfrom = null;
        }
    }

    public resetData() {
        this.selectedService = null;
        this.selectedAccount = null;
        this.selectedMutualfundAccount = null;
        this.isAnonymousMode = false;
        this.config.displayLoginCard = true;
        this.transaction = null;
        this.isAuthenticated = false;
        this.authenList = null
        if (!this.userService.isLoggedin()) {
            this.isAcceptedTermMutualFund = false;
            this.userService.clearUser();
        }
        this.userService.clearUserAuthen();
        this.resetBlueSapphireAll(); //BlueSapphire resetData
    }

    resetTransactionData() {

        this.transaction = null;
        this.isAuthenticated = false;
    }

    public blueSapphireData = {};

    public resetBlueSapphireByKey(key) {
        this.blueSapphireData[key] = null;
    }

    public resetBlueSapphireAll() {
        Object.keys(this.blueSapphireData).forEach(prop_key => {
            this.blueSapphireData[prop_key] = null;
        });
    }

    public checkStatus() {
        const that = this;
        return new Observable(observer => {
            observer.next(this.openFunction);
        }
        )
    }
}
