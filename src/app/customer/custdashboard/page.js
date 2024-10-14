"use client";
import Startnav from '@/app/widgets/startnav/page';
import Startfooter from '@/app/widgets/startfooter/page';
import Chatbot from '@/app/widgets/chatbot/page';
import Image from 'next/image';
import { useRouter } from 'next/navigation';




function HomePage() {
    const router = useRouter();

    const iteams = [
        { id: 1, name: "iPhone 12", offer: "Upto 70% Off", image: "/images/2.png" },
        { id: 2, name: "Hp Laptops", offer: "From 145000", image: "/images/lap.jpg" },
        { id: 3, name: "Fridge", offer: "From 299000", image: "/images/fridge.jpg" },
        { id: 4, name: " Lap tops  ", offer: "From 149000", image: "/images/laptops.jpg" },
        { id: 5, name: "Smart Phones  ", offer: "From 49900", image: "/images/smartphones.webp" },
        { id: 6, name: "Air pods", offer: "From 11999", image: "/images/airpot.png" },
        { id: 7, name: "Music Devices ", offer: "From 12299", image: "/images/audio devices.jpg " },
    ];
    const products = [
        {
            title: "Samsungs24",
            description: "Latest",
            price: "400000.00",
            image: "/images/samsungs24.webp", // Replace with actual image path
            category: "Mobile Phones"
        },
        {
            title: "iPhone13pro",
            description: "Best of 2023",
            price: "300000.00",
            image: "/images/product_1.webp", // Replace with actual image path
            category: "Laptops"

        },
        {
            title: "iPhone15",
            description: "Women's Needs",
            price: "450000.00",
            image: "/images/iphone15.webp", // Replace with actual image path
            category: "Mobile Phones"

        },
        {
            title: "iPhone12",
            description: "Energy & Immune Support",
            price: "240000.00",
            image: "/images/iphone.jpg", // Replace with actual image path
            category: "Mobile Phones"


        },
        // ... other products
    ];
    const category = [
        {
            category: "Mobile Phones",

        }
    ];

    return (
        <div className=''>
            <Startnav />
            <Chatbot />
            <div className="container mx-auto">
                <div className="container mx-auto py-8">
                    <h2 className="text-2xl font-bold mb-4">advertisement</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
                        {iteams.map((product) => (
                            <div key={product.id} className="bg-white flex flex-col items-center justify-center rounded-lg shadow-lg p-4">
                                <Image src={product.image} alt={product.name} width={200} height={200} className="mx-auto" />
                                <h3 className="text-lg font-bold mt-2 text-center">{product.name}</h3>
                                <p className="text-sm text-gray-500 text-center">{product.offer}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {category.map((items) => (
                    <h1 className="text-3xl font-bold mb-10 mt-8">{items.category}</h1>
                ))}

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.title} className="flex flex-col items-center justify-center border p-4">
                            <Image src={product.image} alt={product.title} width={200} height={200} />
                            <h2 className="text-xl font-bold">{product.title}</h2>
                            <p>{product.description}</p>
                            <p className="text-red-500 font-bold">{product.price}</p>
                            <button className='btn p-2 btn-primary text-white font-bold py-2 px-4 rounded' onClick={() => router.push("/customer/product_details")}>
                                BiD
                            </button>
                        </div>
                    ))}

                </div>
                {category.map((items) => (
                    <h1 className="text-3xl font-bold mb-10 mt-8">{items.category}</h1>
                ))}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.title} className="flex flex-col items-center justify-center border p-4">
                            <Image src={product.image} alt={product.title} width={200} height={200} />
                            <h2 className="text-xl font-bold">{product.title}</h2>
                            <p>{product.description}</p>
                            <p className="text-red-500 font-bold">{product.price}</p>
                            <button className='btn p-2 btn-primary text-white font-bold py-2 px-4 rounded' onClick={() => router.push("/customer/product_details")}>
                                BiD
                            </button>
                        </div>
                    ))}
                </div>
                <h1 className="text-3xl font-bold mb-10 mt-8">Taps</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product.title} className="flex flex-col items-center justify-center border p-4">
                            <Image src={product.image} alt={product.title} width={200} height={200} />
                            <h2 className="text-xl font-bold">{product.title}</h2>
                            <p>{product.description}</p>
                            <p className="text-red-500 font-bold">{product.price}</p>
                            <button className='btn p-2 btn-primary text-white font-bold py-2 px-4 rounded' onClick={() => router.push("/customer/product_details")}>
                                BiD
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <Startfooter />
        </div>


    );
}

export default HomePage;













