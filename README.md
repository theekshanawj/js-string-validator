# js-string-validator

![Script Validator](https://github.com/theekshanawj/js-string-validator/workflows/Script%20Validator/badge.svg?branch=master&event=push)

JavaScript String validator utility class.
Based on the builder pattern, this class will all you to validate the given string for user defined criteria.

## Add to your application 

Get the package from [here](https://www.npmjs.com/package/js-string-validator)
```
npm i js-string-validator
```

## How to use

- ### Basic usage
```
const StringValidator = require('js-string-validator');
  
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

- ### Builder 

Create a template (validator function) for re-usability

```javascript
const StringValidatorBuilder = require('js-string-validator/builder');
  
const validator = StringValidatorBuilder().min(0).max(20).regex(/\s+/).includes('string').build();

console.log(validator('some string'));
// true  -> string obeys the pattern

console.log(validator('random'));
// false -> string violates the pattern

console.log(validator());
// false -> undefined not allowed
```


## API specification

- ### Basic usage

Following methods can be linked to validate a given string

| Method | Definition |Usage | Example |
|---|---|---|---|
|constructor| `new StringValidator(value) ; value: string \| null \| undefined` | Initialize the validator with `value` to be validated. | `new StringValidator()`|
| length | `length(number) ; number : any` | Validate the length of the string. Validation is skipped if `number` not 0 or +. |  `validator.length(1).validate()`|
| max | `max(number) ; number : any` | Validate the max length of the string. Validation is skipped if `number` is not 0 or +. | `validator.max(10).validate()`|
| min | `min(number) ; number : any` | Validate the min length of the string. Validation is skipped if `number` is not 0 or +. | `validator.min(0).validate()`|
| regex | `regex(regexPattern) ; regexPattern : any` | Validate for the string for given `regexPattern`. Validation is skipped if the pattern is not a regex | `validator.regex(/[0-9a-zA-Z]+/).validate()`|
| includes | `includes(subString) ; subString: any` |  Validate if `subString` includes in the string. Validation is skipped if the `subString` is undefined | `validator.includes('test').validate()`|
| allow | `allow(allowedValue) ; allowedValue: any` | Validate `true` if constructed with `allowedValue`| `validator.allow(undefined).validate()`|
| validate | `validate()` | Validate the given string with given criteria | `validator.max(10).min(0).validate()`|

- ### Builder

Builder API will allow a create a template for String validation.

`length, max, regex, includes, allow` can be used to build a template (combine these methods in any form suits).

Use `build()` to generate a validator function.

```javascript
StringValidatorBuilder().length(number).max(number).min(number).regex(regexPattern).includes(subString).allow(allowedValue).build();
```

