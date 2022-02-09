import React from 'react';
import { Link } from 'react-router-dom';

// Npm modules
import { Card, Button } from 'react-bootstrap';

// Import custom modules
import { useAuth } from '../../../contexts/AuthContext';
import AuthLayout from '../../Layout/AuthLayout';

const Dashboard = () => {
  const { user, onLogout } = useAuth();

  return (
    <AuthLayout>
      <Card>
        <Card.Body>
          <div className="text-center mb-4">
            <h2 className="mb-4">Profile</h2>
            <h4>Welcome { user ? user.user.username : null }!</h4>
          </div>
          <strong>Email: </strong>{ user ? user.user.email : null }
          { user && user.user.isAdmin ? 
            <p><strong>Secret: </strong> Hello Admin - nice to see you here</p>
            : null 
          }
          {/* Non-Functional Update Link */}
          <Link to="/restaurant" className="btn btn-primary w-100 mt-3">Find A Restaurant That Suites You.</Link>
        </Card.Body>
      </Card>
      {/* Log Out & Forces a Redirect */}
      { user &&
        <div className="w-100 text-center mt-4">
          <Button variant="link" onClick={() => { onLogout() }}>Log Out</Button>
        </div>
      }
    </AuthLayout>
  )
}

export default Dashboard