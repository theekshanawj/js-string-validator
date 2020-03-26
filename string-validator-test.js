const assert = require('assert').strict;

const StringValidator = require('./index');


// Some basic test -------------------------------------------------------------

let validator = new StringValidator('123');

const aValidCase = validator
						.length(3)
						.min(2)
						.max(5)
						.regex(/\d+/)
						.includes(2)
						.validate();

assert(aValidCase, 'should assert true since all the conditions are valid');


validator = new StringValidator();

const anIValidCase = validator
						.length(3)
						.min(2)
						.max(5)
						.regex(/\d+/)
						.includes(2)
						.validate();


assert(!anIValidCase, 'should assert false since constructor called with undefined');


const anotherValidCase = validator
							.length(3)
							.allow(null)
							.min(2)
							.max(5)
							.regex(/\d+/)
							.includes(2)
							.validate();


assert(anotherValidCase, 'should assert true since null is allowed');


validator = new StringValidator('b');

const anotherInvalidCase = validator
								.max(0)
								.validate();



assert(!anotherInvalidCase, 'should assert false since given string has a length');

// builder test ---------------------------------------------------------------------------------------

let stringValidator;
let err;
let isValid;

try {
	stringValidator = new StringValidator(12);
} catch(e) {
	err = e;
}
assert(err, 'should throw an error when called with non-string parameter');

stringValidator = new StringValidator('some string');
isValid = stringValidator.validate();
assert(isValid, 'should validate true if constructor invoked with a valid sting');

stringValidator = new StringValidator();
isValid = stringValidator.validate();
assert(!isValid, 'should validate false if constructor invoked with empty string');

try {
	stringValidator = new StringValidator(0);
} catch(e) {
	err = e;
}
assert(err, 'should throw an error if constructor invoked with falsy value such as 0');

// length method tests
stringValidator = new StringValidator('abc');
isValid = stringValidator.length(3).validate();
assert(isValid, 'should validate true if length method called with constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.length(0).validate();
assert(!isValid, 'should validate false if length method called a value different to constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.length(-1).validate();
assert(isValid, 'should skip length method validation when called with not a number or negative number');

stringValidator = new StringValidator('abc');
isValid = stringValidator.length('1').validate();
assert(isValid, 'should skip length method validation when called with not a number or negative number');


// max method tests
stringValidator = new StringValidator('abc');
isValid = stringValidator.max(5).validate();
assert(isValid, 'should validate true if max method is called with a number >= than constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.max(0).validate();
assert(!isValid, 'should validate false if max method is called with a number < than constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.max(-1).validate();
assert(isValid, 'should skip max method validation when called with not a number or negative number');


// min method tests
stringValidator = new StringValidator('abc');
isValid = stringValidator.min(2).validate();
assert(isValid, 'should validate true if min method is called with a number <= than constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.min(10).validate();
assert(!isValid, 'should validate false if min method is called with a number > than constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.min(-1).validate();
assert(isValid, 'should skip min method validation when called with not a number or negative number');

// regex method tests
stringValidator = new StringValidator('123abv');
isValid = stringValidator.regex(/[0-9a-z]+/).validate();
assert(isValid, 'should validate true if regex method is called with a regex pattern matching constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.regex(/\d+/).validate();
assert(!isValid, 'should validate false if regex method is called with a regex pattern not matching constructor invoked string length');

stringValidator = new StringValidator(); // Note initially this is invalid
isValid = stringValidator.regex({}).validate();
assert(!isValid, 'should skip regex method validation when called with non regex pattern');

// includes method tests
stringValidator = new StringValidator('123abv');
isValid = stringValidator.includes('123').validate();
assert(isValid, 'should validate true if includes method is called with a string included in the constructor invoked string length');

stringValidator = new StringValidator('123abv');
isValid = stringValidator.includes('zz').validate();
assert(!isValid, 'should validate false if includes method is called with a string not included in the constructor invoked string length');

stringValidator = new StringValidator('abc');
isValid = stringValidator.includes({}).validate();
assert(!isValid, 'should validate false if includes method is called with a invalid parameter');

// allow method
stringValidator = new StringValidator();
isValid = stringValidator.allow(null).validate();
assert(isValid, 'should validate true if null is allowed given constructor invoked with undefined');

stringValidator = new StringValidator(null);
isValid = stringValidator.max(10).allow(null).validate();
assert(isValid, 'should validate true if null is allowed given constructor invoked with null');

console.log('Successfully passed all tests');