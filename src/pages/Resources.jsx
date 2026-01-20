"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Calendar, CheckSquare, LayoutGrid, Target, Repeat, Clock } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const HeroSection = () => {
  const categories = [
    {
      title: "Beginner's Guide",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/beginner-1.png",
    },
    {
      title: "Best Practices",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/best-practice-2.png",
    },
    {
      title: "FAQ",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/faq-3.png",
    },
    {
      title: "Design Principles",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/design-4.png",
    },
    {
      title: "What's New",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/new-5.png",
    },
  ];

  return (
    <>
      <section className="relative overflow-hidden pt-[100px] pb-[80px]">
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.4]"
          style={{
            backgroundImage: `radial-gradient(#EEEEEE 1px, transparent 1px)`,
            backgroundSize: `24px 24px`
          }}
        ></div>

        <div className="container relative z-10 flex flex-col items-center mx-auto px-6">
          <h1 className="mb-10 text-center text-[44px] font-bold leading-[1.2]">
            How can we <span className="text-[#6187F2]">help you?</span>
          </h1>

          <div className="w-full flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full justify-center">
              <Link to="/productivity-guideline">
                <button 
                  type="button"
                  className="bg-[#6187F2] hover:bg-[#4d71e0] text-white font-medium px-6 py-2.5 rounded-[8px] transition-colors duration-200 cursor-pointer shadow-sm active:scale-95 whitespace-nowrap"
                >
                  Productivity Guideline
                </button>
              </Link>
            </div>

            <div className="relative w-full max-w-[640px] group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666666]">
                <Search size={22} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                placeholder="Search"
                className="w-full h-[56px] pl-12 pr-20 bg-white border border-[#EEEEEE] rounded-[12px] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6187F2]/20 transition-all text-[16px]"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center h-full">
                <span className="bg-[#F1F3F5] text-[#999999] text-[12px] font-medium px-2 py-1 rounded-[4px] select-none">
                  Ctrl K
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-[100px]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link 
                key={index}
                to={
                  category.title === "Beginner's Guide" ? "/guide" :
                  category.title === "Best Practices" ? "/productivity-guideline" :
                  category.title === "FAQ" ? "/faq" :
                  category.title === "Design Principles" ? "/about" :
                  category.title === "What's New" ? "/blog" :
                  "/resources"
                }
                className="flex flex-col items-center bg-white border border-[#EEEEEE] rounded-[12px] p-6 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
              >
                <div className="relative w-full aspect-square max-w-[124px] mb-4">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <p className="text-[16px] font-semibold text-center text-black">
                  {category.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const FeatureGuideSection = () => {
  const features = [
    {
      title: 'Task',
      subtext: 'To-do list, Free Your Mind',
      icon: <CheckSquare className="w-8 h-8 text-[#6187F2]" />,
      links: [
        'Add Tasks',
        'Effective Reminder Feature',
        'Manage Tasks with Group & Sort',
        'Kanban View: Categorize and Manage Tasks',
        'Timeline View: A Game-Changer for Project Management',
      ],
    },
    {
      title: 'Calendar',
      subtext: 'Schedule Planning, Clear at a Glance',
      icon: <Calendar className="w-8 h-8 text-[#6187F2]" />,
      links: [
        'Week View - Easy Planning of Weekly Schedule',
        'Month View - Monthly Review and Reflection',
        'List View - View Tasks by Day',
        'Calendar Subscriptions',
      ],
    },
    {
      title: 'Matrix',
      subtext: 'Prioritized Tasks, Efficient Achievement',
      icon: <LayoutGrid className="w-8 h-8 text-[#6187F2]" />,
      links: [
        'How to Use Eisenhower Matrix',
        'How to Edit the Rules for Eisenhower Matrix',
      ],
    },
    {
      title: 'Focus',
      subtext: 'Efficient Focus, Improved Productivity',
      icon: <Target className="w-8 h-8 text-[#6187F2]" />,
      links: [
        'How to Start Focus?',
        'How to Maintain Focus?',
        'Timer',
        'Focus Statistics',
      ],
    },
    {
      title: 'Habit',
      subtext: 'Consistent Check-ins, Self-improvement Boost',
      icon: <Repeat className="w-8 h-8 text-[#6187F2]" />,
      links: [
        'Start a New Habit',
        'Better Achieve Habits',
      ],
    },
    {
      title: 'Countdown',
      subtext: '',
      icon: <Clock className="w-8 h-8 text-[#6187F2]" />,
      links: [
        'Add Countdowns',
        'Customize Your Countdowns',
        'Manage Your Countdowns',
      ],
    },
  ];

  return (
    <section className="bg-white py-[80px]">
      <div className="container mx-auto px-6 max-w-[1140px]">
        <h2 className="text-[28px] font-bold text-black mb-[40px] text-left">
          Feature Guide
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-[12px] p-[24px] border border-[#EEEEEE] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 flex flex-col h-full"
            >
              <div className="flex items-start justify-between mb-[20px]">
                <div className="flex gap-4">
                  <div className="mt-1">
                    {feature.icon}
                  </div>
                  <div className="flex flex-col">
                    <h3 className="text-[20px] font-semibold text-black leading-tight mb-1">
                      {feature.title}
                    </h3>
                    {feature.subtext && (
                      <p className="text-[14px] text-[#666666] leading-snug">
                        {feature.subtext}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown className="w-[18px] h-[18px] text-[#CCCCCC] shrink-0" />
              </div>

              <div className="flex flex-col gap-0 border-t border-[#EEEEEE] pt-4 mt-auto">
                {feature.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    to="/help-center"
                    className="group flex items-center justify-between py-[10px] text-[14px] text-[#666666] hover:text-[#6187F2] transition-colors duration-200"
                  >
                    <span className="line-clamp-1">{link}</span>
                    <ChevronDown className="w-4 h-4 text-[#CCCCCC] -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UniqueFeaturesSection = () => {
  const features = [
    {
      title: "Timeline View",
      description: "Lighter Gantt chart, clear view of time scheduling.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/timeline-6.jpg",
      alt: "Timeline View illustration"
    },
    {
      title: "Cross-Platform Support",
      description: "Enhance productivity with cross-platform support and easy syncing.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/multiple-platform-tick-7.jpg",
      alt: "Cross-Platform Support illustration"
    },
    {
      title: "Widgets",
      description: "Customize your workspace with a variety of widgets for quick access.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/widget-8.jpg",
      alt: "Widgets illustration"
    },
    {
      title: "Desktop Sticky Notes",
      description: "Keep your to-dos front and center with desktop Sticky Notes.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/sticker-9.jpg",
      alt: "Desktop Sticky Notes illustration"
    },
    {
      title: "Notes and Summary",
      description: "Collect information and save inspiration anytime, anywhere.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/note-summary-10.jpg",
      alt: "Notes and Summary illustration"
    },
    {
      title: "Desktop Shortcuts",
      description: "Streamline your workflow with keyboard shortcuts and command menus.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/hotkeys-11.jpg",
      alt: "Desktop Shortcuts illustration"
    }
  ];

  return (
    <section className="py-[80px] bg-white w-full">
      <div className="container mx-auto px-6 max-w-[1140px]">
        <div className="w-full mb-[32px]">
          <h2 className="text-[28px] font-bold leading-[1.4] text-black">
            Unique Features
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px] w-full">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-[12px] overflow-hidden border border-[#EEEEEE] transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group cursor-pointer"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-[24px] flex flex-col gap-[8px]">
                <h3 className="text-[20px] font-semibold leading-[1.4] text-black">
                  {feature.title}
                </h3>
                <p className="text-[14px] font-normal leading-[1.5] text-[#666666]">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NeedMoreHelpSection = () => {
  return (
    <section className="bg-white py-[80px] md:py-[100px] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1140px]">
        <div className="relative flex flex-col items-center justify-between md:flex-row md:items-center min-h-[360px]">
          <div className="z-10 text-center md:text-left md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-[28px] md:text-[32px] font-bold text-black mb-6 leading-tight">
              Need more help?
            </h2>
            <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <button 
                type="button"
                className="bg-[#6187F2] hover:bg-[#4d71e0] text-white font-medium px-8 py-2.5 rounded-[8px] transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                Productivity Guideline
              </button>
              <button 
                type="button"
                className="bg-[#6187F2] hover:bg-[#4d71e0] text-white font-medium px-8 py-2.5 rounded-[8px] transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                Contact us
              </button>
            </div>
          </div>

          <div className="relative w-full h-[240px] md:w-1/2 md:h-[360px] flex justify-center md:justify-end">
            <div className="relative w-full h-full max-w-[500px]">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-help-ticktick-com/assets/images/feedback-12.png"
                alt="Need more help illustration"
                className="object-contain w-full h-full object-center md:object-right"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Resources() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <FeatureGuideSection />
        <UniqueFeaturesSection />
        <NeedMoreHelpSection />
      </div>
      <Footer />
    </main>
  );
}