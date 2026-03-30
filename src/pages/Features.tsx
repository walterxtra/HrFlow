import React from 'react';
import { motion } from 'motion/react';
import { Users, CreditCard, Clock, UserPlus, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const Features = () => {
  const detailedFeatures = [
    {
      id: "employee-management",
      title: "Employee Management",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      description: "A single source of truth for all your employee data. Say goodbye to scattered spreadsheets and paper files.",
      benefits: [
        "Digital employee profiles with full history",
        "Document storage with expiry alerts",
        "Custom fields for unique business needs",
        "Organizational charts and reporting lines",
        "Employee self-service portal"
      ],
      image: "https://picsum.photos/seed/hr1/800/600"
    },
    {
      id: "payroll-system",
      title: "Payroll System",
      icon: <CreditCard className="w-8 h-8 text-blue-600" />,
      description: "Automate your payroll processing and ensure everyone gets paid accurately and on time, every time.",
      benefits: [
        "Automated tax calculations and filings",
        "Direct deposit integration",
        "Expense reimbursement management",
        "Custom bonus and commission structures",
        "Detailed payroll reporting and analytics"
      ],
      image: "https://picsum.photos/seed/hr2/800/600",
      reverse: true
    },
    {
      id: "attendance-tracking",
      title: "Attendance & Leave",
      icon: <Clock className="w-8 h-8 text-blue-600" />,
      description: "Track time, manage leaves, and monitor productivity without the manual overhead.",
      benefits: [
        "Smart clock-in/out with GPS tracking",
        "Automated leave request workflows",
        "Holiday calendar management",
        "Overtime and shift tracking",
        "Integration with payroll for seamless deductions"
      ],
      image: "https://picsum.photos/seed/hr3/800/600"
    },
    {
      id: "recruitment-tools",
      title: "Recruitment & Onboarding",
      icon: <UserPlus className="w-8 h-8 text-blue-600" />,
      description: "Find the best talent and give them a world-class onboarding experience from day one.",
      benefits: [
        "Applicant tracking system (ATS)",
        "Customizable job boards",
        "Interview scheduling and feedback",
        "Digital offer letters and e-signatures",
        "Automated onboarding checklists"
      ],
      image: "https://picsum.photos/seed/hr4/800/600",
      reverse: true
    }
  ];

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="bg-slate-900 py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-6xl font-bold mb-6"
          >
            Powerful features for <br />
            <span className="text-blue-400">modern HR teams</span>
          </motion.h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Everything you need to manage your workforce efficiently, from hire to retire.
          </p>
        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 space-y-32">
        {detailedFeatures.map((feature, idx) => (
          <div key={feature.id} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center",
              feature.reverse ? "lg:flex-row-reverse" : ""
            )}>
              <div className={feature.reverse ? "lg:order-2" : ""}>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
                  {feature.icon}
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">{feature.title}</h2>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-4 mb-10">
                  {feature.benefits.map((benefit, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="outline" className="group">
                    Learn more <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className={cn(
                "relative",
                feature.reverse ? "lg:order-1" : ""
              )}>
                <div className="bg-slate-100 rounded-3xl overflow-hidden shadow-xl">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {/* Decorative elements */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-50" />
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-24 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl lg:text-4xl font-bold mb-8">Ready to see these features in action?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                Book a Demo
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
