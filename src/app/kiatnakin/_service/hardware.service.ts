import { Injectable } from '@angular/core';
import { HWSocket, AppConstant } from "../../share/app.constant";
import { Router, ActivatedRoute } from "@angular/router";
import { Environment, Utils } from "../../share/utils";
import { Observable } from 'rxjs/Rx';
import { isNullOrUndefined } from "util";
import { Transaction, PaymentType } from "../_model/transaction";
import { json } from "ng2-validation/dist/json";
import { WebSocketService } from "../_share/websocket.service";

type requestCallback = (data: any) => any;

@Injectable()
export class HardwareService {

    private url = Environment.domainHardware;
    private isRequestingEDC: boolean = false;
    private socket: SocketIOClient.Socket;
    public fromType: string;
    public toType: string;

    constructor(private router: Router) {

    }

    public connectHardware() {
        this.connect(Environment.domainHardware);
        console.log("%c ConnectHardware on " + this.url, 'background: #4BB543; color: #FFFFFF');
    }

    public connectTellerApprove() {
        this.connect(Environment.socketTeller);
        console.log("connectTellerApprove on ", this.url);
    }

    private connect(url?: string) {

        if (!isNullOrUndefined(url)) {
            if (!isNullOrUndefined(this.socket)) {
                this.socket.disconnect();
            }
            this.socket = null;
            this.url = url;
        }

        if (!this.socket || !this.socket.connected) {

            this.socket = new WebSocketService().connect(this.url, {
                forceNew: false,
                timeout: 500,
                reconnectionDelay: 5000
            });

            this.isRequestingEDC = false;

            this.socket.on("connect", () => {
                console.log("HardwareService connect");
            });

            this.socket.on("disconnect", () => {
                console.log("HardwareService Disconnected");
            });
        }
    }

    public disconnect() {

        if (!isNullOrUndefined(this.socket) && this.socket.connected) {
            this.socket.disconnect();
        }
    }

    public checkConnectionHardware() {
        console.log("checkConnectionHardware");
        if (isNullOrUndefined(this.socket) || !this.socket.connected) {
            this.connect(Environment.domainHardware);
            console.log("reconnect");
            const sleep = function (milliseconds) {
                const start = new Date().getTime();
                for (let i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }
            sleep(1500)
        }
    }

    public requestSmartCardReader() {
        Utils.logDebug('hardware.service', 'requestSmartCardReader');
        const that = this;
        if (isNullOrUndefined(that.socket) || !that.socket.connected) {
            that.connect(Environment.domainHardware);
            console.log("reconnect");
            const sleep = function (milliseconds) {
                const start = new Date().getTime();
                for (let i = 0; i < 1e7; i++) {
                    if ((new Date().getTime() - start) > milliseconds) {
                        break;
                    }
                }
            }
            sleep(1500)
        }
        return new Observable<any>(observer => {

            this.socket.removeAllListeners();
            // this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, HWSocket.REQUEST.SMART_CARD_CLOSE);
            Utils.logDebug('hardware.service', 'requestSmartCardReader -> emit : ' + JSON.stringify(HWSocket.REQUEST.SMART_CARD));
            this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, HWSocket.REQUEST.SMART_CARD);
            this.socket.on(HWSocket.EVENT.SMART_CARD, (data) => {
                observer.next(data);
                if (data.code === "0000" || data.code.startsWith("9") || data.code === '1110') {
                    this.socket.removeAllListeners();
                    observer.complete();
                    observer.unsubscribe();
                }
            });
        });
    }

    public requestATMUnionPAYReader() {
        this.checkConnectionHardware()

        return new Observable<any>(observer => {
            this.socket.removeAllListeners();
            this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, HWSocket.REQUEST.ATM_UNION_PAY_CARD);

            this.socket.on(HWSocket.EVENT.SMART_CARD, (data) => {
                observer.next(data);
                console.log(data.code)
                if (data.code === "0000" || data.code.startsWith("9") || data.code === '1110') {
                    this.socket.removeAllListeners();
                    observer.complete();
                    observer.unsubscribe();
                }
            });
        });

    }

    public requestENCPIN(pin: string) {
        this.checkConnectionHardware()

        return new Observable<any>(observer => {
            const request = HWSocket.REQUEST.ENCRYTION.replace("{0}", pin)

            this.socket.removeAllListeners();
            this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, request);

            this.socket.on(HWSocket.EVENT.ENCRYPTION, (data) => {
                observer.next(data);

                if (data.code === "0000" || data.code.startsWith("9") || data.code === '1110') {
                    this.socket.removeAllListeners();
                    observer.complete();
                    observer.unsubscribe();
                }
            });
        });

    }

    public requestFingerScan(onPrepare: requestCallback,
        onCapture: requestCallback,
        onSuccess: requestCallback,
        onError: requestCallback) {

    }

    public requestPIN(onStatus?: requestCallback,
        onSuccess?: requestCallback,
        onError?: requestCallback) {


    }

    public requestPrintSlip(jsonData: any) {
        console.log(jsonData);
        this.socket.emit(HWSocket.COMMAND.PRINT_SLIP_REQUEST, jsonData);
    }

    public requestPrintSlipWithThermal(jsonData: any) {
        this.socket.emit(HWSocket.COMMAND.PRINT_SLIP_REQUEST, jsonData);
    }

    public requestPrintPDF(jsonData: any) {
        this.socket.emit(HWSocket.COMMAND.PRINT_PDF_REQUEST, jsonData);
    }

    public requestScanDocumentMICR() {
        const that = this;
        return new Observable(observer => {

            if (isNullOrUndefined(that.socket) || !that.socket.connected) {
                console.log("reconnect sockect");
                observer.error({ code: HWSocket.HW_CODE.DISCONNECTED });
                observer.complete();
                that.connect();
                return;
            }

            this.socket.removeAllListeners();
            this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, HWSocket.REQUEST.MICR);

            this.socket.on(HWSocket.EVENT.CAMERA, (data) => {
                console.log(data);
                observer.next(data);

                if (data.code === "0000") {
                    observer.complete();
                    observer.unsubscribe();
                }
            });
        });
    }

    public requestScanDocumentPaper() {
        const that = this;
        return new Observable(observer => {
            if (isNullOrUndefined(that.socket) || !that.socket.connected) {
                console.log("reconnect sockect");
                observer.error({ code: HWSocket.HW_CODE.DISCONNECTED });
                observer.complete();
                that.connect();
                return;
            }

            this.socket.removeAllListeners();
            this.socket.emit(HWSocket.COMMAND.SEND_COMMAND, HWSocket.REQUEST.PAPER_DETACT);

            this.socket.on(HWSocket.EVENT.SNAPSHOTCAMERA, (data) => {
                observer.next(data);
                if (data.code === "0000") {
                    observer.complete();
                    observer.unsubscribe();
                }
            });
        });
    }

    public sendApproveTransaction(transactionType: string, transaction: Transaction) {
        const that = this;
        return new Observable(observer => {

            if (isNullOrUndefined(that.socket) || !that.socket.connected) {
                observer.error({ code: HWSocket.HW_CODE.DISCONNECTED });
                observer.complete();
                that.connect();
                return;
            }

            this.socket.removeAllListeners();

            // const tellerTransaction = this.onSetData(transaction);

            const jsonData = {
                id: transaction.referenceNo,
                transactionType: transactionType,
                data: transaction,
                status: "Waiting for approve"
            };

            console.info("======= para ======= ", JSON.stringify(jsonData));
            this.socket.emit("request_approve", jsonData);
            this.socket.on("message", (data) => {
                observer.next(data);
                observer.complete();
            });
        });
    }

    public transactionType(transaction) {
        this.checkAccountTypeFrom(transaction);
        this.checkAccountTypeTo(transaction);
        return this.fromType + ' - ' + this.toType
    }

    private checkAccountTypeFrom(transaction) {
        switch (transaction.from.accountType) {
            case PaymentType.Cash:
                this.fromType = 'CASH';
                break;
            case PaymentType.Cheque:
                this.fromType = 'CHEQUE';
                break;
            case 'CA':
                this.fromType = 'Current Account';
                break;
            case 'SA':
                this.fromType = 'Saving Account';
                break;
            case 'TD':
                this.fromType = 'Term Deposit Account';
                break;
        }
    }

    private checkAccountTypeTo(transaction) {
        switch (transaction.to.accountType) {
            case PaymentType.Cash:
                this.toType = 'CASH';
                break;
            case PaymentType.Cheque:
                this.toType = 'CHEQUE';
                break;
            case 'CA':
                this.toType = 'Current Account';
                break;
            case 'SA':
                this.toType = 'Saving Account';
                break;
            case 'TD':
                this.toType = 'Term Deposit Account';
                break;
        }
    }

    public onSetData(transaction) {

        // const TransactionType = this.transactionType(transaction);
        // let tellerTransaction = {
        //     from: {
        //         accountName: transaction.from.accountName,
        //         custCif: transaction.from.custCif,
        //         accountNumber: transaction.from.accountNumber,
        //         micrResult: !isNullOrUndefined(transaction.from.micrResult) ? transaction.from.micrResult : '',
        //         accountType: transaction.from.accountType,
        //         branchName: transaction.from.branchName,
        //         branchCode: transaction.from.branchCode,
        //         availBalance: transaction.from.availBalance,
        //         bank: {
        //             name: transaction.from.bank.name,
        //             code: transaction.from.bank.code
        //         }
        //     },
        //     to: {
        //         accountName: transaction.to.accountName,
        //         custCif: transaction.to.custCif,
        //         accountNumber: transaction.from.accountNumber,
        //         micrResult: !isNullOrUndefined(transaction.to.micrResult) ? transaction.to.micrResult : '',
        //         accountType: transaction.to.accountType,
        //         branchName: transaction.to.branchName,
        //         branchCode: transaction.to.branchCode,
        //         availBalance: transaction.to.availBalance,
        //         bank: {
        //             name: transaction.to.bank.name,
        //             code: transaction.to.bank.code
        //         }
        //     },
        //     fee: {
        //         amount: transaction.fee.amount,
        //         fee_gl_account_to: transaction.fee_gl_account_to
        //     },
        //     trname: transaction.trName,
        //     amount: transaction.amount,
        //     totalAmount: transaction.totalAmount,
        //     effectiveDate: transaction.effectiveDate,
        //     transactionType: TransactionType
        // }

        // if (transaction.from.accountType === 'TD' || transaction.to.accountType === 'TD') {
        //     const TDobj = {
        //         selectedTDTerm: {
        //             nameTH: !isNullOrUndefined(transaction.selectedTDTerm.nameTH) ? transaction.selectedTDTerm.nameTH : '',
        //             freqIntPayDescTH: !transaction.selectedTDTerm.freqIntPayDescTH ? transaction.selectedTDTerm.freqIntPayDescTH : ''
        //         },
        //
        //         interestRate: {
        //             TDDepositRate: !transaction.interestRate.TDDepositRate ? transaction.interestRate.TDDepositRate : '',
        //         },
        //     }
        //     tellerTransaction = Object.assign(tellerTransaction, TDobj);
        // }
        // return tellerTransaction
    }

    movePopupToFullScreen() {

        this.connect();

        setTimeout(() => {
            this.socket.emit("movepopup");
            this.disconnect();
        }, 500);
    }

}
