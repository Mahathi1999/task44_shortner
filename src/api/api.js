const axios = require('axios').default;
const port = 8080;

const api = axios.create({ baseURL: `http://localhost:${port}` });

export default api;