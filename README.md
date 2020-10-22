# Paypr Contracts SDK for JavaScript and Typescript

The Paypr Contracts SDK for JavaScript and Typescript is a simple client that
can be used to manipulate contracts based on Paypr within the Ethereum network.

See [https://paypr.money/](https://paypr.money/) for more details about Paypr.

## Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Documentation](docs/index.md)
4. [Contributing](CONTRIBUTING.md)

## Installation

```
$ npm install @paypr/contracts-sdk-ts
```

## Usage

### Getting access to the SDK

`@paypr/contracts-sdk-ts` exposes the `getSdk` function to get access to the
Contracts SDK.

To get the SDK, make sure that your API key is in the `PAYPR_API_KEY`
environment variable:

```javascript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk();

// access the SDK functionality with sdk
```

Alternatively, pass your API key via the options:

```javascript
import { getSdk } from '@paypr/contracts-sdk-ts/dist';

const sdk = getSdk({ apiKey: 'your-api-key-goes-here' });

// access the SDK functionality with sdk
```

### Executing functions

All the functionality is available as async functions on the API.

For example, to create a player, use the following:

```typescript
const submissionId: string = await sdk.players.createPlayer({ name: 'Tom Jones' });

const submission: SubmissionDetails = await sdk.submissions.waitForSubmissionDone(submissionId);

const player: PlayerReference = submission.player;

console.log('Player:', player.name);
```

## Functionality

See [Documentation](docs/index.md) for SDK documentation.

## Contributing

See [Contributing](CONTRIBUTING.md) for more details about how to build
and test the software to help contribute.

## License

[MIT](LICENSE)
