import React from 'react';
import { MessageSquare, Sun, Database, Bell, Target, Phone } from 'lucide-react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
const AboutPage = () => {
  const features = [
    {
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      title: "24-hour consultation available",
      description: "Ready to answer questions and provide advice whenever you need"
    },
    {
      icon: <Database className="w-6 h-6 text-green-600" />,
      title: "Comprehensive Information",
      description: "From soil preparation, variety selection, maintenance, through to harvesting"
    },
  ];

  const highlights = [
    {
      icon: <Target className="w-6 h-6 text-blue-600" />,
      title: "Accurate",
      description: "Correct, up-to-date, and reliable information"
    },
    {
      icon: <Sun className="w-6 h-6 text-blue-600" />,
      title: "Easy to use",
      description: "Designed for convenience, not complicated"
    }
  ];

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          🌱 ChatBot Sugarcane
        </h1>
        <p className="text-xl text-gray-600">
        Intelligent Assistant for Sugarcane Farmers
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Capabilities</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-lg font-semibold ml-2">{feature.title}</h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Knowledge Base Section */}
      <div className="max-w-4xl mx-auto mb-16 bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Our Knowledge Base</h2>
        <ul className="space-y-4 text-gray-600">
          <li className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            Modern sugarcane farming research and technology
          </li>

        </ul>
      </div>

      {/* Highlights Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">Our Key Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
              <div className="flex items-center mb-4">
                {highlight.icon}
                <h3 className="text-lg font-semibold ml-2">{highlight.title}</h3>
              </div>
              <p className="text-gray-600">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto text-center bg-white rounded-lg shadow-md p-8 cursor-pointer 
                    hover:shadow-xl hover:scale-105 hover:bg-blue-50 
                    transition-all duration-300">
        <h2 className="text-2xl font-bold mb-6"><Link href='/contact' className="hover:text-blue-600 transition-colors">Contact Us</Link></h2>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto text-center mt-16">
        <p className="text-gray-600 italic">
        SugarGuide AI - Your Trusted Partner for Modern Farmers
        </p>
      </div>
    </div>
    </>
  );
};

export default AboutPage;