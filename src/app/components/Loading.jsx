import '../styles/loading.css';

export default function Loading() {

    return (
        <div className="loading">
            <div className="spinner"></div>
            <p style={{ margin: 0, fontWeight: 'bold', marginTop: '0.5rem' }}>Loading...</p>
        </div>
    );

};
