import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main id="content">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default DefaultLayout;