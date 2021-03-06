import { Injectable } from "@angular/core";
import { Environment } from "./utils";

/**
 * Created by Palomar on 10/10/2016 AD.
 */


@Injectable()
export class AppConstant {

    static appVersion: string = "4.0.0.0R20200911";
    static company: string = "kiatnakin";

    static assetRootPath: string = "./assets/" + AppConstant.company + "/";
    static assetJSPath: string = AppConstant.assetRootPath + "js/";
    static asseti18nPath: string = AppConstant.assetRootPath + "i18n/";
    static assetConfigPath: string = AppConstant.assetRootPath + "config/";
    static assetSoundPath: string = AppConstant.assetRootPath + "sound/";
    static ignoreHardware = true;
    static ignoreValid = true;
    static kkTokenKey: string = "KK";
    static bankCode: string = "069";
    static userEmp = '1000909999';
    static debugMode: boolean = true;

    static sectionSavingFlow = {
        intro: "intro",
        openAccount: "openAccount",
        termCondition: "termCondition",
        fatca: "fatca",
        ssu: "ssu",
        subScript: "subScript",
        fingerScan: "fingerScan",
        idCardScan: "idCardScan",
        pin: "user_authenpin"
    };

    static LoginType = {
        UsernamePassword: "usernamepassword",
        ATMMyPIN: "atmcard+mypin",
        IDCardMyPIN: "idcard+mypin",
        IDNoMyPIN: "idno+mypin"
    };

    static TrasferType = {
        IM: 'IM',
        SMARTSAMEDAY: '1D',
        SMARTNEXTDAY: '2D'
    };

    static IdType = '001';
    static ProdTypeSaving = 'S';
    static ProdTypeCurrent = 'D';
    static ProdTypeFix = 'T';
    static AddressTypeRegister = 'R';
    static AddressTypeMailing = 'M';
    static AddressTypeOffice = 'O';
    static COUNTRY_TH = 'TH';
    static OTP_ACCEPT_TERM_TH = 'otp_accept_term_th';
    static OTP_REGISTER_PROMPTPAY_TH = 'otp_register_promptpay_th';
    static OTP_TRANSFER_TH = 'otp_transfer_th';
    static OTP_TEMP_LOGIN_TH = 'otp_temp_login_th';
    static REGISTER_ANY_ID_TYPE = 'NATID';
    static ContactTypeMobileCode = 'MBL';
    static ContactTypeEmailCode = 'EML';
    static ContactTypeHomePhoneCode = 'HPH';
    static ContactTypeWorkPhoneCode = 'OPH';
    static ContactTypeFaxCode = 'FAX';
    static CustomerSubType = '6001'             // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'CUSTOMER_SUBTYPE = 6001
    static CustomerCategory = 'I'               // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'CUSTOMER_CATEGORY = I
    static MaritalStatusMarried = 'M';          // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'MARITAL_STATUS = M
    static MaritalStatusWidow = 'W';            // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'MARITAL_STATUS = W
    static MaritalStatusMarriedNoRegisted = 'R';  // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'MARITAL_STATUS = R
    static MaritalStatusDivorced = 'D';           // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'MARITAL_STATUS = D
    static MaritalStatusSingle = 'S';           // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'MARITAL_STATUS = S
    static MaritalStatusNotSpecify = 'N';       // MAS_CUST_CONFIG = CUST_CONFIG_NAME = 'MARITAL_STATUS = N
    static AccountStatusCodeActive = '1';
    static AccountStatusCodeOpenToday = '4';
}

@Injectable()
export class HWSocket {

    static EVENT = {
        EDC_DISCONNECT: "edc-disconnected",
        EDC_ERROR: "edc-error",
        SMART_CARD_DATA: "edc-sc-data",
        SMART_CARD_STATUS: "edc-sc-status",
        PIN_DATA: "edc-kb-data",
        PIN_STATUS: "edc-kb-status",
        FINGER_DATA: "fg-data",
        FINGER_STATUS: "fg-status",
        FINGER_ERROR: "fg-error",
        IMAGE_DATA: "img-data",
        IMAGE_ERROR: "img-error",
        CAMERA_ERROR: "cam-error",
        PRINT_STATUS: "print-status",
        PRINT_ERROR: "print-error",
        CONNECTION_ERROR: "connect_error",

        CAMERA: "camera",
        SNAPSHOTCAMERA: "snapshotDocument",
        FINGER_SCAN: "fingerScan",
        PRINTER: "printer",
        SMART_CARD: "smartcard",
        ATM_CARD: "smartcard",
        ENCRYPTION: "encryption"
    };

    static COMMAND = {
        SMART_CARD_REQUEST: "sendCommand",
        FINGER_SCAN_REQUEST: "sendCommand",
        FINGER_SCAN_CLOSE: "sendCommand",
        PIN_REQUEST: "sendCommand",
        MICR_SCAN_REQUEST: "sendCommand",
        PRINT_REQUEST: "sendCommand",
        PRINT_SLIP_REQUEST: "sendCommand",
        SEND_COMMAND: "sendCommand",
        PRINT_PDF_REQUEST: "sendCommand",
    };

    static REQUEST = {
        MICR: "{ \"cmd\" : \"snapshotCamera\", \"params\" : { \"process\" : \"micr\" }}",
        BARCODE: "{ \"cmd\" : \"snapshotCamera\", \"params\" : { \"process\" : \"barcode\" }}",
        PAPER_DETACT: "{ \"cmd\" : \"snapshotCamera\", \"params\" : { \"process\" : \"paper\" }}",
        // MICR: "{ \"cmd\" : \"cameraCaptureMICR\"}",
        // BARCODE: "{ \"cmd\" : \"cameraCaptureBarcode\"}",
        // PAPER_DETACT: "{ \"cmd\" : \"cameraCapturePapar\"}",
        // SMART_CARD: "{ \"cmd\" : \"smartcardGetIDCardThai\"}",
        ATM_UNION_PAY_CARD: "{ \"cmd\" : \"smartcardGetUnionPay\"}",
        SMART_CARD: "{ \"cmd\" : \"smartcardGetIDCardThaiDopa\"}",
        SMART_CARD_CLOSE: "{ \"cmd\" : \"smartcardForceClose\"}",
        MAGNETIC_READER: "{ \"cmd\" : \"magneticGetData\"}",
        ENCRYTION: "{\"cmd\" : \"encryptionATMPin\", \"params\" : {\"pin\" : \"{0}\"}} "
    };

    static HW_CODE = {
        CONNECTED: "0000",
        DISCONNECTED: "9999",
        EDC_READY: "0001",
        EDC_REQUESTING: "-1000"
    };

    static SMART_CARD_CODE = {
        SUCCESS: "0000",
        READING: "0002",
        FOUND_SMART_CARD: "0004",
        AID_ERROR: "9004",
        NO_CHIP: "9009",
        CHIP_ERROR: "9010",
        TIMEOUT: "9097"
    };

    static FINGER_SCAN_CODE = {
        SUCCESS: "0000",
        CONNECTED: "0001",
        PREPARE_CATURE: "0002",
        CAPTURED: "0003 ",
        NOT_CONNECT: "9001",
        TIMEOUT_EXPIRED: "9002",
        SPOOF_DETECTED: "9003",
        LENTEN_DETECTED: "9004"

    };

    static IMAGE_CODE = {
        SUCCESS: "0000"
    };

    static PRINT_CODE = {
        SUCCESS: "0000",
        DISCONNECT: "90000"
    };

    static PIN_CODE = {
        SUCCESS: "0000",
        USER_CANCEL: "9002",
        TIMEOUT: "9097",
        LENGTH_NOT_MATCH: "9100"
    };
}

@Injectable()
export class JSONKey {

    static ResponseStatus = "ResponseStatus";
    static ResponseCode = "ResponseCode";
    static ResponseMessage = "ResponseMessage";

    static Header = "Header";
    static HeaderAuthorization = "Authorization";
    static ReferenceNo = "ReferenceNo";
    static MachineId = "MachineId";
    static ReferenceExt = "ReferenceExt";
    static TransactionDateTime = "TransactionDateTime";
    static ServiceName = "ServiceName";
    static SystemCode = "SystemCode";
    static ChannelID = "ChannelID";

    static InquiryAccountList = "inquiryAccountList";
    static InquiryAccount = "inquiryAccount";
    static AccountNo = "ACCOUNT_NO";
    static Account_No = "account_no";
    static TD_Account_No = "td_account_no";
    static AccountName = "AccountName";
    static AccountType = "AccountType";
    static Amount = "amount";
    static ProductCode = "productCode";
    static ProductDesc = "ProductDesc";
    static BranchCode = "branch_code";
    static BranchName = "BranchName";
    static AccountOpenDate = "AccountOpenDate";
    static AccountStatusCode = "AccountStatusCode";
    static AccountStatusDesc = "AccountStatusDesc";
    static HoldAmt = "HoldAmt";
    static PrincipalBalance = "PrincipalBalance";
    static ODAmt = "ODAmt";
    static AvailBalance = "AvailBalance";
    static AvailBalanceNet = "AvailBalanceNet";
    static UnclearAmt = "UnclearAmt";
    static AccruIntAmt = "AccruIntAmt";
    static LastTxAmount = "LastTxAmount";
    static LastTxType = "LastTxType";
    static LastTxDate = "LastTxDate";
    static BenefitAcct = "BenefitAcct";

    static Username = "username";
    static Password = "password";

    static IDNo = "IDNo";
    static IDType = "IDType";
    static id_type = "id_type";
    static AccountNoFrom = "ACCOUNT_NO_FROM";
    static AccountNoTo = "account_no_to";
    static AccountNoReceiving = "ACCOUNT_NO_RECEIVING";
    static TransferAmount = "TRANSFER_AMOUNT";
    static EffectiveDate = "EFFECTIVE_DATE";
    static PayType = "PAY_TYPE";
    static ReceivingType = "RECEIVING_TYPE";
    static ReceivingValue1 = "RECEIVING_VALUE1";
    static ReceivingValue2 = "RECEIVING_VALUE2";
    static TransferType = "TRANSFER_TYPE";
    static FeeInfo = "FEE_INFO";
    static Sequence = "SEQUENCE";
    static FeeCode = "FEE_CODE";
    static FeeDetails = "FEE_DETAILS";
    static FeeAmount = "FEE_AMOUNT";
    static TransfereeFee = "TRANSFEREE_FEE";
    static Tax = "TAX";
    static Vat = "VAT";
    static fee = "fee_service_charge";
    static status = "status";
    static AccountNameFrom = "ACCOUNT_NAME_FROM";
    static AccountEngNameFrom = "ACCOUNT_ENG_NAME_FROM";
    static AccountNameReceiving = "ACCOUNT_NAME_RECEIVING";
    static AccountEngNameReceiving = "ACCOUNT_ENG_NAME_RECEIVING";
    static OttValue = "OTT_VALUE";

    static Term = "Term";
    static TransactionDate = "tran_date";
    static TermMonth = "termMonth";
    static TermDay = "termDay";
    static TermType = "termType";
    static Faequency = "Frequency";

    static BankCode = "BANK_CODE";
    static ReceivingBankCode = "RECEIVING_BANK_CODE";
    static PayTypeOfFee = "PayTypeOfFee";
    static CustomerType = "customer_type";
    static PromotionDate = "promotion_date";
    static CIF_NO = "cif_no";
    static CUS_CIF = "cust_cif";
    static CustomerSegment = "customer_segment";
    static PrincipleAmount = "principalAmt";
    static MaturityDate = "maturityDate";
    static FrequencyInterestPay = "freqInterestPay";
    static PromotionId = "promotion_id";
    static DepNO = "dep_no";
    static MobileNumber = "mobile_no";
    static ClientIP = "client_ip";
    static TokenUUID = "token_uuid";
    static OTP = "otp";
    static PIN = "pin";
}

@Injectable()
export class API {

    public static getMethodNew(api: string) {
        return Environment.domainNewApi + api;
    }
    public static getMethodNewMfs(api: string) {
        return Environment.domainNewApiMfs + api;
    }

    //Product
    public static ProductNeed = API.getMethodNew("getproductneed");
    public static ProductList = API.getMethodNew("getproductlist");
    public static ProductDetail = API.getMethodNew("getproductdetail");

    //transaction
    public static getstatementbyfunding = API.getMethodNew("getstatementbyfunding");
    public static GetConfigList = API.getMethodNew("GetConfigList");
    public static GetCustAddressListByValue = API.getMethodNew("GetCustAddressListByValue");
    public static GetPassbook = API.getMethodNew("GetPassbook");
    public static GetTDPassbook = API.getMethodNew("GetTDPassbook");
    public static Verifyidcard = API.getMethodNew("verifyidcard");
    public static GetMasterATM = API.getMethodNew("getmasteratm");
    public static GetTitleList = API.getMethodNew("GetTitleList");
    public static CheckTransactionAuthentication = API.getMethodNew("CheckAuthen");
    public static CheckEAccount = API.getMethodNew("checkeaccount");

    //Register
    public static CheckSanctionListAndKYCLevel = API.getMethodNew("checksanctionlistandkyclevel");
    public static CreateCustomerIndividual = API.getMethodNew("createcustomerindividual");
    public static SaveSubscription = API.getMethodNew("SaveSubscription");
    public static CreateMyPinByKKCisId = API.getMethodNew("createmypinbykkcisid");
    public static OpenCASAAcount = API.getMethodNew("opencasaaccount");
    public static OpenTDAcount = API.getMethodNew("opentdaccount");
    public static GetJobId = API.getMethodNew('getjobid');
    public static CheckKKAnyId = API.getMethodNew("checkkkanyid");
    public static RegisterAnyIdByAccount = API.getMethodNew("registeranyidbyaccount");
    public static GetCustomerAddress = API.getMethodNew("getcustomeraddress");
    public static GetSubscriptionForm = API.getMethodNew("getsubscriptionform");
    public static GetMasterAppForm = API.getMethodNew("getmasterappform");
    public static GetDummyAccountNo = API.getMethodNew("GetDummyAccountNo");
    public static GetSubscriptionInfo = API.getMethodNew("GetSubscriptionInfo");
    public static GetCustomerProfileSub = API.getMethodNew("getcustomerprofilesub");
    public static UpdateKYCLevel = API.getMethodNew("UpdateKYCLevel");
    public static UpdateCustomer = API.getMethodNew("UpdateCustomer");
    public static GetFATCAForm = API.getMethodNew("getfatcaform");

    //Fee
    public static GetTargetFee = API.getMethodNew("gettargetfee__v2");
    public static PayFeesFromCASA = API.getMethodNew("PayFeesFromCASA");
    public static PayFees = API.getMethodNew("PayFees");
    public static CheckTargetFee = API.getMethodNew("checktargetfee");

    //Cheque
    public static CheckCaStatus = API.getMethodNew('checkcastatus');
    public static CheckAvailableChqs = API.getMethodNew("checkavailablechq");
    public static CheckAvaliableChequeStock = API.getMethodNew("checkavaliablechequestock");
    public static CheckReceivingotherbankstatus = API.getMethodNew("checkreceivingotherbankstatus");

    //Mutualfund-account.service
    public static GetMutualfundAccountList = API.getMethodNewMfs("InquiryUnitholderID");
    public static GetOutstandingList = API.getMethodNewMfs("InquiryOutstanding");
    public static InquiryTransactionHistory = API.getMethodNewMfs("InquiryTransactionHistory");
    public static CancelOrder = API.getMethodNewMfs("CancelOrder");
    public static InquiryUnitHolderByFund = API.getMethodNewMfs("InquiryUnitHolderByFund");
    public static CheckVIBConsentByCif = API.getMethodNewMfs("CheckVIBConsentByCif");
    public static SaveVIBConsent = API.getMethodNewMfs("SaveVIBConsent");

    //Transfer
    public static GetAccountListsByIDCard = API.getMethodNew("getaccountlistbyidcard");
    public static AccountDetails = API.getMethodNew("getcasaaccountdetailbyaccountno");
    public static AccountTDDetails = API.getMethodNew("gettdaccountdetailbyaccountno");
    public static CheckTransferAmount = API.getMethodNew("checktransferamount");

    public static GetTDTermList = API.getMethodNew("gettermdepositlist");
    public static GetTDTerm = API.getMethodNew("gettdterm");
    public static GetTDTermByDepNo = API.getMethodNew("gettdprematureredeemtion");
    public static GetTDPayoutFrequency = API.getMethodNew("gettdpayoutfrequency");
    public static GetPromotionList = API.getMethodNew("getpromotionlist");
    public static GetMaturityDate = API.getMethodNew("getmaturitydate");
    public static GetTDInterestRate = API.getMethodNew("gettdrate");
    public static GetPromotionRate = API.getMethodNew("getpromotionrate");
    public static GetPromptPayForm = API.getMethodNew('getpromptpayform');

    //Transfer
    public static FundTransferAnyIDs = API.getMethodNew("transferfund");
    public static TransferCASAtoTDFund = API.getMethodNew("transfercasatotdfund");
    public static TransferTDtoCASAFund = API.getMethodNew("transfertdtocasafund");
    public static TransferTDtoTDFund = API.getMethodNew("transfertdtotdfund");
    public static ValidateTransfer = API.getMethodNew("validatetransfer");
    public static getdatenow = API.getMethodNew("getdatenow");

    public static GenerateOTP = API.getMethodNew("generateotp");
    public static VerifyOTP = API.getMethodNew("verifyotp");

    public static PayTDFee = API.getMethodNew("payTDFee");

    public static GetMasterBank = API.getMethodNew("getmasterbank");

    // Withdraw
    public static withdrawCAToCash = API.getMethodNew("withdrawalcatocash");
    public static withdrawSAToCash = API.getMethodNew("withdrawalsatocash");
    public static withdrawTDToCash = API.getMethodNew("withdrawaltdtocash");
    public static withdrawalCAToCashWithChq = API.getMethodNew("withdrawalcatocashwithchq");
    public static withdrawalCAToCashWithOutChq = API.getMethodNew("withdrawalcatocashwithoutchq");
    public static withdrawSAToCheque = API.getMethodNew("withdrawalsatocheque");
    public static withdrawTDToCheque = API.getMethodNew("withdrawaltdtocheque");
    public static withdrawalCAToChequeWithChq = API.getMethodNew("withdrawalcatochequewithchq");
    public static withdrawalCAToChequeWithOutChq = API.getMethodNew("withdrawalcatochequewithoutchq");
    //v2
    public static withdrawalCAToCashWithOutChq2 = API.getMethodNew("withdrawalcatocashwithoutchq__v2");
    public static withdrawalCAToCashWithChq2 = API.getMethodNew("withdrawalcatocashwithchq__v2");
    public static withdrawSAToCash2 = API.getMethodNew("withdrawalsatocash__v2");
    public static withdrawTDToCash2 = API.getMethodNew("withdrawaltdtocash__v2");
    public static withdrawalCAToChequeWithChq2 = API.getMethodNew("withdrawalcatochequewithchq__v2");
    public static withdrawalCAToChequeWithOutChq2 = API.getMethodNew("withdrawalcatochequewithoutchq__v2");
    public static withdrawSAToCheque2 = API.getMethodNew("withdrawalsatocheque__v2");
    public static withdrawTDToCheque2 = API.getMethodNew("withdrawaltdtocheque__v2");

    // Deposit
    public static CheckReceivingOtherBankStatus = API.getMethodNew("CheckReceivingOtherBankStatues");
    public static DepositChqtoCASA = API.getMethodNew("depositchqtocasa");
    public static DepositChqtoTD = API.getMethodNew("depositchqtotd");
    public static DepositCashtoCASA = API.getMethodNew("depositcashtocasa");
    public static DepositCashtoTD = API.getMethodNew("depositcashtotd__v2");
    public static TransferFund = API.getMethodNew("transferfund");
    //v2
    public static DepositCashtoCASA2 = API.getMethodNew("depositcashtocasa__v2");
    public static DepositCurrentChqtoCASA = API.getMethodNew("depositcurrentchqtocasa");
    public static DepositCurrentChqtoTD = API.getMethodNew("depositcurrentchqtotd");
    public static DepositCashierChqtoCASA = API.getMethodNew("depositcashierchqtocasa");
    public static DepositCashiercChqtoTD = API.getMethodNew("depositcashierchqtotd");
    //Buy
    public static BuyCashierChqByCash = API.getMethodNew("buycashierchqbycash");

    // Login
    public static LoginByIdcardAndmyPinWithProfile = API.getMethodNew("loginbyidcardandmypinwithprofile");
    public static LoginByUsernameWithProfile = API.getMethodNew("loginbyusernamewithprofile");
    public static LoginByUsername = API.getMethodNew("loginbyusername");
    public static LoginByATMAndPIN = API.getMethodNew("loginbyatmnoandatmpin");

    public static CheckExistingCustomerAndSanctionList = API.getMethodNew("CheckCustomer");
    public static GetProfileMain = API.getMethodNew("getcustomerprofilemain");
    public static GetProfile = API.getMethodNew("getcustomerprofile");
    public static CheckInternetBankingAndPin = API.getMethodNew("checkinternetbankingivrmypin");

    // open account
    public static CreateApproveList = API.getMethodNew("CreateApproveList");
    public static InquiryApproveList = API.getMethodNew("InquiryApproveList");

    // TellerAuthen
    public static CheckTellerAuthen = API.getMethodNew("CheckTellerAuthen");

    // Bill/Re Pay
    // public static GetConfigList = API.getMethodNew("GetConfigList");
    public static PaymentAndUpdateStatus = API.getMethodNew("PaymentAndUpdateStatus");
    public static ResendMachineOtt = API.getMethodNew("ResendTokenOTT");

    // Investment
    public static InquiryUtilityConfig = API.getMethodNewMfs("InquiryUtilityConfig")
    public static GetInquiryCurrentCustSuitScore = API.getMethodNewMfs("InquiryCurrentCustSuitScore")
    public static GetInquirySuitabiltyQuestion = API.getMethodNewMfs("InquirySuitabiltyQuestion")
    public static SubmitSuitAnswer = API.getMethodNewMfs("SubmitSuitabilityAnswer")
    public static GetGUID = API.getMethodNew("GetGUID")
    public static GetSuitScore = API.getMethodNew("getsuitscore")
    public static GetSuitAnswer = API.getMethodNew("getsuitanswer")
    public static GetPortDetail = API.getMethodNew("GetPortDetail")
    public static GetPortSummary = API.getMethodNew("GetPortSummary")
    public static GetFundFactByFundCode = API.getMethodNew("GetFundFactByFundCode")
    public static GetPortTransaction = API.getMethodNew("GetPortTransaction")
    public static GetOrderStatus = API.getMethodNew("GetOrderStatus")
    public static GetFundList = API.getMethodNew("GetFundList")
    public static GetHolderList = API.getMethodNew("GetHolderList")
    public static GetFundSuitAndExchange = API.getMethodNew("GetFundSuitAndExchange")
    public static GetTransactionEffectiveDate = API.getMethodNew("GetTransactionEffectiveDate")
    public static InsertOrderBuyAndPrePayment = API.getMethodNew("InsertOrderBuyAndPrePayment")
    public static InsertOrderSell = API.getMethodNew("InsertOrderSell")
    public static InsertOrderSwitch = API.getMethodNew("InsertOrderSwitch")
    public static InquiryPrepayment = API.getMethodNew("getprepayment")
    public static UpdateStatusPayment = API.getMethodNew("")
    public static UpdateOrderCancel = API.getMethodNew("UpdateOrderCancel")
    public static CheckUnConsentByIDCard = API.getMethodNewMfs("CheckUnConsentByIDCard")
    ///////////////
    public static Getotp = API.getMethodNew("getotpdev");

    // FUND MANAGEMENT
    public static GET_FUND_LIST = API.getMethodNewMfs("InquiryFundList")
    public static GET_FUND_CONDITION = API.getMethodNewMfs("InquiryFundCondition")
    public static GET_PREPARE_ORDER = API.getMethodNewMfs("PrepareOrder")
    public static CONFIRM_ORDER = API.getMethodNewMfs("ConfirmOrder")
    ///////////////
    constructor() {
    }
}
