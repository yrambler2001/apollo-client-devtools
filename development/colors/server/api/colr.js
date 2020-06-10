const { RESTDataSource } = require('apollo-datasource-rest');

class ColrAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://www.colr.org/json/';
  }

  parseBody(response) {
    return response.json();
  }

  async getRandomColor() {
    const data = await this.get('color/random', null, { cacheOptions: { ttl: 0 } });
    return data.colors[0];
  }

  async getRandomColors(count = 10) {
    const data = await this.get(`color/random/${count}`);
    return data.colors;
  }
}

module.exports = ColrAPI;