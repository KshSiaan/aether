"use client";
import React from "react";
import { cubicBezier, motion } from "framer-motion";
import { BookOpenIcon, FileTextIcon, Users2Icon, ZapIcon } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "123",
    change: "+12%",
    trend: "up",
    icon: Users2Icon,
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    description: "Active users this month",
  },
  {
    title: "Posts Created",
    value: "230",
    change: "+8%",
    trend: "up",
    icon: FileTextIcon,
    gradient: "from-emerald-500 to-teal-500",
    bgGradient: "from-emerald-50 to-teal-50",
    description: "Content published",
  },
  {
    title: "Blog Articles",
    value: "56",
    change: "+23%",
    trend: "up",
    icon: BookOpenIcon,
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    description: "Published articles",
  },
  {
    title: "Features",
    value: "7",
    change: "+2",
    trend: "up",
    icon: ZapIcon,
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    description: "New features added",
  },
];

const GradientDecorations = ({ gradient }: { gradient: string }) => (
  <>
    {["translate-x-8 -translate-y-8", "translate-x-16", "-translate-y-8"].map(
      (pos, i) => (
        <div key={i} className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <div
            className={`w-full h-full rounded-full bg-gradient-to-br ${gradient} transform ${pos}`}
          />
        </div>
      )
    )}
  </>
);

const StatCard = ({
  title,
  value,
  icon: Icon,
  gradient,
  bgGradient,
  description,
}: (typeof stats)[0]) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: cubicBezier(0.22, 1, 0.36, 1),
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${bgGradient} border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer`}
    >
      <GradientDecorations gradient={gradient} />

      <div className="relative p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}
          >
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-slate-600 text-sm font-medium uppercase tracking-wide">
            {title}
          </h3>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-slate-900">{value}</span>
          </div>
          <p className="text-slate-500 text-sm">{description}</p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default function Analytics() {
  return (
    <div className="p-6">
      <div className="w-full mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2, // stagger animations
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
