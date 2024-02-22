import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PropertyList.css';

export interface Property {
    id: number;
    address: string;
    photo: string;
    price: number;
}

const PropertyList: React.FC = () => {
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        axios.get<Property[]>('http://localhost:3000/api/properties')
            .then(response => setProperties(response.data))
            .catch(error => console.error('Error fetching properties:', error))
    }, []);

    return (
         <div className="property-list">
      {properties.map((property, index) => (
        <div key={index} className="property-item">
          <img src={property.photo} alt={property.address} />
          <div className="property-address">{property.address}</div>
          <div className="property-price">{property.price}</div>
        </div>
      ))}
    </div>
    )
}

export default PropertyList;