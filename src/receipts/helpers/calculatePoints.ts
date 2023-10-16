import { CreateReceiptDto } from "../dto/create-receipt.dto";


export const calculatePoints = (receipt: CreateReceiptDto): number => {
    let totalPoints = 0;

    // Rule 1: One point for every alphanumeric character in the retailer name.
    totalPoints += receipt.retailer.replace(/[^a-zA-Z0-9]/g, '').length;

    // Rule 2: 50 points if the total is a round dollar amount with no cents.
    const totalAmount = parseFloat(receipt.total);
    if (totalAmount === Math.floor(totalAmount)) totalPoints += 50;

    // Rule 3: 25 points if the total is a multiple of 0.25.
    if (totalAmount % 0.25 === 0) totalPoints += 25;

    // Rule 4: 5 points for every two items on the receipt.
    const totalItems = receipt.items.length;
    totalPoints += Math.floor(totalItems / 2) * 5;

    // Rule 5: If the trimmed length of the item description is a multiple of 3,
    // multiply the price by 0.2 and round up to the nearest integer.
    receipt.items.forEach((item) => {
        if (item.shortDescription.trim().length % 3 === 0) {
            const itemPrice = parseFloat(item.price);
            const points = Math.ceil(itemPrice * 0.2);
            totalPoints += points;
        }
    });

    // Rule 6: 6 points if the day in the purchase date is odd.
    const purchaseDateParts = receipt.purchaseDate.split('-');
    const day = parseInt(purchaseDateParts[2]);
    if (day % 2 !== 0) {
        totalPoints += 6;
    }

    // Rule 7: 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    if (hourBetween14And16(receipt.purchaseTime)) {
        totalPoints += 10;
    }

    return totalPoints;
}

const hourBetween14And16 = (purchaseTime:string): boolean => {
    const [hour, minutes] = purchaseTime.split(':');
    const timeToEval = new Date();
    timeToEval.setHours(parseInt(hour, 10), parseInt(minutes, 10), 0);

    const startHourRange = new Date();
    startHourRange.setHours(14, 0, 0);

    const endHourRange = new Date();
    endHourRange.setHours(16, 0, 0);

    return timeToEval >= startHourRange && timeToEval <= endHourRange;
}