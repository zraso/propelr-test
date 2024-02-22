import React from 'react';
import PropertyList from './components/PropertyList';
import AddPropertyForm from './components/AddPropertyForm';

const App: React.FC = () => {
  return (
    <div>
      <h1>Real Estate App</h1>
      <PropertyList />
      <AddPropertyForm />
    </div>
  );
};

export default App;