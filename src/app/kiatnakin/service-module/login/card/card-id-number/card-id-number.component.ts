import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Modal } from "../../../../_share/modal-dialog/modal-dialog.component";
import { UserService } from "../../../../_service/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "../../../../_service/api/login.service";
import { AppConstant } from '../../../../../share/app.constant';
import { DataService } from '../../../../_service';
import { BankAccount } from '../../../../_model';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'card-id-number',
    templateUrl: './card-id-number.component.html',
    styleUrls: ['./card-id-number.component.sass']
})
export class CardIdNumberComponent implements OnInit {

    @Output() onAuthenticate: EventEmitter<boolean> = new EventEmitter<boolean>();

    private loginMode;
    public userLogin = {
        idCard: "",
        pin: ""
    };

    constructor(private loginService: LoginService,
        private userService: UserService,
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private router: Router) {
    }

    ngOnInit() {
        const objectParams = this.activatedRoute.snapshot.queryParams;
        this.loginMode = objectParams.mode;
        // hack is here --- bass below ---
        // this.userLogin.idCard = "0606448325667";    // no suit score
        // this.userLogin.pin = "123456";              // no suit score
        // this.userLogin.idCard = "2391444010950";    // have suit score
        // this.userLogin.pin = "121212";              // have suit score
        // this.userLogin.idCard = "5429345890979";    // can't use this one
        // this.userLogin.pin = "121212";              // can't use this one
        // hack is here --- bass above ---
    }

    onClickLogin() {
        Modal.showProgress();

        setTimeout(() => {
            const that = this;
            this.loginService.loginWithIDAndPINNewVIB(this.userLogin.idCard, this.userLogin.pin, AppConstant.LoginType.IDNoMyPIN)
                .subscribe(
                    userProfile => {
                        if (that.loginMode === "authenticate" || that.loginMode === "authenticate-factor2") {
                            that.dataService.config.displayLoginCard = false;
                            const selectedBankAccountFrom: BankAccount = that.dataService.transaction.from

                            if (!isNullOrUndefined(selectedBankAccountFrom)) {
                                if (userProfile.kkcisid.toString() !== selectedBankAccountFrom.custCif) {
                                    //Authen: False
                                    Modal.showAlert("Authenication not match");
                                    this.onAuthenticate.emit(false);
                                    return
                                }
                            }
                            this.userService.authenFector1Success(userProfile);
                            this.dataService.authenList = null;
                        }
                        else {
                            this.userService.loginSuccess(userProfile);
                        }

                        this.onAuthenticate.emit(true);
                    },
                    error => {
                        Modal.showAlert(error.responseStatus.responseMessage);
                        this.onAuthenticate.emit(false);
                    });

        }, 2000);
    }

}
