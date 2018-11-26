[![npm](https://img.shields.io/npm/v/meatball.svg)](http://npm.im/serialize-daggy)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/rametta/meatball/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# Currently only support taggedSum

> Stringify and parse your [Daggy](https://github.com/fantasyland/daggy)

## Install

```sh
yarn add serialize-daggy
```

Peer dependency on [Daggy](https://github.com/fantasyland/daggy)

```sh
yarn add daggy
```

## Usage examples

```js
import { stringify, parse } from "serialize-daggy"
import { taggedSum } from "daggy"

// example daggy type
const DaggyType = taggedSum("DaggyType", {
  Yes: ["value"],
  No: []
})

// obj to be serialized
const obj = {
  str: "string",
  num: 0,
  obj: { foo: "foo" },
  daggy_Yes: DaggyType.Yes("lol"),
  daggy_No: DaggyType.No,
  date: new Date("Thu, 28 Apr 2016 22:02:17 GMT")
}

// stringify daggy
const str = stringify(obj)

// put it back
const newObj = parse(str)
```
