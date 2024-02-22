import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import AddPropertyForm from './AddPropertyForm';

const axiosMock = new MockAdapter(axios);

describe('AddPropertyForm Component', () => {
  beforeEach(() => {
    axiosMock.reset();
  });

  test('renders Add Property form correctly', () => {
    render(<AddPropertyForm />);
    expect(screen.getByText('Add Property')).toBeInTheDocument();
    expect(screen.getByLabelText('Address:')).toBeInTheDocument();
    expect(screen.getByLabelText('Photo:')).toBeInTheDocument();
    expect(screen.getByLabelText('Price:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Property' })).toBeInTheDocument();
  });

  test('updates form fields when input changes', () => {
    render(<AddPropertyForm />);
    const addressInput = screen.getByLabelText('Address:');
    const photoInput = screen.getByLabelText('Photo:');
    const priceInput = screen.getByLabelText('Price:');

    fireEvent.change(addressInput, { target: { value: '123 Main St' } });
    fireEvent.change(photoInput, { target: { value: 'example.jpg' } });
    fireEvent.change(priceInput, { target: { value: '100000' } });

    expect(addressInput).toHaveValue('123 Main St');
    expect(photoInput).toHaveValue('example.jpg');
    expect(priceInput).toHaveValue('100000');
  });

  test('submits form data and adds property on form submission', async () => {
    const mockFormData = {
      address: '123 Main St',
      photo: 'example.jpg',
      price: 100000
    };

    axiosMock.onPost('http://localhost:3000/api/properties', mockFormData).reply(200);

    render(<AddPropertyForm />);
    const addressInput = screen.getByLabelText('Address:');
    const photoInput = screen.getByLabelText('Photo:');
    const priceInput = screen.getByLabelText('Price:');
    const addButton = screen.getByRole('button', { name: 'Add Property' });

    fireEvent.change(addressInput, { target: { value: mockFormData.address } });
    fireEvent.change(photoInput, { target: { value: mockFormData.photo } });
    fireEvent.change(priceInput, { target: { value: mockFormData.price.toString() } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(axiosMock.history.post.length).toBe(1);
      expect(axiosMock.history.post[0].data).toEqual(JSON.stringify(mockFormData));
    });
  });

  test('displays error message on failed form submission', async () => {
    const errorMessage = 'Failed to add property';
    axiosMock.onPost('http://localhost:3000/api/properties').reply(500, { error: errorMessage });

    render(<AddPropertyForm />);
    const addButton = screen.getByRole('button', { name: 'Add Property' });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });
});
