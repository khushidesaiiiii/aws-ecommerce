import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  confirmSignup,
  refreshSession,
  resendConfirmationCode,
  signin,
  signup,
} from "../services/authService";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const tokens = await signin(email, password);

      const payload = JSON.parse(atob(tokens.idToken.split(".")[1]));

      const user = {
        id: payload.sub,
        email: payload.email,
        username: payload["cognito:username"],
      };

      const role = payload["cognito:groups"]?.includes("ADMIN")
        ? "ADMIN"
        : "USER";

      return { tokens, role, user };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signup(email, password);
      return { email, needsConfirmation: true };
    } catch (err) {
      if (err.code === "UsernameExistsException") {
        try {
          await signin(email, password);

          return rejectWithValue(
            "An account with this email already exists. Please log in.",
          );
        } catch (loginErr) {
          if (loginErr.code === "UserNotConfirmedException") {
            return { email, needsConfirmation: true };
          }

          return rejectWithValue(
            "An account with this email already exists. Please log in.",
          );
        }
      }

      return rejectWithValue(err.message || "Signup failed");
    }
  },
);

// export const signupUser = createAsyncThunk(
//   "auth/signUpUser",
//   async ({ email, password }, { rejectWithValue }) => {
//     try {
//       await signup(email, password);
//       return true;
//     } catch (err) {
//        if (err.code === "UsernameExistsException") {
//         return { email };
//       }
//       return rejectWithValue(err.message || "Signup Failed");
//     }
//   },
// );

export const confirmUser = createAsyncThunk(
  "auth/confirmUser",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      await confirmSignup(email, code);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const resendCode = createAsyncThunk(
  "auth/resendCode",
  async (email, { rejectWithValue }) => {
    try {
      await resendConfirmationCode(email);
      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const restoreSession = createAsyncThunk(
  "auth/restoreSession",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const email = localStorage.getItem("email");

      if (!refreshToken || !email) {
        throw new Error("No stored session");
      }

      const tokens = await refreshSession(email, refreshToken);

      const payload = JSON.parse(atob(tokens.idToken.split(".")[1]));

      const user = {
        id: payload.sub,
        email: payload.email,
        username: payload["cognito:username"],
      };

      const role = payload["cognito:groups"]?.includes("ADMIN")
        ? "ADMIN"
        : "USER";

      return { tokens, user, role };
    } catch (err) {
      return rejectWithValue("Session expired");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    userRole: null,
    tokens: null,
    error: null,
    user: localStorage.getItem("user") || null,
  },
  
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.tokens = null;
      state.userRole = null;
      state.user = null;
      localStorage.clear();
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.tokens = action.payload.tokens;
        state.userRole = action.payload.role;
        state.user = action.payload.user;
        localStorage.setItem(
          "refreshToken",
          action.payload.tokens.refreshToken,
        );
        //console.log("API:  ", action.payload.tokens);
        localStorage.setItem("email", action.payload.user.email);
        localStorage.setItem("idToken", action.payload.tokens.idToken);
        localStorage.setItem("accessToken", action.payload.tokens.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(confirmUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(confirmUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(resendCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendCode.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resendCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(restoreSession.pending, (state) => {
        state.loading = true;
      })

      .addCase(restoreSession.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.tokens = action.payload.tokens;
        state.user = action.payload.user;
        state.userRole = action.payload.role;
      })

      .addCase(restoreSession.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.tokens = null;
        state.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
