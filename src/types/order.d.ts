declare interface CreateOrderI {
  hasProducts?: boolean;
  des_Adress: Adress;
  product_desc?: string;
  note?: string;
  order_platform: string;
  isStopDesk?: boolean;
  stopdesk_id?:number;
  phone: string;
  firstName?: string;
  lastName?: string;
  phone2?: string;
  items: OrderItemI[];
  freeshipping?: boolean;
  // status?: OrderStatus;
  // delivery?: string;
  // customer?: any;
}

declare interface OrderItemI {
  itemProductRef: any;
  itemVariantRef?: any;
  qte?: number;
}
