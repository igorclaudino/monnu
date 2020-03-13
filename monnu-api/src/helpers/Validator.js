export default class Validator {
    constructor (data = {}, messages = {}) {
      this.errors = {};
      this._run(data, messages);
    }
  
    required (variable, key, message) {
      if (variable === undefined || variable === null || variable.toString().trim() === '') {
        this._pushMessageErrorArray(key, message, 'Attention required field');
      }
    }
  
    array (variable, key, message) {
      if (!Array.isArray(variable)) {
        this._pushMessageErrorArray(key, message, 'Attention this field is expected an array!');
      }
    }
  
    number (variable, key, message) {
      if (isNaN(variable)) {
        this._pushMessageErrorArray(key, message, 'This field accepts numbers only!');
      }
    }
  
    
    float (variable, key, message){    
      if(typeof variable !=  'number'){
        this._pushMessageErrorArray(key, message, 'This field accepts numbers only!');
      }
    }
  
    hasError () {
      return Object.keys(this.errors).length > 0;
    }
  
  
    _pushMessageErrorArray (key, message, defaultMessage) {
      const [nameKey] = this._explode('.', key);
      if (!Array.isArray(this.errors[nameKey])) {
        this.errors[nameKey] = [];
      }
      this.errors[nameKey].push(message[key] || defaultMessage)
    }
  
    _getMessageCorrect (messages = {}, key) {
      try {
        return messages[key]
      } catch (error) {
        throw new Error('key not found!')
      }
    }
  
    _explode (separator = ' ', value) {
      return value.split(separator);
    }
  
    _run (datas = {}, messages = {}) {
      Object.keys(datas).map(key => {
        const [, method] = this._explode('.', key);
        this._getMessageCorrect(messages, key);
        this[method](datas[key], key, messages);
      })
    }
  }
  