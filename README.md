# Zrg's Utils

A collection of my utility functions written in Typescript.

## Installation

Use the npm package manager.

```bash
npm install @zrgjs/utils
```

## Usage

Import each function as needed.

```javascript
import {function1, function2} from '@zrgjs/utils/lib'
// or 
const {function1, function2} = require('@zrgjs/utils/lib')
```

## Functions

### generateCsv
```javascript
import {generateCsv} from '@zrgjs/utils/lib'
```

Generate a csv string from an Object with arrays of strings, where the key is the column title and all the strings from it's value array are the values from the same column.

Example:

```javascript
{
  "title 1": ['value.t1.1', 'value.t1.2'],
  "title 2": ['value.t2.1', 'value.t2.2', 'value.t2.3']
}
```
Expected result:
```
title1,title2
value.t1.1,value.t2.1
value.t1.2,value.t2.2
,value.t2.3
```

All values can contain commas, it won't break the order.

### generateGuid

```javascript
import {generateGuid} from '@zrgjs/utils/lib/
```
Generate a 128-bit globally unique identifier.