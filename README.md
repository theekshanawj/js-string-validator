# js-string-validator
JavaScript String validator util class.
Based on the builder pattern, this class will all you to validate the given string for user defined criteria.

## How to use
```
const StringValidator = require(<path to StringValidator class>);
  
let validator = new StringValidator('some string');

let isValidString = validator.min(0).max(20).regex(/\s+/).includes('string').validate();

console.log(isValidString);
// true -> string obey all criteria

console.log(validator.validate());
// true -> valid string without any criteria

validator = new StringValidator();

console.log(validator.validate());
// false -> Not a valid string

```
## API specification

Following methods can be linked to validate a given string

| Method | Definition |Usage | Example |
|---|---|---|---|
|constructor| `new StringValidator(value) ; value: string \| falsy` | Initialize the validator with `value` to be validated. | `new StringValidator()`|
| length | `length(number) ; number : any` | Validate the length of the string. Validaton is skipped if `number` not 0 or +. |  `validator.length(1).validate()`|
| max | `max(number) ; number : any` | Validate the max length of the string. Validation is skipped if `number` is not 0 or +. | `validator.max(10).validate()`|
| min | `min(number) ; number : any` | Validate the min length of the string. Validation is skipped if `number` is not 0 or +. | `validator.min(0).validate()`|
| regex | `regext(regexPattern) ; regexPattern : any` | Validate for the string for given `regexPattern`. Validation is skipped if the pattern is not a regex | `validator.regex(/[0-9a-zA-Z]+/).validate()`|
| includes | `includes(subString) ; subString: any` |  Validate if `subString` includes in the string. Validatin is skipped if the `subString` is undefined | `validator.includes('test').validate()`|
| allow | `allow(allowedValue) ; allowedValue: any` | Validate `true` if contructed with `allowedValue`| `validator.allow(undefined).validate()`|
| validate | `validate()` | Validate the given string with given criteria | `validator.max(10).min(0).validate()`|

## Tests 

See the `string-validator-test.js` file for tests.
