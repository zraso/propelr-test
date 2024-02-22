import React, { useState } from 'react';
import axios from 'axios';
import './AddPropertyForm.css'; 

interface PropertyFormData {
  address: string;
  photo: string;
  price: number;
}

const AddPropertyForm: React.FC = () => {
  const [formData, setFormData] = useState<PropertyFormData>({
    address: '',
    photo: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post('http://localhost:3000/api/properties', formData)
      .then(response => console.log('Property added:', response.data))
      .catch(error => console.error('Error adding property:', error));
  };

  return (
    <form className="add-property-form" onSubmit={handleSubmit}>
      <h2>Add Property</h2>
      <label>Address:</label>
      <input type="text" name="address" value={formData.address} onChange={handleChange} required />
      <label>Photo:</label>
      <input type="text" name="photo" value={formData.photo} onChange={handleChange} required />
      <label>Price:</label>
      <input type="number" name="price" value={formData.price} onChange={handleChange} required />
      <button type="submit">Add Property</button>
    </form>
  );
};

export default AddPropertyForm;