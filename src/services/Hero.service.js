import axios from "axios";
const API_URL = "https://bt-antd-jsr4.vercel.app/hero/";
const createNewHero = async (form) => {
  for (const value of form.values()) {
    console.log(value);
  }

  return axios
    .post(API_URL + "create", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response);
      return response;
    });
};

const updateHero = async (form) => {
  return axios
    .post(API_URL + "update", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    });
};

const getAllHero = async () => {
  return axios.get(API_URL + "getAll").then((response) => {
    console.log(response.data);
    return response.data;
  });
};
const deleteHero = async (heroId) => {
  return axios.delete(API_URL + `delete/?ids=${heroId}`).then((response) => {
    return response.data;
  });
};

const heroService = {
  createNewHero,
  getAllHero,
  deleteHero,
  updateHero,
};

export default heroService;
