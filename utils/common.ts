export function getRandomNumber(min: number, max: number) {
    // Use Math.ceil for min and Math.floor for max to ensure inclusive integers
    min = Math.ceil(min);
    max = Math.floor(max);

    // The formula for a range:
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

import { uniqueNamesGenerator, Config, adjectives, colors, animals} from 'unique-names-generator';
export function getRandomName() {
    const customConfig: Config = {
        dictionaries: [adjectives, colors, animals],
        separator: ' '
    };

    const shortName: string = uniqueNamesGenerator(customConfig);
    return shortName;
}

import { randomBytes } from 'node:crypto';
export const generateRandomString = (length: number): string => {
    return randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
};
