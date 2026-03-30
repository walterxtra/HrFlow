import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Info, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter",
      price: isAnnual ? "49" : "59",
      description: "Perfect for small teams getting started with HR automation.",
      features: [
        "Up to 25 employees",
        "Employee database",
        "Basic leave management",
        "Document storage (5GB)",
        "Mobile app access",
        "Email support"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      price: isAnnual ? "99" : "119",
      description: "Advanced tools for growing companies with complex needs.",
      features: [
        "Up to 100 employees",
        "Everything in Starter",
        "Automated payroll",
        "Performance reviews",
        "Recruitment ATS",
        "Priority support",
        "Custom reports"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Full-scale solutions for large organizations and global teams.",
      features: [
        "Unlimited employees",
        "Everything in Pro",
        "Dedicated account manager",
        "Custom integrations",
        "Advanced security (SSO)",
        "Multi-entity support",
        "On-site training"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="pt-24 pb-24">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">Simple, transparent pricing</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-12">
            Choose the plan that's right for your business. No hidden fees, no long-term contracts.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-slate-900" : "text-slate-500")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-7 bg-slate-200 rounded-full p-1 transition-colors focus:outline-none"
            >
              <div className={cn(
                "w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200",
                isAnnual ? "translate-x-7" : "translate-x-0"
              )} />
            </button>
            <span className={cn("text-sm font-medium", isAnnual ? "text-slate-900" : "text-slate-500")}>
              Annual <span className="text-green-600 font-bold ml-1">(Save 20%)</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="h-full"
              >
                <Card className={cn(
                  "h-full flex flex-col relative",
                  plan.popular ? "border-blue-600 shadow-xl scale-105 z-10" : "border-slate-200"
                )}>
                  {plan.popular && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white text-xs font-bold py-1 px-4 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="mb-8">
                      <span className="text-4xl font-bold text-slate-900">
                        {plan.price === "Custom" ? "" : "$"}
                        {plan.price}
                      </span>
                      {plan.price !== "Custom" && (
                        <span className="text-slate-500 ml-1">/month</span>
                      )}
                    </div>
                    <ul className="space-y-4 text-left">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3 text-sm text-slate-600">
                          <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Link to="/contact" className="w-full">
                      <Button
                        variant={plan.popular ? "default" : "outline"}
                        className="w-full"
                        size="lg"
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Compare all features</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-6 text-sm font-semibold text-slate-900">Feature</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-900 text-center">Starter</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-900 text-center">Professional</th>
                  <th className="py-4 px-6 text-sm font-semibold text-slate-900 text-center">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Employee Directory", s: true, p: true, e: true },
                  { name: "Mobile App", s: true, p: true, e: true },
                  { name: "Payroll Automation", s: false, p: true, e: true },
                  { name: "Performance Reviews", s: false, p: true, e: true },
                  { name: "Custom Workflows", s: false, p: "Limited", e: true },
                  { name: "API Access", s: false, p: false, e: true },
                  { name: "SSO Security", s: false, p: false, e: true },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-white transition-colors">
                    <td className="py-4 px-6 text-sm text-slate-700">{row.name}</td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.s === 'boolean' ? (row.s ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : "-") : <span className="text-xs">{row.s}</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.p === 'boolean' ? (row.p ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : "-") : <span className="text-xs">{row.p}</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {typeof row.e === 'boolean' ? (row.e ? <Check className="w-5 h-5 text-green-500 mx-auto" /> : "-") : <span className="text-xs">{row.e}</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {[
              { q: "Can I change plans later?", a: "Yes, you can upgrade or downgrade your plan at any time from your dashboard settings." },
              { q: "Is there a free trial?", a: "We offer a 14-day full-featured free trial for the Starter and Professional plans. No credit card required." },
              { q: "Do you offer discounts for non-profits?", a: "Yes, we offer special pricing for registered non-profit organizations. Contact our sales team for details." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-8">
                <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-600" /> {faq.q}
                </h4>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
