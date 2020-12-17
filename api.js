const apiHost = 'https://bigsale-300f4-default-rtdb.firebaseio.com';

export default {
  async fetchInitialDeals() {
    try {
      let response = await fetch(apiHost + '/deals.json');
      let responseJson = await response.json();
      responseJson = Object.values(responseJson);
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  },
};