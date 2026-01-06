import { generateRandomString, getRandomName, getRandomNumber } from "../utils/common";

export default function generateBankDetails() {
    let bankDetails: AccountDetails[] = [];

    const currencyList: CountryList[] = ["BHD", "SAR", "AED", "USD"]
    const countryCodeList = ["ARE", "BHR", "SAU", "USA"]

    for (const currency of currencyList) {
        let bankDetail: AccountDetails = {
            currency: currency,
            countryCode: countryCodeList[getRandomNumber(0,countryCodeList.length)],
            accountNumber: getRandomNumber(1000000000,  99999999999),
            beneficiaryName: getRandomName(),
            bankName: getRandomName(),
            swift_bic: generateRandomString(10),
            iban: generateRandomIban(currency)
        }
        bankDetails.push(
            bankDetail
        )
    }
    return bankDetails;
}

export interface AccountDetails {
    currency: CountryList,
    countryCode: string,
    beneficiaryName: string,
    bankName: string,
    accountNumber: number,
    swift_bic: string,
    iban: string
}

export type CountryList = "BHD" | "SAR" | "AED" | "USD" 


const generateRandomIban = (country: CountryList) =>{    
    const firstLetters = country.slice(0,2);
    return `${firstLetters}${getRandomNumber(1007199254740980,9007199254740991)}${getRandomNumber(1007199254740980,9007199254740991)}`
}
