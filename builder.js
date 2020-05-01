/**
 * String validator builder function
 * Allow to build a template for string validations
 *
 * Author: Theekshana Wijesinghe
 */

const StringValidator = require('./');

// These are the public methods exposed by StringValidator class
const stringValidatorExposedMethods = ['length', 'max', 'min', 'regex', 'includes', 'allow'];

/**
 * Functional wrapper that expose String validator methods
 * This allow to builder for string validations
 */
const stringValidatorWrapper = () => {

    // Will expose all methods allowed by the class
    const exposed = {};
    // Track methods call and the param passed key: method and value: param
    const methodTracker = {};

    // Expose all the methods
    // When a method is called save the params
    // Return exposed object to allow chaining
    stringValidatorExposedMethods.forEach((method) => {
       exposed[method] = (param) => {
           methodTracker[method] = param;
           return exposed;
       };
    });

    // Return a function that will validate at function call
    exposed.build = () => {
        return (value) => {
            let validator = new StringValidator(value);
            // Iterate over the methods called and validate
            for(const [method, param] of Object.entries(methodTracker)) {
               validator = validator[method](param);
            }
            return validator.validate(); // validate the value
        }
    };
    return exposed;
};

module.exports = stringValidatorWrapper;

