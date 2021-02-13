import axios from "axios";
class Api {
  constructor() {
    this.baseUrl = process.env.baseUrl;
  }

  get(url) {
    return axios.get(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: {
        // 'Authorization': 'Bearer ' + this.token,
        //'client-token': this.token,
        'content-type': 'application/json',
        accept: 'application/json'
      }
    });
  }
  post(url, data) {
    return axios.post(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: {
        // 'Authorization': 'Bearer ' + this.token,
        //'client-token': this.token,
        'content-type': 'application/json',
        accept: 'application/json'
      },
      body: data
    });
  }
  put(url, data) {
    return axios.put(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers: {
        // 'Authorization': 'Bearer ' + this.token,
        //'client-token': this.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: data
    });
  }
  delete(url, data) {
    return axios.delete(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers: {
        // 'Authorization': 'Bearer ' + this.token,
        //'client-token': this.token,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: data
    });
  }
}
export default new Api();
