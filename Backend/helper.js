import { DateTime } from 'luxon';

// check if value is undefined
const isUndefined = function(val) {
    return (val === undefined);
}

// check if value is null
const isNull = function(val) {
    return (val === null);
}

// checks if value is a number
const isNumeric = function(val) {
    if (val === null) 
        return false;

    if (val === undefined) 
        return false;

    return (!isNaN(val));
}

// checks if value is a array
const isArray = function(val) {
    if (val === null) 
        return false;

    if (val === undefined) 
        return false;

    return Array.isArray(val);
}

// checks if given value is an array and if its empty
const isArrayEmpty = function(val) {
    if (val === null) 
        return true;
    
    if (val === undefined) 
        return true;

    if (!Array.isArray(val)) 
        return true;
    
    return (val.length == 0);
}

// checks if given value is an object
const isObject = function(obj) {
    return ( (typeof obj === 'object' || typeof obj === 'function') && (obj !== null) );
}

// checks if given value is an datetime object
const isDateTime = function(obj) {
    if (!this.isObject(obj)) 
        return false;
    
    return (obj instanceof DateTime);
}

// concats the elements in an array and returns as string
const concatArray = function(arr) {
    return arr.join(', ');
}

// checks if a given string is a email address
// returns true if so, otherwise false
const isEmail = function(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

// trims a given text
const trim = function(val) {
    return val.trim();
}

// returns current date time
const getNow = function() {
    return DateTime.local();
}

// alias of getNow
const getDateTime = function() {
    return this.getNow();
}

// checks if a given string represents an german datetime string
// returns true if yes, otherwise no, WITHOUT VALIDATION
const isGermanDateTimeFormat = function(val) {
    if ( /[0-3]\d.[01]\d.\d{4} [0-2]\d:[0-5]\d:[0-5]\d$/.test(val) == false ) {
        return /[0-3]\d.[01]\d.\d{4}$/.test(val);
    }

    return true;
}

// checks if a given string represents an sql datetime string
// returns true if yes, otherwise no, WITHOUT VALIDATION
const isSQLDateTimeFormat = function(val) {
    if ( /\d{4}-[01]\d-[0-3]\d [0-2]\d:[0-5]\d:[0-5]\d$/.test(val) == false ) {
        return /\d{4}-[01]\d-[0-3]\d$/.test(val);
    }

    return true;
}

// parses a german datetime string to a datetime object
// if not valid, returns null, otherwise the object
const parseGermanDateTimeString = function(input) {
    var datetimeobj = null;
    if (input.length > 10) 
        datetimeobj = DateTime.fromFormat(input, 'dd.MM.yyyy HH:mm:ss');
    else 
        datetimeobj = DateTime.fromFormat(input, 'dd.MM.yyyy');
    
    if (!datetimeobj.isValid) 
        return null;
    
    return datetimeobj;
}

// parses a sql datetime string to a datetime object
// if not valid, returns null, otherwise the object
const parseSQLDateTimeString = function(input) {
    var datetimeobj = DateTime.fromSQL(input);

    if (!datetimeobj.isValid) 
        return null;
    
    return datetimeobj;
}

// parses a given datetime string (german or sql) to a datetime object
// if not valid, returns null, otherwise the object
const parseDateTimeString = function(input) {
    if (this.isGermanDateTimeFormat(input)) 
        return this.parseGermanDateTimeString(input);
    
    return this.parseSQLDateTimeString(input);
}

// converts a datetime object as german date format
const formatToGermanDate = function(datetimeobj) {
    if (!this.isDateTime(datetimeobj)) 
        return null;
    return datetimeobj.toFormat('dd.MM.yyyy');
}

// converts a datetime object as german datetime format
const formatToGermanDateTime = function(datetimeobj) {
    if (!this.isDateTime(datetimeobj)) 
        return null;
    return datetimeobj.toFormat('dd.MM.yyyy HH:mm:ss');
}


// converts a datetime object as sql date format
const formatToSQLDate = function(datetimeobj) {
    if (!this.isDateTime(datetimeobj)) 
        return null;
    return datetimeobj.toFormat('yyyy-MM-dd');
}

// converts a datetime object as sql datetime format
const formatToSQLDateTime = function(datetimeobj) {
    if (!this.isDateTime(datetimeobj)) 
        return null;
    return datetimeobj.toFormat('yyyy-MM-dd HH:mm:ss');
}

// converts a datetime object to milliseconds
// if no datetime object provided, null is returned
const formatToMilliseconds = function(datetimeobj) {
    if (!this.isDateTime(datetimeobj)) 
        return null;
    return datetimeobj.valueOf();
}

// compares two datetime objects
// if left is smaller of right, returns -1, otherwise +1, or 0 if equal
// returns null on error
const compareDateTimes = function(leftdatetime, rightdatetime) {
    if (!this.isDateTime(leftdatetime) || !this.isDateTime(rightdatetime)) 
        return null;

    var result = leftdatetime.valueOf() - rightdatetime.valueOf();
    if (result < 0) 
        return -1;
    else if (result > 0) 
        return 1;
    else 
        return 0;
}

// modifies a given datetime object
// adds or subs values to years, months, days, hours, minutes, seconds
// positive values are added, negative ones subbed. 0 values are ignored
// if no datetime objet is provided, now is used
const modifyDateTime = function(datetimeobj = null, y = 0, m = 0, d = 0, h = 0, i = 0, s = 0) {

    if (!this.isDateTime(datetimeobj)) 
        datetimeobj = this.getNow();

    var options = {};

    if (y == 0 && m == 0 && d == 0 && h == 0 && i == 0 && s == 0) 
        return datetimeobj;

    if (y != 0) 
        options.years = y;
    if (m != 0) 
        options.months = m;
    if (d != 0) 
        options.days = d;
    if (h != 0) 
        options.hours = h;
    if (i != 0) 
        options.minutes = i;
    if (s != 0) 
        options.seconds = s;
    
    return datetimeobj.plus(options);
}

// checks if a string starts with specified text
// returns true or false
const strStartsWith = function(haystack, needle) {
    if (this.isNull(haystack) || this.isUndefined(haystack)) 
        return false;

    if (this.isNull(needle) || this.isUndefined(needle)) 
        return false;

    return haystack.toLowerCase().startsWith(needle.toLowerCase());
}

// rounds a given number to two digits after comma
const round = function(val) {
    val = Math.round(val*Math.pow(10,2))/Math.pow(10,2);
    return val;
}

export default{
    isUndefined,
    isNull,
    isNumeric,
    isArray,
    isArrayEmpty,
    isObject,
    isDateTime,
    concatArray,
    isEmail,
    trim,
    getNow,
    getDateTime,
    isGermanDateTimeFormat,
    isSQLDateTimeFormat,
    parseGermanDateTimeString,
    parseSQLDateTimeString,
    parseDateTimeString,
    formatToGermanDate,
    formatToGermanDateTime,
    formatToSQLDate,
    formatToMilliseconds,
    compareDateTimes,
    modifyDateTime,
    strStartsWith,
    round
}