import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import authService from './authService';
import { toast } from 'react-toastify';

const musician = JSON.parse(localStorage.getItem('musician'));

const initialState = {
    musician: musician? musician : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    errors: {}
}

export const register = createAsyncThunk('auth/register', async (musician, thunkAPI) => {
        try {
            const response = await authService.register(musician);
            toast.success('Registration Successful');
            return response;
        } catch (error) {
            const errorResposne = (error.response && error.response.data.err.errors)
            console.log(error.response);
            console.log(error.response.data.err.errors);
            const errorFields = Object.keys(errorResposne);
            const errors = {};
            console.log(errorFields);
            errorFields.forEach(field => {
                errors[field] = errorResposne[field].message;
            });
            return thunkAPI.rejectWithValue(errors);
        }
    })

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout();
    toast.success('Logout Successful');
})

export const login = createAsyncThunk('auth/login', async (musician, thunkAPI) => {
        try {
            console.log(musician);
            const response = await authService.login(musician);
            toast.success('Login Successful');
            console.log(response);
            return response
        } catch (error) {
            const errorResponse = (error.response && error.response.data.message)
            console.log(error.response);
            console.log(error.response.data.message);
            return thunkAPI.rejectWithValue(errorResponse)
        }
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false;
            state.isSuccess = false;
            state.isLoading = false;
            state.message = '';
            state.errors = {};
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.pending, (state) => {
            state.isLoading = true;
        })  
        .addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.musician = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.musician = action.payload || {};

            if (action.payload && typeof action.payload === 'object') {
                console.log(action.payload);
                Object.entries(action.payload).forEach(([fieldName, errorMessage]) => {
                state.errors[fieldName] = errorMessage;
                });
            }
        })
        .addCase(login.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
            console.log('login.fulfilled payload:', action.payload);
            console.log('state before:', state);
            state.isLoading = false;
            state.isSuccess = true;
            state.musician = action.payload;
            console.log('state after:', state);
        })
        .addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
            state.musician = null;
        })
        .addCase(logout.fulfilled, (state) => {
            state.musician = null;
        })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;