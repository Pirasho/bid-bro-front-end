
"use client";
import React from 'react';

const Receipt = ({ items }) => {
    const total = items.reduce((acc, item) => acc + item.price, 0);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div style={styles.receipt}>
            <h2 style={styles.header}>Receipt</h2>
            <div style={styles.items}>
                {items.map((item, index) => (
                    <div key={index} style={styles.item}>
                        {item.name} <span>${item.price.toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div style={styles.total}>
                <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <div style={styles.footer}>
                Thank you for your purchase!<br />
                Visit us again!
            </div>
            <button onClick={handlePrint} style={styles.printButton}>Print Receipt</button>
        </div>
    );
};

const styles = {
    // ... (rest of the styles)
    printButton: {
        marginTop: '20px',
        padding: '10px 20px',
        border: 'none',
        backgroundColor: '#6200ee',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
    },
};
export default Receipt;
