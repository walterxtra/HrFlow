import React from 'react';
import { motion } from 'motion/react';
import { Users, Target, Heart, Shield } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold text-slate-900 mb-8"
          >
            We're on a mission to <br />
            <span className="text-blue-600">humanize HR.</span>
          </motion.h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-xl leading-relaxed">
            Founded in 2020, HRFlow was built with a simple idea: HR software should empower people, not just process paperwork. We help companies build cultures where employees thrive.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
              <p className="text-slate-600 mb-6 leading-relaxed">
                It all started when our founders realized that most HR platforms were clunky, outdated, and focused purely on compliance. They saw a gap for a modern, intuitive solution that actually helps teams grow.
              </p>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Today, HRFlow is used by thousands of companies worldwide, from small startups to large enterprises. We've grown into a global team of passionate individuals dedicated to making work better for everyone.
              </p>
              <div className="grid grid-cols-2 gap-8 mt-12">
                <div>
                  <h4 className="text-4xl font-bold text-blue-600 mb-2">500+</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Customers</p>
                </div>
                <div>
                  <h4 className="text-4xl font-bold text-blue-600 mb-2">50k+</h4>
                  <p className="text-sm text-slate-500 uppercase tracking-wider font-semibold">Employees Managed</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://picsum.photos/seed/team/800/600"
                alt="Our Team"
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
            <p className="text-slate-400">The principles that guide everything we do.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: <Users className="w-8 h-8 text-blue-400" />, title: "People First", desc: "We build for humans, not just users. Empathy is at our core." },
              { icon: <Target className="w-8 h-8 text-blue-400" />, title: "Radical Simplicity", desc: "We cut through complexity to deliver intuitive experiences." },
              { icon: <Heart className="w-8 h-8 text-blue-400" />, title: "Continuous Growth", desc: "We're always learning, evolving, and pushing boundaries." },
              { icon: <Shield className="w-8 h-8 text-blue-400" />, title: "Unwavering Trust", desc: "Security and transparency are non-negotiable." }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold mb-3">{value.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Meet the Leadership</h2>
            <p className="text-slate-600">The visionaries behind HRFlow.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: "Alex Rivera", role: "CEO & Founder", img: "https://picsum.photos/seed/p1/400/400" },
              { name: "Jessica Wu", role: "CTO", img: "https://picsum.photos/seed/p2/400/400" },
              { name: "David Miller", role: "Head of Product", img: "https://picsum.photos/seed/p3/400/400" }
            ].map((member, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative mb-6 inline-block">
                  <div className="w-48 h-48 rounded-full overflow-hidden bg-slate-100 mx-auto">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-slate-900">{member.name}</h4>
                <p className="text-blue-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
