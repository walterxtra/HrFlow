import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Simulate API call
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="pt-24">
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">Get in touch</h1>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Have questions? Our team is here to help you find the perfect HR solution for your business.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Email us</h4>
                  <p className="text-slate-600 text-sm">Our friendly team is here to help.</p>
                  <a href="mailto:hello@hrflow.com" className="text-blue-600 font-semibold text-sm hover:underline">hello@hrflow.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Call us</h4>
                  <p className="text-slate-600 text-sm">Mon-Fri from 8am to 5pm.</p>
                  <a href="tel:+15550000000" className="text-blue-600 font-semibold text-sm hover:underline">+1 (555) 000-0000</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Visit us</h4>
                  <p className="text-slate-600 text-sm">Come say hello at our office.</p>
                  <p className="text-blue-600 font-semibold text-sm">100 Market St, San Francisco, CA</p>
                </div>
              </div>

              <div className="pt-8">
                <h4 className="font-bold text-slate-900 mb-4">Follow us</h4>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors cursor-pointer">
                    <Mail className="w-5 h-5" />
                  </div>
                  {/* Add more social icons as needed */}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="text-green-600 w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                      <p className="text-slate-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                      <Button
                        variant="outline"
                        className="mt-8"
                        onClick={() => setSubmitted(false)}
                      >
                        Send another message
                      </Button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">First Name</label>
                          <input
                            required
                            type="text"
                            placeholder="John"
                            className="w-full px-4 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700">Last Name</label>
                          <input
                            required
                            type="text"
                            placeholder="Doe"
                            className="w-full px-4 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Email Address</label>
                        <input
                          required
                          type="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Company Size</label>
                        <select className="w-full px-4 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all">
                          <option>1-10 employees</option>
                          <option>11-50 employees</option>
                          <option>51-200 employees</option>
                          <option>201-500 employees</option>
                          <option>500+ employees</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Message</label>
                        <textarea
                          required
                          rows={4}
                          placeholder="Tell us about your HR needs..."
                          className="w-full px-4 py-2 rounded-md border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                        ></textarea>
                      </div>
                      <Button type="submit" size="lg" className="w-full">
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="h-96 bg-slate-200 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
          [ Interactive Map Placeholder ]
        </div>
        {/* Decorative map-like lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 20 L100 20 M0 50 L100 50 M0 80 L100 80 M20 0 L20 100 M50 0 L50 100 M80 0 L80 100" stroke="currentColor" strokeWidth="0.5" fill="none" />
        </svg>
      </section>
    </div>
  );
};

export default Contact;
