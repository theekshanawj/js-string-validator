/**
 * String Validator class 
 * Author: Theekshana Wijesinghe
 */
class StringValidator {
	constructor(value = null) {
		if (value !== null && typeof value !== 'string') throw new Error('Invalid string type');
		this.value = value;
		this.isValid = !!value;
	}
	length(number) {
		if (this.value !== null && typeof number === 'number' && number >= 0) {
			this.isValid = this.isValid && this.value.length === number;
		}
		return this;
	}
	max(number) {
		if (this.value !== null && typeof number === 'number' && number >= 0) {
			this.isValid = this.isValid && this.value.length <= number;
		}
		return this;
	}
	min(number) {
		if (this.value !== null && typeof number === 'number' && number >= 0) {
			this.isValid = this.isValid && this.value.length >= number;
		}
		return this;
	}
	regex(regexPattern) {
		if (this.value !== null && typeof regexPattern === 'object' && regexPattern.test) {
			this.isValid = this.isValid && regexPattern.test(this.value);
		}
		return this;
	}
	includes(subString) {
		if (this.value !== null && subString) {
			this.isValid = this.isValid && this.value.includes(subString);
		}
		return this;
	}
	allow(someValue) {
		this.isValid = this.value === someValue || this.isValid;
		return this;
	}
	validate() {
		return this.isValid;
	}
}

module.exports = StringValidator;
