import React from 'react';
import { Link } from 'react-router-dom';

export const OrganisationsLandingPage: React.FC<{}> = () => {
  return (
    <div>
      <p>Welcome to the organisations landing page stub</p>

      <Link to="/organisations/add">+ Add</Link>
    </div>
  );
};
