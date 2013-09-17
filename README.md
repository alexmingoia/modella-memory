# modella-memory

Memory persistence layer for [Modella](https://github.com/modella/modella/).
Useful for development or as a reference implementation for Modella storage
plugins.

## Installation

```sh
npm install modella-memory
```

## Example

```javascript
var modella = require('modella');
var memory = require('modella-memory');

var User = modella('User');

User.use(memory);
```

## MIT Licensed