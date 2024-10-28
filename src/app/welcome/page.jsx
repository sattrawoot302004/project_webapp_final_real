"use client";
import React, { useState, useEffect, useRef } from 'react';
import Navbar from "../components/Navbar";
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

function Welcomepage(){

  const currentYear = new Date().getFullYear();
  
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => {
        // Change direction when reaching boundaries
        if (prev > 200) {
          setDirection(-1);
          return 200;
        }
        if (prev < -200) {
          setDirection(1);
          return -200;
        }
        return prev + direction;
      });
    };

    const interval = setInterval(animate, 50);
    return () => clearInterval(interval);
  }, [direction]);



  const { data: session } = useSession();
    console.log(session);

    return (
        <div>

        <div>
            <Navbar session = {session}/>
        </div>

        <div className="homepage">
        <section id="introduction" style={styles.introductionSection}>
          <h1  style={{ transform: `translateX(${position}px)`  }} className="text-3xl md:text-4xl font-bold whitespace-nowrap my-10" >Welcome {session?.user?.email} to Sugarcane – Your Friendly, AI-powered Chatbot!</h1>
          <p className='text-2xl'>Sugarcane is an AI-powered chatbot designed to assist with tasks, provide instant answers, and offer personalized support. Experience seamless, conversational help tailored to your needs!</p>
          <Link href="/chat" style={styles.introductionButton}>
          <span>Get Start ➔</span>
        </Link>
        </section>
  
        <section id="about" style={styles.aboutSection}>
          <h2 className='text-2xl my-4'>About ChatBot</h2>
          <p style={styles.aboutDescription} className='text-2xl'>
            Our chatbot is an AI-powered assistant designed to provide instant answers, automate tasks, and offer personalized support. With a friendly, conversational interface, it ensures seamless, real-time assistance whenever you need it.
          </p>
        </section>
  
        
        
  
        <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About Us</h3>
            <p className="text-gray-600">
              We are dedicated to providing excellent service and support to all our customers.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-blue-500 hover:text-blue-600">Home</a>
              </li>
              <li>
                <a href="/about" className="text-blue-500 hover:text-blue-600">About</a>
              </li>
              <li>
                <a href="/contact" className="text-blue-500 hover:text-blue-600">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-600">Email: sattrawoot.p@kkumail.com</p>
            <p className="text-gray-600">Phone: 083-456-6681</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500">
            © {currentYear} Your Company Name. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
      </div>
      </div>
    );


}export default Welcomepage;
