import React from 'react';
import Receipt from '../../components/Receipt';

const ReceiptPage = () => {
    const itemsPurchased = [
        { name: 'Item 1', price: 10.00 },
        { name: 'Item 2', price: 15.50 },
        { name: 'Item 3', price: 7.25 },
    ];

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Receipt items={itemsPurchased} />
        </div>
    );
};

export default ReceiptPage;
