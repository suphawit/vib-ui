import { PaymentType, Transaction } from "./transaction";
import { isNullOrUndefined } from "util";
import { environment } from "../../../environments/environment"

export class Product extends Transaction {

    domainAPI: string = environment.domainNewApi;
    flg_psbook: string;
    PROD_CODE: string;
    PROD_DESC: string;
    PROD_TYPE: string;
    PROD_TYPE_DESC: string;

    prod_title_TH: string;
    prod_title_EN: string;
    special = new ProductSpecial();
    productList = new ProductList();
    prod = new MyProduct();
}

export class MyProduct {
    product1: any;
    product2: any;
    product3: any;
    product4: any;
    prod_New: any;
    prod_type1: string = "";
    prod_type2: string = "";
    prod_type3: string = "";
    prod_type4: string = "";
}

export class ProductSpecial {
    sp_1: any;
    sp_2: any;
    sp_3: any;
    sp_4: any;
}

export class ProductList {
    data1: any;
    data2: any;
    data3: any;
    data4: any;
}