import axios from "axios";

const instance = axios.create({
  baseURL:
    "https://todomy-128f6-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default instance;
