import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { Receipt } from './entities/receipt.entity';
import { calculatePoints } from './helpers/calculatePoints';

@Injectable()
export class ReceiptsService {

  private receipts: Receipt[] = []

  create(createReceiptDto: CreateReceiptDto) {
    const points: number = calculatePoints(createReceiptDto);
    const receipt: Receipt = {
      id: uuid(),
      points
    }
    this.receipts.push(receipt);
    return { id: receipt.id };
  }

  findOne(id: string) {
    const receipt = this.receipts.find(receipt => receipt.id === id);
    if (!receipt) return 'Receipt not found id: ' + id;
    return {points:receipt.points};
  }
  findAll() {
    return this.receipts;
  }

}
