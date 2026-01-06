export const sectionRoutes = {
    'Overview': '/wallet',
    'Deposit': '/wallet/deposit',
    'Withdraw': '/wallet/withdraw',
    'Bank Account': '/wallet/bank-accounts',
    'Crypto Wallet': '/wallet/crypto-wallets',
    'Transactions': '/transactions',
    'Checkouts': '/gate/checkouts',
    'Recipient': '/gps/recipients',
    'Send Money': '/gps/transactions/create',
    'Create Checkout': '/gate/checkouts/create',
    'Organization': '/organization',
    'Team Members': '/organization/team-members',
    'API Keys': '/organization/api-keys',
    'Webhooks': '/organization/webhooks',
    'Settings': '/settings'
} as const;

export type sectionNameRoutes = keyof typeof sectionRoutes;