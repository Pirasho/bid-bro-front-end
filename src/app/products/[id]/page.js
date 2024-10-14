// app\editProduct\[id]\page.js
import EditProductForm from "../components/EditProductForm";

const getProductById = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.statusText}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Error fetching product:", error);
        return null;
    }
};

export default async function EditProduct({ params }) {
    const { id } = params;
    const productData = await getProductById(id);

    if (!productData || !productData.product) {
        return <div>Failed to load product data.</div>;
    }

    const { name, image, price, category } = productData.product;

    return (
        <EditProductForm
            id={id}
            name={name}
            image={image}
            price={price}
            category={category}
        />
    );
}
