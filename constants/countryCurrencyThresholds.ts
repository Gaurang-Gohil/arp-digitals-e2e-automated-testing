const CountryCurrencyThresholds: CountryCurrencyThresholds[] = [
  {
    country: "India",
    SLA: 500,
    recipient: "Harbor",
    currencies: [
      {
        symbol: "USD",
        value: 6
      },
      {
        symbol: "AED",
        value: 24
      },
      {
        symbol: "BHD",
        value: 3
      },
      {
        symbol: "SAR",
        value: 24
      },
      {
        symbol: "USDT",
        value: 6
      },
      {
        symbol: "USDC",
        value: 6
      }
    ]
  },
  {
    country: "Philippines",
    SLA: 100,
    recipient: "Liwayway",
    currencies: [
      {
        symbol: "USD",
        value: 2
      },
      {
        symbol: "AED",
        value: 8
      },
      {
        symbol: "BHD",
        value: 1
      },
      {
        symbol: "SAR",
        value: 8
      },
      {
        symbol: "USDT",
        value: 2
      },
      {
        symbol: "USDC",
        value: 2
      }
    ]
  },
  {
    country: "United Arab Emirates",
    SLA: 0,
    recipient: "Mujadid Mulla",
    currencies: [
      {
        symbol: "USDT",
        value: 0.5
      },
      {
        symbol: "USDC",
        value: 0.5
      }
    ]
  },
  {
    country: "Saudi Arabia",
    SLA: 0,
    recipient: "Rania",
    currencies: [
      {
        symbol: "USDT",
        value: 0.5
      },
      {
        symbol: "USDC",
        value: 0.5
      }
    ]
  }
]

export interface CountryCurrencyThresholds {
  country: string,
  SLA: Number,
  recipient: string,
  currencies: Currency[]
}

export interface Currency {
  symbol: CurrencySymbol,
  value: Number,
}

export type CurrencySymbol = "USD" | "USDC" | "USDT" | "BHD" | "AED" | "SAR" | "PHP"

export default CountryCurrencyThresholds;