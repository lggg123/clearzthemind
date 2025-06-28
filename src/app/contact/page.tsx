'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, Mail, MessageSquare, Building, MapPin, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'investment'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center p-8"
        >
          <CheckCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-green-400 mb-4">Message Sent Successfully!</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-md mx-auto">
            Thank you for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 no-underline"
              style={{ textDecoration: 'none', color: 'white' }}
            >
              Back to Pitch
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  name: '',
                  email: '',
                  company: '',
                  role: '',
                  phone: '',
                  subject: '',
                  message: '',
                  inquiryType: 'investment'
                });
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              Send Another Message
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        a, a:hover, a:focus, a:active, a:visited {
          text-decoration: none !important;
        }
        .no-underline {
          text-decoration: none !important;
        }
        .no-underline:hover {
          text-decoration: none !important;
        }
        /* Force override any background color classes */
        .bg-green-400 {
          background-color: #4ade80 !important;
        }
        .bg-cyan-400 {
          background-color: #22d3ee !important;
        }
        .bg-purple-400 {
          background-color: #c084fc !important;
        }
        .text-green-400 {
          color: #4ade80 !important;
        }
        .text-cyan-400 {
          color: #22d3ee !important;
        }
        .text-purple-400 {
          color: #c084fc !important;
        }
        .text-blue-400 {
          color: #60a5fa !important;
        }
      `}</style>
      <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-6 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors no-underline"
              style={{ textDecoration: 'none', color: '#9ca3af' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Contact FRANK Robotics
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Title Section */}
          <div className="text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl font-black mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl text-gray-300"
            >
              Ready to transform mental healthcare? Let&apos;s start the conversation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form - Now Prominent */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                      What can we help you with?
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
                      style={{ 
                        fontSize: 'clamp(16px, 2.5vw, 20px)',
                        padding: 'clamp(16px, 3vw, 28px)',
                        minHeight: 'clamp(56px, 8vw, 72px)'
                      }}
                      required
                    >
                      <option value="investment">💰 Investment Opportunity</option>
                      <option value="partnership">🤝 Partnership Inquiry</option>
                      <option value="clinical">🏥 Clinical Collaboration</option>
                      <option value="media">📺 Media & Press</option>
                      <option value="general">❓ General Inquiry</option>
                    </select>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
                        style={{ 
                          fontSize: 'clamp(16px, 2.5vw, 20px)',
                          padding: 'clamp(16px, 3vw, 28px)',
                          minHeight: 'clamp(56px, 8vw, 72px)'
                        }}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
                        style={{ 
                          fontSize: 'clamp(16px, 2.5vw, 20px)',
                          padding: 'clamp(16px, 3vw, 28px)',
                          minHeight: 'clamp(56px, 8vw, 72px)'
                        }}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
                        style={{ 
                          fontSize: 'clamp(16px, 2.5vw, 20px)',
                          padding: 'clamp(16px, 3vw, 28px)',
                          minHeight: 'clamp(56px, 8vw, 72px)'
                        }}
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                        Role/Title
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
                        style={{ 
                          fontSize: 'clamp(16px, 2.5vw, 20px)',
                          padding: 'clamp(16px, 3vw, 28px)',
                          minHeight: 'clamp(56px, 8vw, 72px)'
                        }}
                        placeholder="Your role or title"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all min-h-[56px] md:min-h-[64px] lg:min-h-[72px]"
                      style={{ 
                        fontSize: 'clamp(16px, 2.5vw, 20px)',
                        padding: 'clamp(16px, 3vw, 28px)',
                        minHeight: 'clamp(56px, 8vw, 72px)'
                      }}
                      placeholder="Brief subject line"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-lg md:text-xl font-bold text-gray-300 mb-3">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full p-4 md:p-6 lg:p-7 text-base md:text-lg lg:text-xl bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 focus:outline-none transition-all resize-none min-h-[160px] md:min-h-[200px] lg:min-h-[240px]"
                      style={{ 
                        fontSize: 'clamp(16px, 2.5vw, 20px)',
                        padding: 'clamp(16px, 3vw, 28px)',
                        minHeight: 'clamp(160px, 20vw, 240px)'
                      }}
                      placeholder="Tell us about your interest in FRANK Robotics..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:bg-gray-600 text-white px-6 md:px-8 py-4 md:py-6 lg:py-7 rounded-lg font-bold text-lg md:text-xl lg:text-2xl transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3 min-h-[64px] md:min-h-[72px] lg:min-h-[80px]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span className="text-lg md:text-xl lg:text-2xl">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
                        <span className="text-lg md:text-xl lg:text-2xl">Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information - Simplified */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-6"
            >
              {/* Direct Contact */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-blue-400 mb-6 text-center">Direct Contact</h3>
                <div className="space-y-4 flex flex-col items-center">
                  <div className="flex items-center gap-3 w-full justify-center">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div className="text-center">
                      <div className="text-white font-semibold">Email</div>
                      <a 
                        href="mailto:contact@frank-robotics.xyz"
                        className="text-blue-400 hover:text-blue-300 transition-colors no-underline"
                        style={{ textDecoration: 'none !important', color: '#60a5fa !important' }}
                      >
                        contact@frank-robotics.xyz
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full justify-center">
                    <Building className="w-5 h-5 text-blue-400" />
                    <div className="text-center">
                      <div className="text-white font-semibold">Company</div>
                      <div className="text-gray-400">FRANK Robotics Inc.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full justify-center">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div className="text-center">
                      <div className="text-white font-semibold">Location</div>
                      <div className="text-gray-400">United States</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">Response Times</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Investment Inquiries</span>
                    <span className="text-green-400 font-bold">Same Day</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Partnership Requests</span>
                    <span className="text-green-400 font-bold">24 Hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">General Inquiries</span>
                    <span className="text-green-400 font-bold">48 Hours</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-purple-400 mb-4 text-center">Quick Actions</h3>
                <div className="space-y-3 flex flex-col items-center">
                  <Link
                    href="/showcase"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors p-3 rounded-lg hover:bg-green-400/10 w-full justify-center no-underline"
                    style={{ 
                      textDecoration: 'none !important', 
                      color: '#4ade80 !important',
                      backgroundColor: 'rgba(74, 222, 128, 0.1)'
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#4ade80' }} />
                    Schedule a Live Demo
                  </Link>
                  <Link
                    href="/executive-summary"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors p-3 rounded-lg hover:bg-cyan-400/10 w-full justify-center no-underline"
                    style={{ 
                      textDecoration: 'none !important', 
                      color: '#22d3ee !important',
                      backgroundColor: 'rgba(34, 211, 238, 0.1)'
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#22d3ee' }} />
                    View Executive Summary
                  </Link>
                  <Link
                    href="/waitlist"
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors p-3 rounded-lg hover:bg-purple-400/10 w-full justify-center no-underline"
                    style={{ 
                      textDecoration: 'none !important', 
                      color: '#c084fc !important',
                      backgroundColor: 'rgba(192, 132, 252, 0.1)'
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#c084fc' }} />
                    Join Early Access List
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
    </>
  );
}
