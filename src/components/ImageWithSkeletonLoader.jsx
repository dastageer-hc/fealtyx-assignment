import React, { useState } from 'react';
import './ImageWithSkeleton.css';

const ImageWithSkeleton = ({ src, alt, className = '' }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className="image-wrapper">
            {!loaded && <div className="image-skeleton" />}
            <img
                src={src}
                alt={alt}
                className={`product-img ${loaded ? 'loaded' : 'hidden'} ${className}`}
                onLoad={() => setLoaded(true)}
            />
        </div>
    );
};

export default ImageWithSkeleton;
