"use client";
import { useRouter } from "next/navigation";

export default function RemoveBtn({ id }) {
  const router = useRouter();

  const removeProduct = async () => {
    const confirmed = confirm(" Are you sure you want to delete this product?");

    if (confirmed) {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <button onClick={removeProduct} className="bg-purple-400 text-white py-1 px-3 rounded-lg hover:bg-purple-900">
  Delete
</button>

  );
}
