# Security Specification for Dhanraj-Games Admin & User App

## 1. Data Invariants
1. **User Wallets (`/users/{userId}`)**:
   - Only admins or the authenticated owner can read their balance.
   - Wallets cannot be modified arbitrarily by players; balance increases require an approved deposit or winning bet.
   - Admin email `dn128278@gmail.com` has administrator privileges.

2. **Deposit Requests (`/deposit_requests/{depositId}`)**:
   - Created by signed-in users with a valid 12-digit UTR and deposit amount > 0.
   - Status transitions strictly from `pending` -> `approved` or `pending` -> `rejected`.
   - Once in a terminal state (`approved` or `rejected`), the status is immutable except by an admin.
   - Only admins can approve or reject deposits.

3. **Markets & Results (`/markets/{marketId}`)**:
   - Publicly readable so that all user apps get live timing and declared results without delay.
   - Write/Update restricted strictly to authenticated administrators.
   - Panna must be 3 digits (or empty) and single Ank must be 1 digit (0-9).

4. **Transactions Ledger (`/transactions/{txnId}`)**:
   - Immutable once written.
   - Only admins can write administrative credit transactions; users can view their own transactions.

## 2. Attack Vectors & Mitigations
- **UTR Spoofing**: Deposit requests enforce minimum and maximum length on UTR numbers (12-16 characters) and prevent client from self-approving.
- **Wallet Tampering**: Client cannot alter their own `walletBalance` field directly; only admin operations update wallet balances.
- **Timing / Market Poisoning**: Non-admins cannot alter market opening/closing times or declare fake results.
