import axios from "axios";

axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.headers.post["Authorization"] = `Bearer ${localStorage.token}`
// axios.defaults.headers.get["Authorization"] = `Bearer ${localStorage.token}`
// axios.defaults.headers.delete["Authorization"] = `Bearer ${localStorage.token}`
// axios.defaults.headers.put["Authorization"] = `Bearer ${localStorage.token}`

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete
};