import { isNullOrUndefined } from "util";
/**
 * Created by imac on 3/14/2017 AD.
 */

export class UserProfile {

    idNumber: number;
    BIRTH_DATE: string;
    idType: string;
    titleTH: string;
    titleEN: string;
    nameTH: string;
    nameEN: string;
    surenameTH: string;
    surenameEN: string;
    custSegment: string;
    mobileNumber: string;
    kyc: string;
    kkcisid: string;
    email: string
    suitFound;
    suitScore;
    suitExpired;
    GUID;
    loginType: string;
    gender: string;

    constructor(jsonData, loginType) {

        if (!isNullOrUndefined(jsonData)) {
            this.idNumber = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.CARD_ID;
            this.BIRTH_DATE = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.BIRTH_DATE;
            this.titleTH = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.TITLE_TH;
            this.titleEN = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.TITLE_EN;
            this.nameTH = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.FIRSTNAME_TH;
            this.nameEN = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.FIRSTNAME_EN;
            this.surenameTH = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.SURNAME_TH;
            this.surenameEN = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.SURNAME_EN;
            this.idType = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.ID_TYPE;
            this.custSegment = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.CUST_SEGMENT;
            this.mobileNumber = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.MOBILE_NO;
            this.kyc = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.KYC;
            this.kkcisid = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.KKCISID;
            this.email = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.EMAIL;
            this.gender = jsonData.data.CUSTPROFILEMAINSUB_LIST.CUSTOMER_INFO_DETAIL.GENDER;
            this.loginType = loginType
        }
    }

    updateSuitScore(suitScore) {
        this.suitScore = suitScore
    }
}