import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TbMotorbike } from "react-icons/tb";
import { IoIosLogOut } from "react-icons/io";
import { RxReset } from "react-icons/rx";
import { FaSearch } from "react-icons/fa";
import Logo from "./image/logo.png";
import { getAllProducts } from '../service/products.service'
import "../components/css/Index.css";
import "../components/css/Admin.css";
import { Link } from "react-router-dom";
import s1 from './image/s1.webp'
import s2 from './image/s2.jpg'
import s3 from './image/s3.jpg'
import s4 from './image/s4.jpg'
import s5 from './image/1579687460-924-suzuki-raider-1579616125-width660height400.jpg'
import s6 from './image/Dapp7L91V-11.jpg'
import s7 from './image/xe-moto-co-dien-gia-re-1280x720.jpg'

export default function Index() {
  const { products } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const ItemOnline = JSON.parse(localStorage.getItem("userOnl") || "{}");
  const idUser =ItemOnline.id
  console.log(idUser);
  


  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const searchItem = () => {
    const filtered = products.filter(
      (item: any) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredProducts([]);
  };

  const addToCard = (item: any) => {
    const addItemToCard = window.confirm(`Bạn có chắc chắn muốn thêm sản phẩm ${item.name} vào giỏ hàng?`);
    if (addItemToCard) {
      const currentItems = JSON.parse(localStorage.getItem("userOnl") || "{}");
      currentItems.cart.push(item);
      localStorage.setItem("userOnl", JSON.stringify(currentItems));
      window.alert(`Đã thêm sản phẩm ${item.name} vào giỏ hàng.`);
    }
  };

  const toDetail = (item: any) => {
    localStorage.setItem("detail", JSON.stringify(item));
    localStorage.setItem("idUser", JSON.stringify(item.id));

  };

  return (
    <div>
        <div>
        </div>
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
              <input
                type="text"
                className="tagline-input"
                placeholder="Tìm kiếm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-button" onClick={searchItem}>
                <FaSearch />
              </button>
              <button className="reset-button" onClick={resetSearch}>
                <RxReset />
              </button>
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
      <br />
      <div className="marquee-container">
      <div className="marquee-content">
        <img src={s4} alt="Ad Image 1" className="marquee-image" />
        <img src={s1} alt="Ad Image 2" className="marquee-image" />
        <img src={s2} alt="Ad Image 3" className="marquee-image" />
        <img src={s3} alt="Ad Image 4" className="marquee-image" />
        <img src={s4} alt="Ad Image 4" className="marquee-image" />
        <img src={s5} alt="Ad Image 4" className="marquee-image" />
        <img src={s6} alt="Ad Image 4" className="marquee-image" />
        <img src={s7} alt="Ad Image 4" className="marquee-image" />
      </div>
    </div>

      <div className="main-content">
        <div className="product-list">
          {filteredProducts.length > 0
            ? filteredProducts.map((product: any) => (
                <div className="product-item" key={product.id}>
                  <Link to='/index/detail' onClick={() => toDetail(product)}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <h3>{product.name}</h3>
                  <p className="price">Giá : {product.price} VNĐ</p>
                  <p>
                    <b>Mô tả</b> : {product.description}
                  </p>
                  <p>
                    <b>Số lượng</b> : {product.quantity}
                  </p>
                  <button className="buy-now"><Link to='/index/detail' onClick={() => toDetail(product)}>Detail</Link></button>
                  <button
                    type="button"
                    className="add-to-cart"
                    onClick={() => addToCard(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button className="buy-now">Buy Now</button>
                </div>
              ))
            : products.map((product: any) => (
                <div className="product-item" key={product.id}>
                  <Link to='/index/detail' onClick={() => toDetail(product)}>
                    <img src={product.image} alt={product.name} />
                  </Link>
                  <h3>{product.name}</h3>
                  <p className="price">Giá : {product.price} VNĐ</p>
                  <p>
                    <b>Mô tả</b> : {product.description}
                  </p>
                  <p>
                    <b>Số lượng</b> : {product.quantity}
                  </p>
                  <button
                    className="add-to-cart"
                    onClick={() => addToCard(product)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button className="buy-now">Buy  Now</button>
                  <button className="buy-now"><Link to='/index/detail' onClick={() => toDetail(product)}>Detail</Link></button>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
