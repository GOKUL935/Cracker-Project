import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import "./CrackersBox.css";


function CrackersBox() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Atom Bomb", price: 50, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXvKOxzXTagObvV-B3hJ_N0I9wY_xzXYCcaL6ZbnfHIHamE75dCTYfpqz90hisH6RJhM&usqp=CAU" },
    { id: 2, name: "Flower Pots", price: 100, img: "https://mycrackersshop.com/images/flowerpots.jpg" },
    { id: 3, name: "Sparklers", price: 40, img: "https://i5.walmartimages.com/asr/e25283c0-0d7f-4f0a-a53d-0af01ca7ef8e.04bc398101a433b4542bc9bd8294bc4a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF" },
    { id: 4, name: "Rockets", price: 120, img: "https://www.fireworks2home.com/wp-content/uploads/2020/10/rocket-fireworks2home.com_.jpg" },
    { id: 5, name: "Chakkars", price: 80, img: "https://www.fireworks2home.com/wp-content/uploads/2020/10/ground-chakkar-fireworks2home.com_.jpg" },
    { id: 6, name: "1000 Wala", price: 400, img: "https://5.imimg.com/data5/ANDROID/Default/2022/12/IM/HF/XK/83792159/product-jpeg.jpg" },
    { id: 7, name: "Naatu vedi", price: 150, img: "https://cdn.dotpe.in/longtail/item_thumbnails/7792573/UvVanMBC-800-800.webp" },
    { id: 8, name: "Bijili vedi", price: 50, img: "https://imgcdn.iar.net.in/d992d54ae97874fee83cbb29d41bcf80044a7a395512a9c73246fe9af44c990dfddf8fba12f8c072ddec1161af02121a138355a054b5cb9acce0f61ff442a697/fit/270/270/sm/1/plain/https://assetv2.iar.net.in/trial1064.iar.net.in/24_9_2024/LntHRV9/bijili2.JPG" },
    { id: 9, name: "Sky shot crakers", price: 350, img: "https://siyafireworks.com/wp-content/uploads/2020/10/1603535210347.-400x400.jpg" },
    { id: 10, name: "Pencil", price: 30, img: "https://tamilnaducrackers.com/wp-content/uploads/2022/08/3-3.jpg" },
    { id: 11, name: "Swarashvathi", price: 50, img: "https://5.imimg.com/data5/SELLER/Default/2022/11/ZT/BU/YA/8175186/deluxe-lakshmi-crackers.png" },
    { id: 12, name: "Lakshmi", price: 80, img: "https://5.imimg.com/data5/SELLER/Default/2024/9/451830912/YG/XP/KP/36275315/4-gold-laxmi-crackers-500x500.jpg" },
    { id: 13, name: "Multi Sky Shot", price: 450, img: "https://butterflycrackers.com/sites/default/files/styles/product_images/public/crackers/120_shots_1.png.webp?itok=laHVEWy9" },
    { id: 14, name: "Rainbow Smoke", price: 100, img: "https://www.bbassets.com/media/uploads/p/l/40116492_1-standard-crackers-colour-smoke-rainbow-fog.jpg" },
    { id: 15, name: "Cylinder Bomb", price: 200, img: "https://balaganapathyfireworks.com/assets/product/0833719001755591371_860_860.jpg" },
    { id: 16, name: "Twinkling Star", price: 30, img: "https://www.kaliswari-fireworks.com/img/products/twinkling/3.jpg" },
    { id: 17, name: "Guiter", price: 200, img: "https://brindacrackers.in/wp-content/uploads/2025/08/classic_gitar-removebg-preview.png" },
    { id: 18, name: "Fancy Fountains", price: 100, img: "https://bijili.s3.ap-south-1.amazonaws.com/product/bij_170.jpg" },
    { id: 19, name: "Wonderful Peacock ", price: 150, img: "https://www.sayeecrackers.com/wp-content/uploads/2023/11/4-Peacock-Silver-Shower-Fountain-1-Piece.jpg" },
    { id: 20, name: "Colour Matchbox", price: 80, img: "https://5.imimg.com/data5/SELLER/Default/2023/9/344907888/HP/NT/VQ/41325297/100-gsm-fire-cracker-packaging-duplex-box-500x500.jpeg" },

  ];

  const [selected, setSelected] = useState({});

  const handleChange = (id, value) => {
    setSelected((prev) => ({
      ...prev,
      [id]: Number(value),
    }));
  };

  const total = products.reduce(
    (acc, p) => acc + (selected[p.id] || 0) * p.price,
    0
  );

  const handleAddToCart = () => {
    products.forEach((p) => {
      if (selected[p.id]) {
        addToCart({ ...p, quantity: selected[p.id] });
      }
    });
    alert("✅ Selected crackers added to cart!");
    setSelected({});
  };

  return (
    <div className="container my-5 crackers-section">
      <h2 className="mb-4 text-center fw-bold text-success">🎁 Create Your Gift Cracker Box</h2>
      <p className="text-center text-muted">
        Select your favourite crackers pieces and make your own custom box!
      </p>

      <div className="row">
        {products.map((p) => (
          <div key={p.id} className="col-md-4 col-lg-3 mb-4">
            <div className="card h-100 shadow-lg border-0 rounded-4">
              <img
                src={p.img}
                className="card-img-top p-3"
                alt={p.name}
                style={{ height: "180px", objectFit: "contain" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text text-primary fw-bold">₹{p.price}</p>
                <input
                  type="number"
                  min="0"
                  value={selected[p.id] || ""}
                  onChange={(e) => handleChange(p.id, e.target.value)}
                  className="form-control text-center"
                  placeholder="Qty"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Total + Add button */}
      <div className="text-center mt-4">
        <h4 className="fw-bold">Total: ₹{total}</h4>
        <button
          className="btn btn-success btn-lg mt-2 px-4 rounded-pill shadow"
          onClick={handleAddToCart}
          disabled={total === 0}
        >
          Add Selected to Cart 🛒
        </button>
      </div>
    </div>
  );
}

export default CrackersBox;
