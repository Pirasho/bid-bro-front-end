// public/payhere.js

function loadPayHere() {
    const script = document.createElement('script');
    script.src = 'https://www.payhere.lk/lib/payhere.js';
    script.async = true;
    document.body.appendChild(script);
}

export { loadPayHere };
