import { Type } from "class-transformer";
import { IsArray, IsDateString, IsMilitaryTime, IsNumberString, IsString, MinLength, ValidateNested } from "class-validator";

export class CreateReceiptDto {
    @IsString()
    @MinLength(1)
    retailer: string

    @IsDateString()
    purchaseDate: string

    @IsMilitaryTime()
    purchaseTime: string

    @IsNumberString()
    total: string

    @IsArray()
    @ValidateNested({each:true})
    @Type(()=>ItemDto)
    items: ItemDto[]
}

class ItemDto {
    @IsString()
    shortDescription: string;

    @IsNumberString()
    price: string;
}



// {
//     "retailer": "Walgreens",
//     "purchaseDate": "2022-01-02",
//     "purchaseTime": "08:13",
//     "total": "2.65",
//     "items": [
//         {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
//         {"shortDescription": "Dasani", "price": "1.40"}
//     ]
// }