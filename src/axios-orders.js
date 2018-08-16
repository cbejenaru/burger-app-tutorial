import axios from 'axios';

const instance =axios.create({
  baseURL: 'https://burger-builder-1635e.firebaseio.com/'
});

export default instance;
