// pages/blocked.js

import React from 'react';

export default function Blocked() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Access Denied</h1>
      <p>You have made too many requests in a short period. Please try again later.</p>
    </div>
  );
}
