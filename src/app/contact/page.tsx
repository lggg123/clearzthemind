'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Send, User, Mail, MessageSquare, Building, Phone, MapPin, CheckCircle } from 'lucide-react';

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
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
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
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
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
      <div className="max-w-7xl mx-auto p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-12"
        >
          {/* Title Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-black mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-gray-300 mb-8"
            >
              Ready to transform mental healthcare? Let&apos;s start the conversation.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <MessageSquare className="w-8 h-8 text-blue-400" />
                  Send us a message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                      required
                    >
                      <option value="investment">Investment Opportunity</option>
                      <option value="partnership">Partnership Inquiry</option>
                      <option value="clinical">Clinical Collaboration</option>
                      <option value="media">Media & Press</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                  </div>

                  {/* Company & Role */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Company/Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        placeholder="Your company name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Role/Title
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        placeholder="Your role or title"
                      />
                    </div>
                  </div>

                  {/* Phone & Subject */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                        placeholder="Brief subject line"
                        required
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-blue-400 focus:outline-none"
                      placeholder="Tell us about your interest in FRANK Robotics..."
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Direct Contact */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                  <User className="w-6 h-6" />
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">Email</div>
                      <a 
                        href="mailto:contact@frank-robotics.com"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        contact@frank-robotics.xyz
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">Phone</div>
                      <div className="text-gray-400">Available upon request</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">Company</div>
                      <div className="text-gray-400">FRANK Robotics Inc.</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-semibold">Location</div>
                      <div className="text-gray-400">United States</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Response Times */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Response Times</h3>
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
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Media Requests</span>
                    <span className="text-green-400 font-bold">24 Hours</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link
                    href="/showcase"
                    className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                    Schedule a Live Demo
                  </Link>
                  <Link
                    href="/executive-summary"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    View Executive Summary
                  </Link>
                  <Link
                    href="/frank-technical-deck.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                    Download Technical Deck
                  </Link>
                  <Link
                    href="/waitlist"
                    className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Join Early Access List
                  </Link>
                </div>
              </div>

              {/* Investor Information */}
              <div className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 p-6 rounded-xl border border-yellow-500/30">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">For Investors</h3>
                <p className="text-gray-300 mb-4">
                  Interested in our $10M Series A? We&apos;d love to discuss how FRANK can transform mental healthcare.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div>• Comprehensive due diligence materials</div>
                  <div>• Live product demonstrations</div>
                  <div>• Financial models and projections</div>
                  <div>• Team meetings and technical deep-dives</div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
