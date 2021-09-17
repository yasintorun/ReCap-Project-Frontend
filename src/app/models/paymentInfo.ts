import { CreditCard } from './creditCard';
export class Payment {
    userId: number
    carId?: number
    creditCard?: CreditCard
}


export const PaymentInfo: Payment = {
    userId: 3, //TODO: dinamik yap
}
