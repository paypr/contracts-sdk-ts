# Paypr Contracts SDK for JavaScript and Typescript

The Paypr Contracts SDK for JavaScript and Typescript is a simple client that
can be used to manipulate contracts based on Paypr within the Ethereum network.

See [https://paypr.money/](https://paypr.money/) for more details about Paypr.

## Installation

```
$ npm install @paypr/contracts-sdk-ts
```

## Usage

### Getting access to the SDK

`@paypr/contracts-sdk-ts` exposes the `getContractsSdk` function to get
the Contracts SDK.

To get the SDK, make sure that your API key is in the `PAYPR_API_KEY`
environment variable:

```javascript
import { getContractsSdk } from '@paypr/contracts-sdk-ts/dist';

const contractsSdk = getContractsSdk();

// access the SDK functionality
```

Alternatively, pass your API key via the options:

```javascript
import { getContractsSdk } from '@paypr/contracts-sdk-ts/dist';

const contractsSdk = getContractsSdk({ apiKey: 'your-api-key-goes-here' });

// access the SDK functionality
```

### Executing functions

All of the functionality is available as async functions on the API.

For example, to create a player, use the following:

```javascript
const submissionId = await createPlayer({ name: 'Tom Smith' });

const player = await waitForSubmissionDone(submissionId);

console.log('Player:', player.name);
```

## Contributing

See [Contributing](CONTRIBUTING.md) for more details about how to build
and test the software to help contribute.

## License

UNLICENSED
