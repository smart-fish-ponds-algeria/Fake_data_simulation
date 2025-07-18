declare interface ProductI {
    name: string;
    description: string;
    hasInsurance: boolean;
    declaredValue: number;
    store: any;
    mainOption?: ProductOptionI;
    productOptions: ProductOptionI[];
    variants: ProductVariantI[];
    qte?: number;
    price?: number;
    width?: number;
    height?: number;
    on_sale?:boolean,
    weight?: number;
    stock_status?:string ;// values are instock, outofstock, onbackorder. Default is instock
    purchasable?:boolean;
    volume?: number;
    fragile?: false;
    openable?: false;
    tryable?: false;
    
    totalOrdered: number;
    isTrash?: boolean;
    category: string[];
    agency?: string;
    shopifyId?: string;
    maystroId?:string
    woocommerceId?:number;
    YoucanId?:string;
    adsIds?:string[]
  }
  
  declare type ProductWithoutStoreAndVariants = Omit<
    ProductI,
    "store" | "variants" | "mainOption"
  >;
  
  declare interface ValueItemI {
    value: string;
    price: number;
    qte: number;
    reference?: number;
    insuranceReference?: number;
  }
  declare interface ProductOptionI {
    name: string;
    isMainOption: boolean;
    values?: ValueItemI[];
    valuesString?: string[];
  }
  
  declare interface VariantOptionI {
    name: string;
    value: string;
  }
  declare interface ProductVariantI {
    _id: any;
    qte: number;
    name: string;
    price: number;
    options: VariantOptionI[];
    mainOption: VariantOptionI;
    width: number;
    height: number;
    weight: number;
    totalVariantOrdered: number;
    reference?: string;
    insuranceReference?: string;
  }
  