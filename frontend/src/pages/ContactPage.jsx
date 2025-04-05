import React, { useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/contacts', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      if (response.status === 201 || response.status === 200) {
        setStatusMessage('Message sent successfully!');
        setFormData({
          full_name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setStatusMessage('Failed to send message.');
      }
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-[#1a1a1a] min-h-screen">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-gradient-to-r from-[#FFDF00]/10 to-[#DFBF00]/10 rounded-full blur-3xl"></div>

        {/* Contact Header */}
        <div className="text-center mb-16 relative z-10">
          <h1 className="text-5xl font-extrabold mb-6 text-[#FFDF00]">
            Let's Connect
            <span className="block mt-2 text-2xl text-gray-300">
              Power Up Your Gaming Experience
            </span>
          </h1>
          <p className="text-xl leading-relaxed text-gray-300 max-w-2xl mx-auto">
            Reach out for collaborations, gaming discussions, or just to chat about the latest releases.
            Our team is passionate about connecting with the gaming community.
          </p>
          <div className="mt-6">
            <a
              href="mailto:07asn.m@gmail.com"
              className="inline-flex items-center text-[#FFDF00] hover:text-[#DFBF00] transition-colors group"
            >
              <span className="mr-2 text-lg">07ASN.M@gmail.com</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:translate-x-1 transition-transform"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Contact Content */}
        <div className="flex flex-col lg:flex-row gap-8 relative z-10">
          {/* Contact Info */}
          <div className="flex-1 bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-[#1a1a1a]">
              <span className="bg-[#FFDF00] px-2 py-1 rounded-md">Direct Connections</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {[
                { icon: 'fa-envelope', href: 'mailto:07asn.m@gmail.com', label: 'Email' },
                { icon: 'fa-whatsapp', href: 'tel:+962788862798', label: 'WhatsApp' },
                { icon: 'fa-twitter', href: 'https://x.com/O7asn', label: 'X' },
                { icon: 'fa-youtube', href: 'https://www.youtube.com/@i7asn', label: 'YouTube' },
                { icon: 'fa-instagram', href: 'https://www.instagram.com/07asn/', label: 'Instagram' },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-6 rounded-xl bg-white hover:bg-[#FFDF00]/10 transition-all duration-300 border border-gray-200"
                >
                  <i className={`fab ${link.icon} text-4xl mb-4 text-[#DFBF00]`}></i>
                  <span className="text-gray-800 font-medium group-hover:text-[#1a1a1a] transition-colors">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1 bg-gray-100 p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-8 text-[#1a1a1a]">
              <span className="bg-[#FFDF00] px-2 py-1 rounded-md">Send a Message</span>
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  id="full_name"
                  placeholder=" "
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-[#DFBF00] focus:ring-2 focus:ring-[#FFDF00]/50 peer transition-all"
                  required
                />
                <label
                  htmlFor="full_name"
                  className="absolute left-4 -top-2.5 px-1 text-gray-500 text-sm bg-gray-50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1a1a1a] transition-all"
                >
                  Full Name
                </label>
              </div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  placeholder=" "
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-[#DFBF00] focus:ring-2 focus:ring-[#FFDF00]/50 peer transition-all"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 px-1 text-gray-500 text-sm bg-gray-50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1a1a1a] transition-all"
                >
                  Email Address
                </label>
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="subject"
                  placeholder=" "
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-[#DFBF00] focus:ring-2 focus:ring-[#FFDF00]/50 peer transition-all"
                />
                <label
                  htmlFor="subject"
                  className="absolute left-4 -top-2.5 px-1 text-gray-500 text-sm bg-gray-50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1a1a1a] transition-all"
                >
                  Subject
                </label>
              </div>
              <div className="relative">
                <textarea
                  id="message"
                  placeholder=" "
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 placeholder-transparent focus:outline-none focus:border-[#DFBF00] focus:ring-2 focus:ring-[#FFDF00]/50 peer transition-all resize-none h-32"
                  required
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-4 -top-2.5 px-1 text-gray-500 text-sm bg-gray-50 peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#1a1a1a] transition-all"
                >
                  Your Message
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-4 px-6 font-bold text-[#1a1a1a] bg-[#FFDF00] rounded-lg transition-all duration-300 hover:bg-[#DFBF00] hover:shadow-lg hover:shadow-[#FFDF00]/20 active:scale-95"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'} <span className="ml-2">▶</span>
              </button>
            </form>
            {statusMessage && (
              <p className="mt-4 text-center text-sm text-[#1a1a1a]">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
