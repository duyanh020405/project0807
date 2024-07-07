import React from 'react';
import { Link } from 'react-router-dom';
import './css/Detail.css';
import "../components/css/Admin.css";
import { TbMotorbike } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import Logo from "./image/logo.png";
import "../components/css/Index.css";
import "../components/css/Admin.css";
const ItemOnline = JSON.parse(localStorage.getItem("userOnl") || "{}");

export default function Details() {
  const item = JSON.parse(localStorage.getItem("detail") || "{}");
  

  const handleBuyNow = () => {
    // Logic for buying the item
    alert(`Mua ngay sản phẩm ${item.name}`);
  };
  const addToCard = (item: any) => {
    const addItemToCard = window.confirm(`Bạn có chắc chắn muốn thêm sản phẩm ${item.name} vào giỏ hàng?`);
    if (addItemToCard) {
      const currentItems = JSON.parse(localStorage.getItem("userOnl") || "[]");
      currentItems.push(item);
      localStorage.setItem("userOnl", JSON.stringify(currentItems));
      window.alert(`Đã thêm sản phẩm ${item.name} vào giỏ hàng.`);
    }
  };


  return (
    <div className="details-container">
        <div className="navbar-container">
        <div className="navbar">
          <div className="logo-section">
            <img src={Logo} alt="Logo" className="logo" />
            <h2 className="shop-title">
              <TbMotorbike style={{ fontSize: "2rem" }} /> Motorbike Shop
            </h2>
          </div>
          <div className="tagline-section">
            <div className="search-bar">
            </div>
          </div>
          <div className="profile-section">
            <img
              src="https://th.bing.com/th/id/R.4c7978001fc4f9f78a25e9278ea2d617?rik=7eo%2bQfaj2KzAkg&riu=http%3a%2f%2fi2.kym-cdn.com%2fphotos%2fimages%2fnewsfeed%2f000%2f146%2f550%2f1310246424001.jpg&ehk=T%2fkHqG0AJXN8DSR3MnFvxNcu2bKzyqlfgyKNFVa7V4w%3d&risl=&pid=ImgRaw&r=0"
              alt="profile"
              className="profile-image"
            />
            <b style={{color:"white"}}>Xin chào {ItemOnline.name}</b>
            <IoIosLogOut className="logout-icon" />
          </div>
        </div>
      </div>
      <div className="details-header">
        <h1>Chi tiết sản phẩm</h1>
      </div>
      <div className="details-content">
        <img src={item.image} alt={item.name} className="details-image"/>
        <h2>{item.name}</h2>
        <p className="details-price">Giá: {item.price} VNĐ</p>
        <p className="details-description"><b>Mô tả:</b> {item.description}</p>
        <p className="details-quantity"><b>Số lượng:</b> {item.quantity}</p>
        <p className="details-type"><b>Kiểu xe:</b> {item.type}</p>
        <p className="details-state"><b>Loại xe:</b> {item.state}</p>
        <button className="buy-now-button" onClick={handleBuyNow}>Mua ngay</button>
        <button className="buy-now-button" onClick={() => addToCard(item)}>Thêm vào giỏ hàng</button>
        <Link to="/index">
          <button className="go-back-button">Quay trở lại</button>
        </Link>
      </div>
    </div>
  );
}
