import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addNewUser } from "../service/user.service"
import "../components/css/Register.css";
import { Link } from "react-router-dom";
import Logo from './image/logo.png'
import { TbMotorbike } from "react-icons/tb"
interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  onl: boolean;
  block: boolean;
  age: number;
  phoneNumber: number;
  cart: [];
  buy:[]
}

export default function Register() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    onl: false,
    block: false,
    age: 0,
    phoneNumber: 0,
    cart: [],
    buy:[]
   
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      alert("Vui lòng nhập một địa chỉ email hợp lệ");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Password xác nhận không đúng");
      return;
    }
    dispatch(addNewUser(formData));
  };

  return (
    <div className="register-container">
       <h2 className="shop-title" style={{fontFamily:'sans-serif'}}><TbMotorbike style={{ fontSize: '2rem' }} ></TbMotorbike>Motorbike Shop</h2>
        <div><img src={Logo} alt="" /></div>
        <b>Ngon - bổ - rẻ </b>
        <img src="./" alt="" />
        <div className="admin-header">
          <div className="profile">
            <img
              src="https://th.bing.com/th/id/R.4c7978001fc4f9f78a25e9278ea2d617?rik=7eo%2bQfaj2KzAkg&riu=http%3a%2f%2fi2.kym-cdn.com%2fphotos%2fimages%2fnewsfeed%2f000%2f146%2f550%2f1310246424001.jpg&ehk=T%2fkHqG0AJXN8DSR3MnFvxNcu2bKzyqlfgyKNFVa7V4w%3d&risl=&pid=ImgRaw&r=0"
              alt="profile"
              className="profile-image"
            />
            <b>Xin chào Duy Anh!</b>
          </div>
        </div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <b>Name</b>
          <input
            type="text"
            name="name"
            placeholder="Your name?"
            value={formData.name}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <b>Email</b>
          <input
            type="email"
            name="email"
            placeholder="Your email?"
            value={formData.email}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <b>Password</b>
          <input
            type="password"
            name="password"
            placeholder="Your password?"
            value={formData.password}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <b>Confirm Password</b>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password?"
            value={formData.confirmPassword}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <b>Your age</b>
          <input
            type="age"
            name="age"
            placeholder="Confirm your age"
            value={formData.age}
            onChange={handleInput}
            required
          />
        </div>
        <div>
          <b>Phone Number</b>
          <input
            type="number"
            name="phoneNumber"
            placeholder="Confirm your phone number"
            value={formData.phoneNumber}
            onChange={handleInput}
            required
          />
        </div>
        {/* <div>
          <b>Vehicle Type</b>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleInput}
            required
          >
            <option value="">Select vehicle type</option>
            <option value="xe máy trên 50cc">Xe máy trên 50cc</option>
            <option value="xe máy trên 180cc">Xe máy trên 180cc</option>
          </select>
        </div> */}
        <button type="submit">Register</button>
        <br />
        <Link to="/loginUser" style={{ color: "blue" }}>
          Bạn đã có tài khoản? Ấn vào đây để đăng nhập
        </Link>
      </form>
    </div>
  );
}
