declare namespace Types {
	interface ObjectId {
		toString(): string;
		equals(id: string | ObjectId): boolean;
	}
}


declare interface DateIntervalQuery {
	startDate?: string | number | Date;
	endDate?: string | number | Date;
}


declare interface DateInterval {
	startDate: Date;
	endDate: Date;
}

declare interface Adress{
	commune: string
	code_postal:string 
	full_adress:string
	wilaya_code:number
	wilaya:string
}
