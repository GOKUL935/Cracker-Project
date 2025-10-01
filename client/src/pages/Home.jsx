import { useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import ServicesSection from "../components/ServicesSection";
import CrackersBox from "../components/CrackersBox";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Sparklers",
      image:
        "https://i5.walmartimages.com/asr/e25283c0-0d7f-4f0a-a53d-0af01ca7ef8e.04bc398101a433b4542bc9bd8294bc4a.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    },
    { name: "Flowerpots", image: "https://mycrackersshop.com/images/flowerpots.jpg" },
    {
      name: "Rockets",
      image:
        "https://www.fireworks2home.com/wp-content/uploads/2020/10/rocket-fireworks2home.com_.jpg",
    },
    {
      name: "Ground Chakkars",
      image:
        "https://www.fireworks2home.com/wp-content/uploads/2020/10/ground-chakkar-fireworks2home.com_.jpg",
    },
    {
      name: "Atom Bomb",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSXvKOxzXTagObvV-B3hJ_N0I9wY_xzXYCcaL6ZbnfHIHamE75dCTYfpqz90hisH6RJhM&usqp=CAU",
    },
    { name: "Fancy Single Shot", image: "https://moorthypyroworld.com/images/front2.webp" },
    { name: "Gun", image: "https://sakthicrackers.com/wp-content/uploads/2024/08/gun-n-bullet.png" },
    {
      name: "Multi Color Shot",
      image:
        "https://www.shutterstock.com/image-photo/fireworks-light-skynew-year-celebration-600nw-345217805.jpg",
    },
    {
      name: "Gift Boxes",
      image: "https://phool.co/cdn/shop/files/006A0282-Recoveredcopy2_1200x.webp?v=1755954204",
    },
    {
      name: "Kids Boxes",
      image: "https://jaipurfireworks.in/wp-content/uploads/2023/09/Kids-Special.png",
    },
  ];

  // 🔹 Shop Now button handler → direct products page
  const handleGoToProducts = () => {
    navigate("/products");
  };

  return (
    <div>
      {/* 🔹 Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://freestock.ai/wp-content/uploads/edd/2024/10/Vector-Illustration-of-New-Year-Fireworks-Decoration-Against-a-Blue-Background-Ideal-for-Celebrations-and-Events-Large.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "3rem", fontWeight: "bold" }}>
          🎆 Welcome to Crackers Shop 🎇
        </h1>
        <p style={{ fontSize: "1.2rem", marginTop: "10px" }}>
          Celebrate your moments with our colorful collection!
        </p>

        {/* 🔹 Shop Now Button */}
        <button
          onClick={handleGoToProducts}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            backgroundColor: "#ff6600",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Shop Now
        </button>
      </div>

      {/* 🔹 Carousel */}
      <div style={{ margin: "80px auto", maxWidth: "1550px" }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://imgcdn.iar.net.in//d992d54ae97874fee83cbb29d41bcf80044a7a395512a9c73246fe9af44c990dfddf8fba12f8c072ddec1161af02121a138355a054b5cb9acce0f61ff442a697/fit/1600/550/sm/1/plain/https://asset.iamretailer.com/goodwillstage.iar.net.in/28_10_2024/RGuBZIG/GWbanner1final.png"
              alt="First slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Brighten Your Celebrations</h3>
              <p>Best quality crackers for every occasion.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://www.malathicrackers.com/images/banner1.jpg"
              alt="Second slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Safe & Fun</h3>
              <p>Celebrate safely with eco-friendly fireworks.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://jallikattucrackers.com/wp-content/uploads/2024/07/ad26.webp"
              alt="Third slide"
              style={{ height: "400px", objectFit: "cover" }}
            />
            <Carousel.Caption>
              <h3>Festival Specials</h3>
              <p>Exclusive combos for family & kids.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* 🔹 Popular Categories */}
      <div style={{ padding: "40px 20px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>🔥 Popular Crackers</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
        {categories.map((cat, idx) => (
          <div
            key={idx}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              background: "#fff",
              boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
              <h3 style={{ margin: "15px 0" }}>{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>


      <div className="container">
      

      {/* Crackers Box Section */}
        <section className="my-5">
          <CrackersBox />
          </section>
    </div>

      {/* 🔹 Services Section */}
      <div>
        <ServicesSection />
      </div>
    </div>
  );
};

export default Home;
