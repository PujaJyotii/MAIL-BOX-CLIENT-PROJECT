
import { createSlice } from "@reduxjs/toolkit";
const initialUI = {
  receivedmails: [],
  sendMails: [],
  togglereceivedmsg: true,
};
const UIslice = createSlice({
  name: "UIshow",
  initialState: initialUI,
  reducers: {
    receiveallMails(state, action) {
      state.receivedmails = action.payload;
    },
    
    HidestarReceived(state, action) {
      state.receivedmails = action.payload;
    },
    AddsendMails(state, action) {
      state.sendMails.push(action.payload);
    },
    HidestarSend(state, action) {
      state.sendMails = action.payload;
      console.log(action.payload, state.sendMails, "ui");
    },
    receivedMailHandler(state, action) {
      state.togglereceivedmsg = action.payload;
    },
  },
});
export const UIshowaction = UIslice.actions;
export default UIslice.reducer;
