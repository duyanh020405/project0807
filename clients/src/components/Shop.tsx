import { IoIosLogOut } from "react-icons/io";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editProducts, getAllProducts, deleteProducts } from '../service/products.service';
import '../components/css/Shop.css';
import '../components/css/Admin.css';
import { Link } from 'react-router-dom';
import { RiFindReplaceLine } from 'react-icons/ri';
import { RxReset } from 'react-icons/rx';
import Logo from './image/logo.png'
import { TbMotorbike } from "react-icons/tb"
const Shop = () => {
  const { products } = useSelector((state: any) => state.products);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Edit item
  const handleEdit = (item: any) => {
    const newName = window.prompt('Enter new name:', item.name);
    const newImage = window.prompt('Enter new image URL:', item.image);
    const newQuantity = window.prompt('Enter new quantity:', item.quantity);
    const newState = window.prompt('Enter new state:', item.state);
    const newPrice = window.prompt('Enter new price:', item.price);

    const newPost = {
      ...item,
      name: newName || item.name,
      image: newImage || item.image,
      quantity: newQuantity || item.quantity,
      state: newState || item.state,
      price: newPrice || item.price,
    };

    dispatch(editProducts(newPost));
  };

  // Delete item
  const handleDelete = (productId: number) => {
    const check = window.confirm('Bạn có chắc muốn xóa sản phẩm này không ?');
    if (check) {
      dispatch(deleteProducts(productId));
    }
  };

  // Search item function
  const searchItem = () => {
    const filtered = products.filter((item: any) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  // Reset search
  const resetSearch = () => {
    setSearchTerm('');
    setFilteredProducts([]);
  };

  return (
    <div>
      <div className="admin-container">
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
        <div className="admin-navigation">
          <Link to="/admin/creatProducts" className="nav-link">
            Create Product
          </Link>
          <Link to="/admin" className="nav-link">
            Admin User Management
          </Link>
          <Link to='/'><IoIosLogOut style={{ fontSize: '2rem' , color:"red" }}/></Link>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm thông tin sản phẩm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={searchItem} className="search-button">
              <RiFindReplaceLine />
            </button>
            <button onClick={resetSearch} className="search-button">
              <RxReset />
            </button>
          </div>
        </div>
      </div>
      <div className="shop-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên</th>
              <th>Trạng thái</th>
              <th>Mô tả </th>
              <th>Số lượng</th>
              <th>Giá</th>
              <th>mô tả chi tiết</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {(filteredProducts.length > 0 ? filteredProducts : products).map((item: any) => (
              <tr key={item.id}>
                <td><img src={item.image} alt={item.name} className="product-image" /></td>
                <td className="product-name">{item.name}</td>
                <td className="product-state">{item.state}</td>
                <td className="product-state">{item.type}</td>
                <td className="product-quantity">{item.quantity}</td>
                <td className="product-price">{formatPrice(item.price)}</td>
                <td className="product-quantity">{item.description}</td>
                
                <td className="product-buttons">
                  <button className="edit-button" onClick={() => handleEdit(item)}>Sửa</button>
                  <button className="delete-button" onClick={() => handleDelete(item.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function formatPrice(price: number | string): string {
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  } else {
    return `${price}`;
  }
}

export default Shop;
