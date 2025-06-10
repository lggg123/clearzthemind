'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Users, Mail, Bell, CheckCircle, Star, Zap, Shield, Heart } from 'lucide-react';

export default function WaitlistPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    organization: '',
    useCase: 'personal',
    interests: [] as string[],
    updates: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'updates') {
        setFormData({ ...formData, updates: checked });
      } else {
        const updatedInterests = checked
          ? [...formData.interests, value]
          : formData.interests.filter(interest => interest !== value);
        setFormData({ ...formData, interests: updatedInterests });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
          className="text-center p-8 max-w-2xl mx-auto"
        >
          <CheckCircle className="w-24 h-24 text-purple-400 mx-auto mb-6" />
          <h1 className="text-5xl font-bold text-purple-400 mb-6">Welcome to the FRANK Family!</h1>
          <p className="text-xl text-gray-300 mb-8">
            You're now on our exclusive early access waitlist. You'll be among the first to experience FRANK when we launch.
          </p>
          
          <div className="bg-gray-900/50 p-6 rounded-xl border border-purple-500/30 mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">What happens next?</h2>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                <span className="text-gray-300">We'll send you regular updates on our development progress</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                <span className="text-gray-300">You'll get early access to FRANK beta testing programs</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                <span className="text-gray-300">Special pricing and launch day priorities for early supporters</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              Back to Pitch
            </Link>
            <Link
              href="/showcase"
              className="bg-green-500 hover:bg-green-600 text-black px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
            >
              See Live Demo
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-6 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Pitch
            </Link>
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join the Waitlist
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
          className="space-y-12"
        >
          {/* Hero Section */}
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-6xl font-black mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Be First to Experience FRANK
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Join our exclusive early access program and be among the first to benefit from revolutionary AI mental health support.
            </motion.p>
          </div>

          {/* Benefits Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30 text-center">
              <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-400 mb-3">Early Access</h3>
              <p className="text-gray-300">Be the first to try FRANK before public launch with exclusive beta access</p>
            </div>
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-xl border border-blue-500/30 text-center">
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-400 mb-3">Special Pricing</h3>
              <p className="text-gray-300">Lock in founder pricing with significant discounts for early supporters</p>
            </div>
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-xl border border-green-500/30 text-center">
              <Shield className="w-12 h-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-400 mb-3">Priority Support</h3>
              <p className="text-gray-300">Direct line to our team for feedback, support, and feature requests</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Signup Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="bg-gray-900/50 p-8 rounded-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Users className="w-8 h-8 text-purple-400" />
                  Join the Waitlist
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                        placeholder="Your first name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                        placeholder="Your last name"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  {/* Role & Organization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Role/Title
                      </label>
                      <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                        placeholder="Your professional role"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-300 mb-2">
                        Organization
                      </label>
                      <input
                        type="text"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                        placeholder="Company or organization"
                      />
                    </div>
                  </div>

                  {/* Use Case */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-2">
                      Primary Use Case *
                    </label>
                    <select
                      name="useCase"
                      value={formData.useCase}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-black/50 border border-gray-600 rounded-lg text-white focus:border-purple-400 focus:outline-none"
                      required
                    >
                      <option value="personal">Personal/Family Use</option>
                      <option value="clinical">Clinical/Healthcare Setting</option>
                      <option value="educational">Educational Institution</option>
                      <option value="corporate">Corporate Wellness</option>
                      <option value="research">Research & Development</option>
                      <option value="investment">Investment Interest</option>
                    </select>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-bold text-gray-300 mb-4">
                      Areas of Interest (Select all that apply)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {[
                        'Crisis Detection',
                        'Neural Pathway Analysis',
                        'Family Mental Health',
                        'Clinical Integration',
                        'Corporate Wellness',
                        'Research Applications'
                      ].map((interest) => (
                        <label key={interest} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            value={interest}
                            checked={formData.interests.includes(interest)}
                            onChange={handleInputChange}
                            className="w-4 h-4 text-purple-400 bg-black/50 border-gray-600 rounded focus:ring-purple-400 focus:ring-2"
                          />
                          <span className="text-gray-300">{interest}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Updates Checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="updates"
                      checked={formData.updates}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-purple-400 bg-black/50 border-gray-600 rounded focus:ring-purple-400 focus:ring-2 mt-1"
                    />
                    <label className="text-gray-300 text-sm">
                      I'd like to receive updates about FRANK's development, beta testing opportunities, and launch announcements. You can unsubscribe at any time.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 disabled:hover:scale-100 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Joining Waitlist...
                      </>
                    ) : (
                      <>
                        <Heart className="w-5 h-5" />
                        Join the FRANK Family
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>

            {/* Sidebar Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              className="space-y-8"
            >
              {/* Waitlist Stats */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Waitlist Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Current Members</span>
                    <span className="text-purple-400 font-bold">2,847</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Healthcare Professionals</span>
                    <span className="text-blue-400 font-bold">423</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Institutions</span>
                    <span className="text-green-400 font-bold">87</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Investors</span>
                    <span className="text-yellow-400 font-bold">156</span>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Launch Timeline</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full mt-1"></div>
                    <div>
                      <div className="text-white font-semibold">Q1 2025</div>
                      <div className="text-gray-400 text-sm">Beta testing begins</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-blue-400 rounded-full mt-1"></div>
                    <div>
                      <div className="text-white font-semibold">Q2 2025</div>
                      <div className="text-gray-400 text-sm">Clinical partnerships</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 bg-purple-400 rounded-full mt-1"></div>
                    <div>
                      <div className="text-white font-semibold">Q4 2025</div>
                      <div className="text-gray-400 text-sm">Public launch</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-xl border border-purple-500/30">
                <h3 className="text-2xl font-bold text-purple-400 mb-4">Early Access Benefits</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>50% discount on first year subscription</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Priority beta testing access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Direct feedback channel to development team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Exclusive webinars and product updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                    <span>Founder recognition and community access</span>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-700">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">Questions?</h3>
                <p className="text-gray-300 mb-4">
                  Have questions about early access or FRANK's capabilities?
                </p>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Contact our team
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
