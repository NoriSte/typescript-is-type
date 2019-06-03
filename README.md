# typescript-is-type
A TypeScript-safe runtime type check function

[![Build Status](https://travis-ci.com/NoriSte/typescript-is-type.svg?branch=master)](https://travis-ci.com/NoriSte/typescript-is-type)
[![Build Cron](https://img.shields.io/badge/build%20cron-weekly-44cc11.svg)](https://travis-ci.com/NoriSte/typescript-is-type)
[![Coverage Status](https://coveralls.io/repos/github/NoriSte/typescript-is-type/badge.svg)](https://coveralls.io/github/NoriSte/typescript-is-type)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![TypeScript](https://badges.frapsoft.com/typescript/love/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)

Network requests responses or JSON based data doesn't allow TypeScript to perform compile-time checks. You can cast the response but it doesn't give you the confidence that the data is an instance of the desired type.

This simple one-function package allows you to perform both TypeScript-safe and runtime-safe data check.

If one of the keys to be checked is `undefined` than the check doesn't pass (it's not based on `hasOwnProperty`).

```bash
# isntall it with
npm install --save-dev typescript-is-type
```

```typescript
is<string>("Hello world", "length"); // true
is<string>("Hello world", "concat"); // TS compile error, "concat" isn't a key of string
is<string>(JSON.parse(JSON.stringify("Hello world")), "length"); // true
```

That's the function signature
```typescript
function is<Type>(instance: any, keys: keyof Type|(keyof Type)[]): instance is Type
```

A more explanatory example

```typescript
import { is } from 'typescript-is-type';

interface Car {
  power: number
}
interface FuelCar extends Car {
  tank:number
}
interface ElectricCar extends Car {
  battery:number
  singlePedalDrive: boolean
}

is<ElectricCar>(JSON.parse(JSON.stringify({
  power: 450,
  tank: 60
})), "battery") // false

```

Remember that it's up to you to decide the keys to be checked to avoid every false positive/negative.
```typescript
is<ElectricCar>({
  power: 450,
  tank: 60
}), "power") // true 🤔
is<ElectricCar>({
  power: 450,
  tank: 60
}), ["power", "battery"]) // false 🎉
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="https://twitter.com/NoriSte"><img src="https://avatars0.githubusercontent.com/u/173663?v=4" width="100px;" alt="Stefano Magni"/><br /><sub><b>Stefano Magni</b></sub></a><br /><a href="https://github.com/NoriSte/typescript-is-type/commits?author=NoriSte" title="Code">💻</a> <a href="https://github.com/NoriSte/typescript-is-type/commits?author=NoriSte" title="Tests">⚠️</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
