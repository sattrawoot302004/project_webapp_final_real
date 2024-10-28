import React from 'react';
import { Mail, Phone, Users } from 'lucide-react';
import Navbar from '../components/Navbar';
function Contactpage() {
  const teamMembers = [
    {
      name: "Sattrawoot Parnemeng",
      email: "sattrawoot.p@kkumail.com",
      phone: "083-456-6681"
    },
    {
      name: "Sawit Janpan",
      email: "somying@example.com", 
      phone: "089-876-5432"
    }
  ];

  return (
        <>
        <Navbar/>
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">
          If you have any questions or need to get in touch, you can contact our team through the channels below
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-[#f8faff] rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md hover:scale-105 transform">
              <div className="p-4">
                <div className="flex items-center gap-2 font-bold text-lg text-gray-800">
                  <Users className="h-5 w-5 text-gray-700" />
                  {member.name}
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-blue-500" />
                    <a href={`mailto:${member.email}`} className="text-blue-500 hover:underline">
                      {member.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-blue-500" />
                    <a href={`tel:${member.phone}`} className="text-blue-500 hover:underline">
                      {member.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-gray-500">
          <p></p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Contactpage;