import React from 'react';
import { Link } from 'react-router-dom';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { 
  ChevronDown, 
  AlarmClock, 
  Calendar, 
  Timer, 
  Palette, 
  Volume2, 
  PlusCircle 
} from 'lucide-react';

/**
 * TickTick Premium Page - Consolidated Single File (No Header/Footer)
 * 
 * This file contains all sections for the TickTick Premium page content.
 * Header and Footer have been removed as requested.
 */

// --- Sub-components ---

const HeroSection = () => (
  <section className="relative overflow-hidden bg-[#1A1A1A] pt-[120px] pb-[100px] md:pt-[160px] md:pb-[140px]">
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at 50% 40%, rgba(255, 141, 66, 0.12) 0%, rgba(26, 26, 26, 0) 65%)',
        zIndex: 0
      }}
    />
    <div className="container relative z-10 mx-auto px-6 text-center">
      <h2 className="mx-auto mb-6 max-w-[900px] text-balance text-white text-[32px] md:text-[48px] font-extrabold leading-[1.2] tracking-[-0.02em]">
        Boost your productivity with TickTick Premium
      </h2>
      <h5 className="mx-auto mb-10 max-w-[640px] text-[#A9A9A9] text-[16px] md:text-[18px] font-normal leading-[1.6]">
        Unlock all premium features on all platforms. Enjoy your organized life to the fullest.
      </h5>
      <div className="mb-6">
        <button className="inline-flex items-center justify-center rounded-[8px] px-12 py-4 h-[56px] text-white transition-all duration-300 hover:opacity-90 active:scale-95 text-[14px] font-bold tracking-[0.05em] uppercase shadow-[0_4px_14px_0_rgba(255,112,67,0.39)]"
          style={{ background: 'linear-gradient(90deg, #FF7043 0%, #FFA726 100%)' }}>
          UPGRADE NOW
        </button>
      </div>
      <p className="text-[#A9A9A9] text-[14px] font-normal">
        Annual plan for $35.99 (less than $3/month)
      </p>
    </div>
  </section>
);

const FeatureCalendar = () => (
  <section className="bg-[#1A1A1A] py-[80px] md:py-[120px] overflow-hidden">
    <div className="container mx-auto px-6 max-w-[1140px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[80px]">
        <div className="w-full lg:max-w-[420px] space-y-4">
          <h4 className="text-[28px] md:text-[32px] font-bold text-white leading-[1.3] mb-6">Full calendar functionality</h4>
          <p className="text-[16px] text-[#A9A9A9] leading-[1.6]">
            Access more calendar views. Set both start and end dates to tasks. 
            You can even subscribe to third-party calendars.
          </p>
        </div>
        <div className="w-full lg:flex-1 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[675px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f4e3af13-06b6-420f-8f2b-2aecf9fd77d6-ticktick-com/assets/images/grid-calendar-1.png"
              alt="Calendar" width={675} height={459} className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureFilters = () => (
  <section className="bg-[#1A1A1A] py-[80px] md:py-[120px] overflow-hidden">
    <div className="container mx-auto max-w-[1140px] px-6">
      <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-10 md:gap-[80px]">
        <div className="w-full md:w-1/2">
          <h4 className="text-[28px] md:text-[32px] font-bold text-white mb-4 leading-[1.3]">Customize filters</h4>
          <p className="text-[16px] leading-[1.6] text-[#A9A9A9] max-w-[440px]">
            Unlock the &quot;Filter&quot; feature, and be as flexible as you need with all the Lists.
          </p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <div className="relative w-full max-w-[661px] rounded-[8px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-[#242424] border border-[#2E2E2E]">
            <img
              src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f4e3af13-06b6-420f-8f2b-2aecf9fd77d6-ticktick-com/assets/images/smart-list-2.png"
              alt="Filters" width={661} height={484} className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureLimits = () => (
  <section className="w-full py-[80px] bg-[#1A1A1A]">
    <div className="container mx-auto px-6 max-w-[1140px]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20">
        <div className="w-full md:w-1/2 order-2 md:order-1">
          <h4 className="text-[28px] md:text-[32px] font-bold text-white mb-4 leading-[1.3]">Create more, achieve more</h4>
          <p className="text-[16px] text-[#A9A9A9] leading-[1.6] mb-6">Folder, List, Task, Check item - complex projects are handled as a breeze</p>
          <Link to="/features" className="text-[#FF8D42] text-[16px] font-medium hover:text-[#FF7A21] transition-colors">Know More</Link>
        </div>
        <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center md:justify-end">
          <img
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f4e3af13-06b6-420f-8f2b-2aecf9fd77d6-ticktick-com/assets/images/limit-3.png"
            alt="Limits" width={731} height={505} className="w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const FeatureActivity = () => (
  <section className="w-full bg-[#1A1A1A] py-[80px] md:py-[120px]">
    <div className="container mx-auto px-6 max-w-[1140px] overflow-hidden">
      <div className="flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-10 md:gap-[80px]">
        <div className="w-full md:w-1/2">
          <h4 className="text-[28px] md:text-[32px] font-bold text-white leading-[1.3] mb-4 md:mb-6">Keep everything under control</h4>
          <p className="text-[16px] text-[#A9A9A9] leading-[1.6]">View previous changes for all tasks and lists. Keep track of your shared projects.</p>
        </div>
        <div className="w-full md:w-1/2 flex justify-center md:justify-start">
          <img
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f4e3af13-06b6-420f-8f2b-2aecf9fd77d6-ticktick-com/assets/images/t-activity-4.png"
            alt="Activity" width={562} height={522} className="w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const FeatureStatistics = () => (
  <section className="bg-[#1A1A1A] py-[80px] md:py-[120px] overflow-hidden">
    <div className="container mx-auto px-6 max-w-[1140px]">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-[80px]">
        <div className="w-full lg:w-[45%]">
          <h4 className="text-[28px] md:text-[32px] font-bold text-white mb-6 leading-[1.3]">Track your progress</h4>
          <p className="text-[#A9A9A9] text-[16px] md:text-[18px] leading-[1.6]">
            Check the progress of each task, or see what you&apos;ve achieved with the &ldquo;Historical Statistics&rdquo; feature.
          </p>
        </div>
        <div className="w-full lg:w-[55%] flex justify-center lg:justify-end">
          <img
            src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/f4e3af13-06b6-420f-8f2b-2aecf9fd77d6-ticktick-com/assets/images/statistics-5.png"
            alt="Statistics" width={731} height={520} className="w-full h-auto drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  </section>
);

const AdditionalFeatures = () => {
  const featureEntries = [
    { icon: <AlarmClock className="w-5 h-5 text-[#FF8D42]" />, title: "Reminders for check item", description: "Set up reminders for check item and get reminded separately." },
    { icon: <Calendar className="w-5 h-5 text-[#FF8D42]" />, title: "Calendar widgets", description: "Check your agenda on home screen." },
    { icon: <Timer className="w-5 h-5 text-[#FF8D42]" />, title: "Estimated Pomo", description: "Set up estimated Pomo for tasks and calculate the time consumption for each task." },
    { icon: <Palette className="w-5 h-5 text-[#FF8D42]" />, title: "Premium themes", description: "10+ amazing themes - pick whichever you like." },
    { icon: <Volume2 className="w-5 h-5 text-[#FF8D42]" />, title: "Premium white noises", description: "More white noises options when using the Pomo Timer." },
    { icon: <PlusCircle className="w-5 h-5 text-[#FF8D42]" />, title: "Quick Ball for Android", description: "Quickly add new tasks from the lock screen." }
  ];

  return (
    <section className="bg-[#1A1A1A] pt-[80px] pb-[120px]">
      <div className="container mx-auto px-6 max-w-[1140px]">
        <h3 className="text-white text-[32px] font-bold mb-12">And so much more...</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureEntries.map((feature, index) => (
            <div key={index} className="bg-[#242424] p-8 border-l-4 border-[#FF8D42] rounded-r-lg transition-transform duration-300 hover:translate-y-[-4px]" style={{ minHeight: '180px' }}>
              <div className="flex items-center gap-3 mb-4">
                {feature.icon}
                <h5 className="text-white text-[18px] font-semibold tracking-tight">{feature.title}</h5>
              </div>
              <p className="text-[#A9A9A9] text-[15px] leading-[1.6]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaBottom = () => (
  <section className="py-[120px] bg-[#1A1A1A] flex flex-col items-center justify-center text-center">
    <div className="container flex flex-col items-center">
      <h2 className="text-white mb-10 text-[32px] md:text-[48px] font-extrabold leading-[1.2] tracking-[-0.02em] max-w-[900px]">
        Ready to accomplish more with Premium?
      </h2>
      <button className="inline-flex items-center justify-center px-[60px] py-[18px] text-[14px] font-bold tracking-[0.05em] uppercase text-white transition-all duration-300 ease-in-out rounded-lg"
        style={{ background: 'linear-gradient(90deg, #FF7043 0%, #FFA726 100%)' }}>
        GO AHEAD
      </button>
      <p className="mt-6 text-[#A9A9A9] text-[16px]">Annual plan for $35.99 (less than $3/month)</p>
    </div>
  </section>
);

const FAQs = () => (
  <section className="py-[120px] bg-[#1A1A1A]">
    <div className="container mx-auto max-w-[1140px] px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[80px] gap-y-[40px]">
        {[
          { q: "How I get a refund?", a: "Yes, you can apply for a refund within 14 days after purchase. Please submit a ticket via Feedback in the app. Meanwhile, to avoid getting charged again, you're suggested to cancel the subscription from the platform where you purchased TickTick Premium." },
          { q: "If I forget to renew my subscription, will I lose all my data?", a: "You will not lose your data such as lists, tasks, images, etc.; however, you won't be able to add more or use any other premium features until you complete the renewal." },
          { q: "How can I cancel the subscription?", a: "Depending on where you upgraded (Web/PayPal, Play Store, or iTunes), you can cancel through the respective platform's subscription management settings." },
          { q: "What if I have other questions?", a: "Please look for more guides at the Help Center via https://help.ticktick.com." }
        ].map((faq, i) => (
          <div key={i}>
            <h5 className="text-[#FFFFFF] text-[18px] font-semibold leading-[1.4] mb-4">{faq.q}</h5>
            <p className="text-[#A9A9A9] text-[16px] leading-[1.6]">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main Page Component ---

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-[#1A1A1A] font-sans">
      <Header theme="dark" />
      <main>
        <HeroSection />
        <FeatureCalendar />
        <FeatureFilters />
        <FeatureLimits />
        <FeatureActivity />
        <FeatureStatistics />
        <AdditionalFeatures />
        <CtaBottom />
        <FAQs />
      </main>
      <Footer theme="dark" />
    </div>
  );
}
