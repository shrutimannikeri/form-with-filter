import "./styles.css";
import { useState, useEffect } from "react";
export default function App() {
  return (
    <div className="App">
      <ProductList />
    </div>
  );
}
function ProductList() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sortprice, setSortprice] = useState("");
  const fetchproducts = () => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  };
  useEffect(() => fetchproducts(), []);
  const searchTitle = (tvalue) => {
    setSearch(tvalue);
  };

  const convertPrice = () => {
    const newarr = [...products];
    let updateval = newarr.map((item, i) => {
      item.inrprice = item.price * 84;
      return item;
    });
    console.log(updateval);
    setProducts([...updateval]);
  };
  const acending = () => {
    let sortva = [];
    if (sortprice == "" || sortprice == "ace") {
      sortva = products.sort((a, b) => a.price - b.price);
      setSortprice("dce");
    } else {
      sortva = products.sort((a, b) => b.price - a.price);
      setSortprice("ace");
    }
    setProducts(sortva);
  };
  return (
    <div>
      <input
        type="text"
        id="search"
        onChange={(e) => searchTitle(e.target.value)}
        placeholder="Search title"
      />
      <table>
        <thead>
          <tr>
            <th>title</th>
            <th>brand</th>
            <th onClick={() => acending()}>price</th>
          </tr>
        </thead>
        <tbody>
          {products
            .filter((product, index) =>
              product.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((pitem, ind) => (
              <tr>
                <td>{pitem.title}</td>
                <td>{pitem.brand}</td>
                <td>{pitem.inrprice || pitem.price}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => convertPrice()}>convert $ to INR</button>
    </div>
  );
}
