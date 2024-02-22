import '@testing-library/jest-dom/extend-expect'; // Import Jest DOM matchers
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import PropertyList from './PropertyList';

jest.mock('axios');

const mockProperties = [
  { id: 1, address: '123 Main St', photo: 'example1.jpg', price: 100000 },
  { id: 2, address: '456 Elm St', photo: 'example2.jpg', price: 150000 }
];

describe('PropertyList Component', () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockProperties });
  });

  test('renders property list correctly', async () => {
    render(<PropertyList />);

    // Wait for properties to be fetched and rendered
    await waitFor(() => {
      mockProperties.forEach(property => {
        expect(screen.getByText(property.address)).toBeInTheDocument();
        expect(screen.getByText(`$${property.price}`)).toBeInTheDocument();
        expect(screen.getByAltText(property.address)).toBeInTheDocument();
      });
    });
  });
});