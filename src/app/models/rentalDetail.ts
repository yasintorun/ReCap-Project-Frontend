export interface RentalDetail {
    id: number
    carName: string
    customerName: string
    rentDate: Date
    returnDate: Date | null | undefined
}