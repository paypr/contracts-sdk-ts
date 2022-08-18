# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/paypr/contracts-sdk-ts/compare/v0.5.2...v1.0.0) (2022-08-18)

### Bug Fixes

- **deps:** update dependency graphql-request to v4 ([0b11ef3](https://github.com/paypr/contracts-sdk-ts/commit/0b11ef392452c0d31ba8d6d10392189c3a96f304))

### [0.5.2](https://github.com/paypr/contracts-sdk-ts/compare/v0.5.1...v0.5.2) (2021-12-08)

### Bug Fixes

- **deps:** update dependency graphql-request to v3 ([f5c3be2](https://github.com/paypr/contracts-sdk-ts/commit/f5c3be24c83ea80520116c2b0f416e76c919217e))

### [0.5.1](https://github.com/paypr/contracts-sdk-ts/compare/v0.5.0...v0.5.1) (2021-11-06)

### Bug Fixes

- [[#45](https://github.com/paypr/contracts-sdk-ts/issues/45)] better handling of transaction request for createPlayer ([865a095](https://github.com/paypr/contracts-sdk-ts/commit/865a0958eac5ea93f9d3c785637a466bfe4fae5e))

## [0.5.0](https://github.com/paypr/contracts-sdk-ts/compare/v0.4.3...v0.5.0) (2021-11-05)

### ⚠ BREAKING CHANGES

- removed old transaction functions

### Features

- [[#45](https://github.com/paypr/contracts-sdk-ts/issues/45)] converted to using generic transactions where possible ([1a7c553](https://github.com/paypr/contracts-sdk-ts/commit/1a7c553c5d753b7ee773d12a2fdfea75a8e2d3bf))

### [0.4.3](https://github.com/paypr/contracts-sdk-ts/compare/v0.4.2...v0.4.3) (2021-10-22)

### Bug Fixes

- [[#27](https://github.com/paypr/contracts-sdk-ts/issues/27)] removed paypr estimate details when transferring consumable to contracts and players ([a3f3114](https://github.com/paypr/contracts-sdk-ts/commit/a3f31147dee87152b646360b2c6985492e589fda))

### [0.4.2](https://github.com/paypr/contracts-sdk-ts/compare/v0.4.1...v0.4.2) (2020-10-22)

### [0.4.1](https://github.com/paypr/contracts-sdk-ts/compare/v0.4.0...v0.4.1) (2020-10-17)

### Features

- [[#20](https://github.com/paypr/contracts-sdk-ts/issues/20)] add ability to mint consumables for players and contracts ([99a51a4](https://github.com/paypr/contracts-sdk-ts/commit/99a51a45f99b1c47a3c8bd10ee5af38d6a32e650))

## [0.4.0](https://github.com/paypr/contracts-sdk-ts/compare/v0.3.4...v0.4.0) (2020-09-24)

### ⚠ BREAKING CHANGES

- `exchangeRate` has been split into `purchasePriceExchangeRate` and `intrinsicValueExchangeRate`

### Bug Fixes

- [[#18](https://github.com/paypr/contracts-sdk-ts/issues/18)] update GraphQL schema after asymmetrical exchange rate changes ([330de59](https://github.com/paypr/contracts-sdk-ts/commit/330de59c3817b696b1332818eb421b65f45ec505))

### [0.3.4](https://github.com/paypr/contracts-sdk-ts/compare/v0.3.3...v0.3.4) (2020-09-21)

### [0.3.3](https://github.com/paypr/contracts-sdk-ts/compare/v0.3.2...v0.3.3) (2020-08-29)

### Features

- [[#14](https://github.com/paypr/contracts-sdk-ts/issues/14)] add getItemDetails to contract ([421e2ba](https://github.com/paypr/contracts-sdk-ts/commit/421e2ba303ae8a48325754276c1777b99b862663))

### [0.3.2](https://github.com/paypr/contracts-sdk-ts/compare/v0.3.1...v0.3.2) (2020-08-29)

### Features

- [[#14](https://github.com/paypr/contracts-sdk-ts/issues/14)] add getPayprBalance for contract, player and account ([a8209ef](https://github.com/paypr/contracts-sdk-ts/commit/a8209ef38bf1aa23f862e714f5302eae90390dc7))

### [0.3.1](https://github.com/paypr/contracts-sdk-ts/compare/v0.3.0...v0.3.1) (2020-08-28)

### Features

- [[#14](https://github.com/paypr/contracts-sdk-ts/issues/14)] add artifact actions and info ([df8bbf4](https://github.com/paypr/contracts-sdk-ts/commit/df8bbf4ccc8ccc496c2b86643635032dfdfb6c6c))

## [0.3.0](https://github.com/paypr/contracts-sdk-ts/compare/v0.2.2...v0.3.0) (2020-08-16)

### ⚠ BREAKING CHANGES

- playerConsumableBalance was renamed to consumableBalance

### Features

- [[#12](https://github.com/paypr/contracts-sdk-ts/issues/12)] add ability to execute an activity for a player ([9984d3b](https://github.com/paypr/contracts-sdk-ts/commit/9984d3b7a50f96bfe27c53759f9c16cea20db7b7))

* [[#12](https://github.com/paypr/contracts-sdk-ts/issues/12)] fix docs for playerConsumableBalance rename ([c9b257d](https://github.com/paypr/contracts-sdk-ts/commit/c9b257de81e661facce7f86d1b2b56f476feeba9))

### [0.2.2](https://github.com/paypr/contracts-sdk-ts/compare/v0.2.1...v0.2.2) (2020-07-28)

### Features

- [[#6](https://github.com/paypr/contracts-sdk-ts/issues/6)] add ability to transfer consumable from contracts ([29b104d](https://github.com/paypr/contracts-sdk-ts/commit/29b104d01aaee049bae699f08d75499a51a6b798))

### [0.2.1](https://github.com/paypr/contracts-sdk-ts/compare/v0.2.0...v0.2.1) (2020-07-27)

### Features

- [[#9](https://github.com/paypr/contracts-sdk-ts/issues/9)] add ability to upgrade a player ([136eb5f](https://github.com/paypr/contracts-sdk-ts/commit/136eb5fc18d2a82b92c89b1f336ebf33fc6ebc0b))

## [0.2.0](https://github.com/paypr/contracts-sdk-ts/compare/v0.1.0...v0.2.0) (2020-07-23)

### ⚠ BREAKING CHANGES

- renamed `players.acquireNextSkillLevel`

### Features

- [[#6](https://github.com/paypr/contracts-sdk-ts/issues/6)] rename acquireNextSkillLevel to remove redundant forPlayer ([5ead02f](https://github.com/paypr/contracts-sdk-ts/commit/5ead02fc59dffbc5f9ae59f2b32d889cfebcc659))
- [[#6](https://github.com/paypr/contracts-sdk-ts/issues/6)] update tsconfig to avoid duplicating graphql tags ([3ad9e12](https://github.com/paypr/contracts-sdk-ts/commit/3ad9e1291a7e8fe0f04dd74fd773c88f3a653e44))

## [0.1.0](https://github.com/paypr/contracts-sdk-ts/compare/v0.0.3...v0.1.0) (2020-07-23)

### ⚠ BREAKING CHANGES

- refactored SDK to break up the functionality
  by type being manipulated.

### Features

- [[#6](https://github.com/paypr/contracts-sdk-ts/issues/6)] added ability to acquire the next skill level for a player ([be8aeb0](https://github.com/paypr/contracts-sdk-ts/commit/be8aeb0d5418785c2c8933843f9813365f7b8270))
- [[#6](https://github.com/paypr/contracts-sdk-ts/issues/6)] added estimates for actions ([88f2170](https://github.com/paypr/contracts-sdk-ts/commit/88f2170d095e824a3f8c3efe447c1f24acf57781))
- [[#6](https://github.com/paypr/contracts-sdk-ts/issues/6)] added skill level to player sdk ([d17e524](https://github.com/paypr/contracts-sdk-ts/commit/d17e5245609fe6c0a5e9b325a7d04139f7b4a9cf))

### [0.0.3](https://github.com/paypr/contracts-sdk-ts/compare/v0.0.2...v0.0.3) (2020-07-19)

### Features

- [[#4](https://github.com/paypr/contracts-sdk-ts/issues/4)] added consumable transfers and info ([e4d6b60](https://github.com/paypr/contracts-sdk-ts/commit/e4d6b60d4a4b681dee07d74ad9baac2d33cf541b))

### [0.0.2](https://github.com/paypr/contracts-sdk-ts/compare/v0.0.1...v0.0.2) (2020-07-12)

### 0.0.1 (2020-07-12)

### Features

- [[#1](https://github.com/paypr/contracts-sdk-ts/issues/1)] added create and load player, plus submissions queries ([4c87997](https://github.com/paypr/contracts-sdk-ts/commit/4c8799712e6fa9c68d444ee9a2a930370fabad43))
