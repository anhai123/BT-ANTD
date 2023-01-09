import { createSlice, current } from "@reduxjs/toolkit";
import { resolveOnChange } from "antd/lib/input/Input";
import { createAsyncThunk } from "@reduxjs/toolkit";
import heroService from "../services/Hero.service";
let initialState = { heroList: [] };

export const getAllHero = createAsyncThunk(
  "hero/getAll",
  async (form, thunkAPI) => {
    try {
      const response = await heroService.getAllHero();
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateHero = createAsyncThunk(
  "hero/updateHero",
  async (form, thunkAPI) => {
    try {
      const response = await heroService.updateHero(form);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteHeroAPI = createAsyncThunk(
  "hero/deleteHero",
  async (heroId, thunkAPI) => {
    try {
      const response = await heroService.deleteHero(heroId);
      console.log(response);
      return response;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue();
    }
  }
);
const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    addHero: (state, actions) => {
      state.heroList = [...state.heroList, actions.payload];
      localStorage.setItem("heroList", JSON.stringify(state.heroList));
    },
    updateHeroList: (state, actions) => {
      var position;
      console.log(actions.payload);
      for (var i = 0; i < state.heroList.length; i++) {
        if (state.heroList[i].key === actions.payload.key) {
          console.log("heroslice " + i);

          //hoạt động, cập nhật lại dữ liệu gốc, filter thì lại dùng cách 'ko hd'bên dưới
          state.heroList.splice(i, 1, actions.payload);
          position = i;
          break;
        }
      }
      //không hoạt động, không cập nhật lại dữ liệu gốc
      // state.heroList = state.heroList.splice(position, 1, actions.payload);
      localStorage.setItem("heroList", JSON.stringify(state.heroList));
    },
    deleteHero: (state, actions) => {
      state.heroList = state.heroList.filter(
        (post) => post.key !== actions.payload
      );
      localStorage.setItem("heroList", JSON.stringify(state.heroList));
    },
  },
  extraReducers: {
    [getAllHero.fulfilled]: (state, actions) => {
      console.log("payload" + actions.payload);
      state.heroList = actions.payload;
    },
    [deleteHeroAPI.fulfilled]: (state, action) => {
      state.heroList = state.heroList.filter(
        (hero) => hero._id !== action.payload.deleted._id
      );
    },
    [updateHero.fulfilled]: (state, actions) => {
      console.log("payload" + actions.payload);
    },
  },
});
const { reducer, actions } = heroSlice;
export const { addHero, updateHeroList, deleteHero } = actions;
export default reducer;

//import { useDispatch, useSelector } from 'react-redux';
