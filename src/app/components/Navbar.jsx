"use client"
import React from 'react'
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      width: '100%',
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '10px 20px',
      zIndex: 1000,
    },
    navbarBrand: {
      fontWeight: 'bold',
      fontSize: '20px',
      marginRight: '20px',
    },
    navbarList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flex: 1,
      justifyContent: 'flex-end',
    },
    navbarItem: {
      marginLeft: '20px',
    },
    navbarLink: {
      textDecoration: 'none',
      color: '#333',
      fontWeight: 'bold',
    },
    loginButton: {
      backgroundColor: '#007BFF',
      border: 'none',
      color: 'white',
      padding: '8px 15px',
      cursor: 'pointer',
      borderRadius: '5px',
      marginLeft: '20px',
    },
    logoutButton:{
      backgroundColor: 'red',
      border: 'none',
      color: 'white',
      padding: '8px 15px',
      cursor: 'pointer',
      borderRadius: '5px',
      marginLeft: '20px',
    },
    introductionSection: {
      backgroundColor: '#51A74D',
      color: 'white',
      padding: '60px 20px',
      textAlign: 'center',
      height: '100vh',  // Full viewport height
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    introductionHeading: {
      marginBottom: '20px',
      fontSize: '36px',  // Larger text size for the heading
    },
    introductionButton: {
      backgroundColor: '#fff',
      color: '#51A74D',
      padding: '6px 10px',  // ลด padding ให้เล็กลงเพื่อลดขนาดของปุ่ม
      borderRadius: '5px',
      fontWeight: 'bold',
      textDecoration: 'none',
      display: 'inline-block',
      marginTop: '20px',
      fontSize: '14px',  // ลดขนาดของตัวอักษรปุ่ม
      width: 'auto',  // ให้ขนาดปุ่มขึ้นอยู่กับเนื้อหาภายใน
      minWidth: '80px',  // ลดความกว้างขั้นต่ำเพื่อความสมดุล
      cursor: 'pointer',
    },
    aboutSection: {
      backgroundColor: '#ffffff',
      padding: '40px 20px',
      borderTop: '1px solid #eaeaea',
      textAlign: 'center',
    },
    aboutDescription: {
      maxWidth: '800px',  // Set a maximum width for better text alignment
      margin: '0 auto',
      lineHeight: '1.6',  // Improved line spacing
      fontSize: '16px',  // Adjusted font size for better readability
    },
    newsSection: {
      backgroundColor: '#f9f9f9',
      padding: '40px 20px',
      textAlign: 'center',
    },
    newsContainer: {
      display: 'flex',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      textAlign: 'center',
    },
    newsItem: {
      width: '45%',
      padding: '10px',
      boxSizing: 'border-box',
      marginBottom: '20px',
      textAlign: 'center',
    },
    newsImagePlaceholder: {
      width: '100%',
      height: '200px',
      backgroundColor: '#ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '8px',
      fontSize: '24px',
      color: '#666',
      marginBottom: '10px',
    },
    contactSection: {
      backgroundColor: '#51A74D',
      color: 'white',
      textAlign: 'center',
      padding: '40px 20px',
    },
    contactButton: {
      backgroundColor: '#fff',
      color: '#51A74D',
      padding: '10px 20px',
      borderRadius: '5px',
      fontWeight: 'bold',
      textDecoration: 'none',
      display: 'inline-block',
      marginTop: '20px',
    },
    footer: {
      backgroundColor: '#333333',  // Different color for contrast
      color: 'white',
      textAlign: 'center',
      padding: '10px',  // Reduced padding for a more compact footer
    },
    footerText: {
      marginBottom: '5px',
      fontSize: '14px',  // Adjusted font size for better fit
    },
    copyright: {
      marginTop: '5px',
      fontSize: '14px',
      color: '#ffffff',
    },
  };

function Navbar({session}) {
  return (
    <div className="homepage">
    <nav  style={styles.navbar}>
      <div style={styles.navbarBrand}><Link href='/'>ChatBot Sugarcane</Link></div>
      <ul style={styles.navbarList}>

        <li style={styles.navbarItem}><a href="#introduction" style={styles.navbarLink}>Introduction</a></li>
        <li style={styles.navbarItem}><Link href="/about" style={styles.navbarLink}>About</Link></li>
        <li style={styles.navbarItem}><Link href="/contact" style={styles.navbarLink}>Contact</Link></li>
      </ul>
      {!session ? (
          <>
          <button style={styles.loginButton}><Link href = '/login'>Login</Link></button>
          <button style={styles.loginButton}><Link href = '/register'  >Register</Link></button>
          </>
        ) : 
        <button style={styles.logoutButton} onClick={() => signOut({ callbackUrl: '/welcome' })} >Logout</button>
        }
     
  
    </nav>
    </div>
  )
}

export default Navbar