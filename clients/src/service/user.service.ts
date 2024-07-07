
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {newUser} from '../store/reducer/interface/index'


export const addNewUser: any = createAsyncThunk(
    "user/addNewUser",
    async (item: newUser, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        const existingUser = response.data.find(
          (user: newUser) => user.email === item.email
        );
  
        if (existingUser) {
          alert("Tài khoản đã được cài đặt, vui lòng tạo tài khoản khác!");
          return rejectWithValue("User already exists");
        } else {
          const newId =
            response.data.length > 0
              ? Math.max(...response.data.map((user: newUser) => user.id || 0)) + 1
              : 0;
          const newUser = { ...item, id: String(newId) };
          const postResponse = await axios.post(
            "http://localhost:8080/users",
            newUser
          );
          window.alert("Tạo tài khoản thành công");
          return postResponse.data;
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const login: any = createAsyncThunk(
    "user/login",
    async (item: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        const user = response.data.find(
          (u: newUser) => u.email === item.email && u.password === item.password
        );
  
        if (user) {
          user.onl = true;
          await axios.patch(`http://localhost:8080/users/${user.id}`, {
            onl: true,
          });
          window.alert("Đăng nhập thành công");
          return user;
        } else {
          return rejectWithValue("Invalid email or password");
        }
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    }
  );
  
  export const getAllUser: any = createAsyncThunk(
    "reducer/getAllUser",
    async () => {
      const response = await axios.get("http://localhost:8080/users");
      return response.data;
    }
  );
  export const deleteUser: any = createAsyncThunk(
    "reducer/deleteUser",
    async (id:number) => {
       await axios.delete(`http://localhost:8080/users/${id}`);
      return id
    }
  );
  
  export const blockUser: any = createAsyncThunk(
    "users/blockUser",
    async (item: { id: string; block: boolean }) => {
      await axios.patch(`http://localhost:8080/users/${item.id}`, {
        block: !item.block,
      });
      const response = await axios.get("http://localhost:8080/users");
      return response.data;
    }
  );