import { generateRandomString, getRandomName, getRandomNumber } from "../utils/common";

const currencyPair: CurrencyPair[] = [
    { currency: "BHD", countryCode: "BHR" },
    { currency: "AED", countryCode: "ARE" },
    { currency: "SAR", countryCode: "SAU" },
    { currency: "USD", countryCode: "USA" },
]
export default function generateBankDetails() {
    let bankDetails: AccountDetails[] = [];

    for (const currency of currencyPair) {
        let bankDetail: AccountDetails = {
            currency: currency.currency,
            countryCode: currencyPair[getRandomNumber(0, currencyPair.length)].countryCode,
            accountNumber: getRandomNumber(1000000000, 99999999999),
            beneficiaryName: getRandomName(),
            bankName: getRandomName(),
            swift_bic: generateRandomString(10),
            iban: generateRandomIban(currency.currency)
        }
        bankDetails.push(
            bankDetail
        )
    }
    return bankDetails;
}

export interface AccountDetails {
    currency: CurrencyList,
    countryCode: string,
    beneficiaryName: string,
    bankName: string,
    accountNumber: number,
    swift_bic: string,
    iban: string
}

export interface CurrencyPair {
    currency: CurrencyList,
    countryCode: CountryList
}

export type CurrencyList = "BHD" | "SAR" | "AED" | "USD"
export type CountryList = "ARE" | "BHR" | "SAU" | "USA"


const generateRandomIban = (country: CurrencyList) => {
    const firstLetters = country.slice(0, 2);
    return `${firstLetters}${getRandomNumber(1007199254740980, 9007199254740991)}${getRandomNumber(1007199254740980, 9007199254740991)}`
}
