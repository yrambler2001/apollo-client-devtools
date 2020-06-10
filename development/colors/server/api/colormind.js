const { RESTDataSource } = require('apollo-datasource-rest');

class ColormindAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://colormind.io/';
  }

  parseBody(response) {
    return response.json();
  }

  async getAvailableModels() {
    return this.get('api/list/');
  }

  async getScheme(model = 'default', input) {
    const data = await this.post('api/', { model, input });
    return data;
  }

  async getRandomScheme(model = 'default') {
    const data = await this.post('api/', { model });
    return data;
  }
}

module.exports = ColormindAPI;