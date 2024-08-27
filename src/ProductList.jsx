import React, { useEffect, useState } from 'react';

const Product = ({ item }) => {
    return (
        <a href={item.itemUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="product" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={item.mediumImageUrls[0].imageUrl}
                    alt={item.itemName}
                    style={{ maxWidth: '100px', marginRight: '16px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '600px' }}>
                    <p style={{
                        margin: 0,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}>
                        {item.itemName}
                    </p>
                    <p style={{ margin: 0, color: '#bf0000' }}>¥{item.itemPrice}円</p>
                </div>
            </div>
        </a>
    );
};

const ProductList = ({keyword}) => {
    const [productData, setProductData] = useState(null);

    useEffect(() => {
        const encodedKeyword = encodeURIComponent(keyword);
        const apiUrl = `https://app.rakuten.co.jp/services/api/IchibaItem/Search/20220601?format=json&keyword=${encodedKeyword}&hits=3&applicationId=1077188838370490177`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => setProductData(data))
            .catch(error => console.error('Error fetching the product data:', error));
    }, [keyword]);

    if (!productData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="product-list">
            {productData.Items.map((product, index) => (
                <Product key={index} item={product.Item} />
            ))}
        </div>
    );
};

export default ProductList;