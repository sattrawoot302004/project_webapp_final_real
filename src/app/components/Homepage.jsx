"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from 'next/navigation'

const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'fixed',
      top: 0,
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

function Homepage(){

  const { data: session } = useSession();
    if (!session) redirect('/login');
    console.log(session);

    return (




        <div className="homepage">
        <section id="introduction" style={styles.introductionSection}>
          <h1 style={styles.introductionHeading}>Welcome {session?.user?.email} to Sugarcane – Your Friendly, AI-powered Chatbot!</h1>
          <p>Sugarcane is an AI-powered chatbot designed to assist with tasks, provide instant answers, and offer personalized support. Experience seamless, conversational help tailored to your needs!</p>
          <Link href="/chat" style={styles.introductionButton}>
          <span>Get Start ➔</span>
        </Link>
        </section>
  
        <section id="about" style={styles.aboutSection}>
          <h2>About ChatBot</h2>
          <p style={styles.aboutDescription}>
            Our chatbot is an AI-powered assistant designed to provide instant answers, automate tasks, and offer personalized support. With a friendly, conversational interface, it ensures seamless, real-time assistance whenever you need it.
          </p>
        </section>
  
        <section id="news" style={styles.newsSection}>
          <h2>News</h2>
          <div style={styles.newsContainer}>
            <div style={styles.newsItem}>
              <div style={styles.newsImagePlaceholder}>600 x 400</div>
              <p>News about Sugarcane</p>
            </div>
            <div style={styles.newsItem}>
              <div style={styles.newsImagePlaceholder}>600 x 400</div>
              <p>News about Sugarcane</p>
            </div>
            <div style={styles.newsItem}>
              <div style={styles.newsImagePlaceholder}>600 x 400</div>
              <p>News about Sugarcane</p>
            </div>
            <div style={styles.newsItem}>
              <div style={styles.newsImagePlaceholder}>600 x 400</div>
              <p>News about Sugarcane</p>
            </div>
          </div>
        </section>
  
        <section id="contact" style={styles.contactSection}>
          <h2>Need help or have questions?</h2>
          <p>Reach out to our support team via email, phone, or chat, and we'll be happy to assist you!</p>
          <a href="#contact" style={styles.contactButton}>Contact Us</a>
        </section>
  
        <footer style={styles.footer}>
          <p style={styles.copyright}>Copyright 2024</p>
        </footer>
      </div>
    );


}export default Homepage;
