import ProductList from "../components/Productlist";
import Header from "../components/Header";

export default function Home({ children }) {
  return (
    <>
      <Header />
      <div>{children}</div>
      <ProductList />
    </>
  );
}
