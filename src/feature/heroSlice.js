import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  heroList: JSON.parse(localStorage.getItem("heroList") || "[]"),
};
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
});
const { reducer, actions } = heroSlice;
export const { addHero, updateHeroList, deleteHero } = actions;
export default reducer;

//import { useDispatch, useSelector } from 'react-redux';
