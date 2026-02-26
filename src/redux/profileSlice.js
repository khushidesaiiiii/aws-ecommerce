import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUserProfile, saveUserProfile } from "../services/profileService";

export const GetUserProfile = createAsyncThunk(
  "profile/GetUserProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await getUserProfile();
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const SaveUserProfle = createAsyncThunk(
  "profile/SaveUserProfile",
  async (formData, { rejectWithValue }) => {
    try {   
        //console.log("formdata", formData);
      return await saveUserProfile(formData);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (Builder) => {
    Builder.addCase(GetUserProfile.pending, (state) => {
      state.loading = true;
    })
      .addCase(GetUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(GetUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(SaveUserProfle.pending, (state) => {
        state.loading = true;
      })
      .addCase(SaveUserProfle.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(SaveUserProfle.rejected, (state, action) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default profileSlice.reducer;