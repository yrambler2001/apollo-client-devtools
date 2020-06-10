const { RESTDataSource } = require('apollo-datasource-rest');

class ColorAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.thecolorapi.com/';
  }

  identifyColor({ hex, rgb }) {
    return this.get('/id', {
      hex,
      rgb,
    });
  }

  getColorScheme({ hex, rgb, mode, count }) {
    return this.get('/scheme', {
      hex,
      rgb,
      mode,
      count,
    });
  }
}

module.exports = ColorAPI;