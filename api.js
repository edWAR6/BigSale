const apiHost = 'https://bigsale-300f4-default-rtdb.firebaseio.com';

export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch(apiHost + '/deals.json');
      let responseJson = await response.json();
      responseJson = Object.values(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },

  async fetchDealDetail(key) {
    try {
      const response = await fetch(`${apiHost}/deal-details/${key}.json`);
      const responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};