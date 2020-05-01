const assert = require('assert').strict;

const StringValidateBuilder = require('./builder');


// builder basic tests -------------------------------------------------------------

const validator = StringValidateBuilder()
						.length(3)
						.min(2)
						.max(5)
						.regex(/\d+/)
						.includes(2)
						.build();

assert(validator('123'), 'should assert true since "123: satisfies the conditions in the builder');
assert(!validator(), 'should assert false since undefined does not satisfy the builder');
assert(!validator("abc"), 'should assert false since "abc" does not satisfy builder');


const anotherValidator = StringValidateBuilder()
							.length(3)
							.allow(undefined)
							.min(2)
							.build();


assert(anotherValidator(), 'should assert true since undefined is allowed');
assert(anotherValidator("abc"), 'should assert true since abc is a valid');


const someOtherValidator = StringValidateBuilder()
								.max(0)
								.build();


assert(!someOtherValidator('b'), 'should assert false since given string has a length');


console.log('Successfully passed all String Validator Builder tests');
