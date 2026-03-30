import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Users, CreditCard, Clock, UserPlus, BarChart3, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100/50 rounded-full blur-3xl" />
          <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-indigo-100/50 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold tracking-wide uppercase mb-6">
              The Future of HR Management
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-8">
              Manage your people, <br />
              <span className="text-blue-600">not your paperwork.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-600 mb-10 leading-relaxed">
              HRFlow is the all-in-one platform for modern businesses to automate payroll, track attendance, and build high-performing teams.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto px-8">
                  Book a Free Demo <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-20"
          >
            <p className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">Trusted by 500+ forward-thinking companies</p>
            <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16 opacity-50 grayscale">
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="h-6" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-6" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" alt="Microsoft" className="h-6" referrerPolicy="no-referrer" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Slack_Technologies_Logo.svg" alt="Slack" className="h-6" referrerPolicy="no-referrer" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Everything you need to scale</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Powerful tools designed to simplify your HR operations and boost employee engagement.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-6 h-6 text-blue-600" />,
                title: "Employee Management",
                desc: "Centralized database for all employee records, documents, and history."
              },
              {
                icon: <CreditCard className="w-6 h-6 text-blue-600" />,
                title: "Automated Payroll",
                desc: "Error-free payroll processing with automated tax calculations and direct deposits."
              },
              {
                icon: <Clock className="w-6 h-6 text-blue-600" />,
                title: "Attendance Tracking",
                desc: "Smart time-tracking with geofencing and automated leave management."
              },
              {
                icon: <UserPlus className="w-6 h-6 text-blue-600" />,
                title: "Recruitment & Onboarding",
                desc: "Streamlined hiring process from job posting to digital onboarding."
              },
              {
                icon: <BarChart3 className="w-6 h-6 text-blue-600" />,
                title: "Performance Reviews",
                desc: "Goal setting, 360-degree feedback, and continuous performance tracking."
              },
              {
                icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
                title: "Compliance & Security",
                desc: "Stay compliant with local labor laws and keep your data secure with enterprise-grade encryption."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="pt-8">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-8">Get started in minutes, <br />not months.</h2>
              <div className="space-y-8">
                {[
                  { step: "01", title: "Connect your team", desc: "Import your employee data or sync with your existing tools in seconds." },
                  { step: "02", title: "Configure workflows", desc: "Set up your payroll schedules, leave policies, and approval chains." },
                  { step: "03", title: "Go live", desc: "Invite your team to their self-service portal and start managing with ease." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-blue-600 rounded-2xl p-4 shadow-2xl">
                <img
                  src="https://picsum.photos/seed/dashboard/800/600"
                  alt="Dashboard Preview"
                  className="rounded-xl shadow-lg"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="text-green-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Payroll Processed</p>
                    <p className="text-xs text-slate-500">142 Employees • Today</p>
                  </div>
                </div>
                <div className="h-2 w-48 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-full bg-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-16">What HR leaders are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                quote: "HRFlow transformed how we manage our remote team. Payroll used to take days, now it takes minutes.",
                author: "Sarah Jenkins",
                role: "HR Director @ TechScale"
              },
              {
                quote: "The onboarding experience is seamless. New hires feel welcomed and productive from day one.",
                author: "Michael Chen",
                role: "COO @ InnovateLabs"
              },
              {
                quote: "Finally, an HR tool that employees actually enjoy using. The UI is clean and intuitive.",
                author: "Emma Rodriguez",
                role: "People Ops @ CreativeHub"
              }
            ].map((t, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <p className="text-lg italic mb-8 text-slate-300">"{t.quote}"</p>
                <div className="w-12 h-12 bg-slate-700 rounded-full mb-4" />
                <h5 className="font-bold">{t.author}</h5>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-32 -mb-32 blur-3xl" />

            <h2 className="text-3xl lg:text-5xl font-bold mb-6 relative z-10">Ready to modernize your HR?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of companies using HRFlow to build better workplaces. Start your 14-day free trial today.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link to="/contact">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 w-full sm:w-auto">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
