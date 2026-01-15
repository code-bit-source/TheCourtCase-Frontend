import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {
  Calendar,
  LayoutDashboard,
  GanttChartSquare,
  Grid2X2,
  StickyNote,
  CheckCircle2,
  BellRing,
  Repeat,
  Zap,
  Filter,
  Keyboard,
  Users,
  Puzzle,
  BarChart2,
  Palette,
  ChevronRight,
} from "lucide-react";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const desktopY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const mobileY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const mobileScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-white pt-[100px] pb-[80px] lg:pt-[120px] lg:pb-[100px]">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] blur-[120px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(82, 123, 255, 0.4) 0%, transparent 70%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] right-[-10%] w-[50%] h-[60%] blur-[120px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(56, 191, 107, 0.3) 0%, transparent 70%)" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col items-center text-center mb-12 lg:mb-16">
          <motion.h1
            className="text-[40px] md:text-[56px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#000000] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Stay Organized, <br className="hidden md:block" /> Stay Creative.
          </motion.h1>

          <motion.p
            className="max-w-[680px] text-[18px] md:text-[20px] leading-[1.6] text-[#606266] mb-10 font-[400]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.15 }}
          >
            Join millions of people to capture ideas, organize life, and do something creative.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
          >
            <motion.a
              href="/signup"
              className="px-10 py-4 bg-[#527BFF] text-white font-[600] text-[18px] rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#527BFF]/20"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Started
            </motion.a>
            <motion.a
              href="/download"
              className="px-10 py-4 bg-transparent border border-[#527BFF] text-[#527BFF] font-[600] text-[18px] rounded-full transition-all duration-300 hover:bg-[#F2F5FF]"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Download
            </motion.a>
          </motion.div>
        </div>

        <div className="relative mx-auto max-w-[1040px]">
          <div className="relative">
            <motion.div
              className="relative w-full rounded-[12px] overflow-hidden bg-white"
              style={{ y: desktopY, boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.4 }}
            >
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/header1-1.jpg"
                alt="TickTick Desktop Interface"
                className="w-full h-auto"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-[-8%] right-[3%] md:right-[4%] w-[22%] md:w-[20%] lg:w-[18%] rounded-[16px] md:rounded-[24px] overflow-hidden bg-black"
              style={{ y: mobileY, scale: mobileScale, boxShadow: "0 25px 50px rgba(0,0,0,0.25)" }}
              initial={{ opacity: 0, y: 120, x: 30 }}
              animate={{ opacity: 1, y: 0, x: 0 }}
              transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.6 }}
            >
              <div className="relative w-full aspect-[260/540] bg-black p-[3px] md:p-[4px] rounded-[16px] md:rounded-[24px]">
                <div className="relative w-full h-full rounded-[14px] md:rounded-[20px] overflow-hidden bg-white">
                  <img
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/header2-2.jpg"
                    alt="TickTick Mobile App"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center flex-wrap gap-6 md:gap-12 mt-20 md:mt-24"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 1.0 } },
            }}
          >
            {[
              { src: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/choice1.png", alt: "Editor's Choice" },
              { src: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/choice2.png", alt: "App of the Day" },
              { src: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/choice3.png", alt: "Google Play Award" },
              { src: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/choice4.png", alt: "User Rating" },
            ].map((badge, index) => (
              <motion.img
                key={index}
                src={badge.src}
                alt={badge.alt}
                className="h-8 md:h-10 w-auto opacity-60 grayscale contrast-125"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 0.6, y: 0 } }}
                transition={{ duration: 0.5 }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TrustBadges = () => {
  const badges = [
    { id: 1, src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/choice1-3.png", alt: "App Store Editor's Choice" },
    { id: 2, src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/choice2-4.png", alt: "App Store App of the Day" },
    { id: 3, src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/choice3-5.png", alt: "Google Play Editor's Choice" },
    { id: 4, src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/choice4-6.png", alt: "Highly Rated Ratings Badge" },
  ];

  return (
    <section className="relative w-full py-12 md:py-16 bg-transparent">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }}
        >
          {badges.map((badge) => (
            <motion.div
              key={badge.id}
              className="relative w-full max-w-[140px] md:max-w-[180px] lg:max-w-[210px]"
              variants={{ hidden: { opacity: 0, y: 30, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }}
              whileHover={{ scale: 1.08, transition: { duration: 0.3 } }}
            >
              <div className="relative aspect-[570/296] w-full">
                <img src={badge.src} alt={badge.alt} className="w-full h-full object-contain" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const CoreFeaturesVideos = () => {
  const FEATURE_DATA = [
    { category: "Todo List", title: "Organize everything in your life", description: "Whether it's work projects, personal tasks, or study plans, TickTick helps you organize and confidently tackle everything in your life.", videoUrl: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/card1.mp4", reversed: false },
    { category: "Calendar Views", title: "Easily plan your schedule", description: "Different calendar views like monthly, weekly, daily, and agenda offer diverse choices for planning your time more efficiently.", videoUrl: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/card2.mp4", reversed: true },
    { category: "Pomodoro", title: "Track time and stay focused", description: 'Adopt the popular "Pomodoro Technique"—break tasks into 25-minute intervals to stay focused and achieve a productive flow.', videoUrl: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/card3.mp4", reversed: false },
    { category: "Habit Tracker", title: "Develop and maintain good habits", description: "A rich habit library, flexible tracking options, and thoughtful data review help you build good habits effortlessly and lead a fulfilling life.", videoUrl: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/card4.mp4", reversed: true },
  ];

  return (
    <section className="bg-white py-[60px] md:py-[120px] overflow-hidden">
      <div className="container mx-auto max-w-[1248px] px-6 flex flex-col gap-10 md:gap-24">
        {FEATURE_DATA.map((feature, index) => (
          <motion.div
            key={index}
            className={`flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 ${feature.reversed ? "md:flex-row-reverse" : ""}`}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: index * 0.1 }}
          >
            <motion.div
              className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg aspect-[600/380] bg-[#F7F8FA]"
              initial={{ opacity: 0, x: feature.reversed ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                <source src={feature.videoUrl} type="video/mp4" />
              </video>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 flex flex-col justify-center"
              initial={{ opacity: 0, x: feature.reversed ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            >
              <motion.span className="text-[#527BFF] text-[14px] md:text-[16px] font-medium mb-3 md:mb-5 tracking-tight" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.5 }}>
                {feature.category}
              </motion.span>
              <motion.h3 className="text-[28px] md:text-[36px] font-bold text-black leading-[1.2] mb-4 md:mb-6" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.5 }}>
                {feature.title}
              </motion.h3>
              <motion.p className="text-[#606266] text-[16px] md:text-[18px] leading-[1.6] max-w-[500px]" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.5 }}>
                {feature.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const IntuitiveFeaturesTabs = () => {
  const [activeTabId, setActiveTabId] = useState("calendar");

  const TABS = [
    { id: "calendar", label: "Calendar", icon: Calendar, mainTitle: "Efficient Calendar Views", image: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/playback/calendar.jpg", benefits: ["Monthly View gives a clear overall layout.", "Weekly View clarifies busy and free intervals.", "Agenda View ensures tasks are executed in order.", "Multi-Day View enables dynamic adjustments.", "Multi-Week View lets you shift weeks for changes."] },
    { id: "kanban", label: "Kanban", icon: LayoutDashboard, mainTitle: "Visual Kanban Boards", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/calendar-7.jpg", benefits: ["Drag and drop tasks between different stages.", "Visualize your workflow with custom columns.", "Manage complex projects with ease.", "Quickly identify bottlenecks in your process.", "Filter board views to focus on priority tasks."] },
    { id: "timeline", label: "Timeline", icon: GanttChartSquare, mainTitle: "Intuitive Project Timelines", image: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/playback/calendar.jpg", benefits: ["Track task duration and deadlines visually.", "Map out project milestones effectively.", "See the sequence of events at a glance.", "Adjust schedules by simply stretching task bars.", "Synchronize team efforts across time."] },
    { id: "eisenhower", label: "Eisenhower Matrix", icon: Grid2X2, mainTitle: "Smart Priority Matrix", image: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/playback/calendar.jpg", benefits: ["Prioritize based on urgency and importance.", "Auto-sort tasks into four distinct quadrants.", "Do the right things at the right time.", "Focus on impactful work, delegate the rest.", "Clear visual distinction for high-priority items."] },
    { id: "sticky", label: "Sticky Note", icon: StickyNote, mainTitle: "Quick Sticky Notes", image: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/features/playback/calendar.jpg", benefits: ["Pin important ideas right to your screen.", "Quick entry for random thoughts and memos.", "Keep key information visible while working.", "A clean way to handle temporary checklists.", "Seamlessly turn notes into actionable tasks."] },
  ];

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  return (
    <section className="bg-white py-[120px] overflow-hidden">
      <div className="container px-6 mx-auto max-w-[1200px]">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <h2 className="text-[#527BFF] text-[36px] font-bold leading-[1.3] mb-2">Powerful and intuitive features</h2>
          <div className="text-[#000000] text-[36px] font-bold leading-[1.3]">Simplify your daily planning</div>
        </motion.div>

        <motion.div className="bg-[#FFFFFF] border border-[#EBEEF5] rounded-[24px] p-4 md:p-10 shadow-lg" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {TABS.map((tab, index) => {
              const Icon = tab.icon;
              const isActive = activeTabId === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 cursor-pointer relative ${isActive ? "bg-[#F2F5FF] text-[#527BFF]" : "bg-transparent text-[#606266] hover:bg-[#F7F8FA]"}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} className={isActive ? "text-[#527BFF]" : "text-[#909399]"} />
                  <span className="text-[15px] font-semibold">{tab.label}</span>
                  {isActive && <motion.div className="absolute inset-0 bg-[#F2F5FF] rounded-full -z-10" layoutId="activeTab" transition={{ type: "spring", stiffness: 400, damping: 30 }} />}
                </motion.button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative group">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab.id} className="relative aspect-[1.4/1] w-full rounded-[16px] overflow-hidden shadow-lg" initial={{ opacity: 0, scale: 0.95, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 20 }} transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }} whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}>
                  <img src={activeTab.image} alt={activeTab.mainTitle} className="w-full h-full object-cover object-left" />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-5">
              <AnimatePresence mode="wait">
                <motion.div key={activeTab.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <motion.h3 className="text-[#000000] text-[28px] font-bold leading-[1.4] mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
                    {activeTab.mainTitle}
                  </motion.h3>

                  <ul className="space-y-6">
                    {activeTab.benefits.map((benefit, idx) => (
                      <motion.li key={idx} className="flex items-start gap-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + idx * 0.08, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
                        <div className="mt-1 flex-shrink-0">
                          <motion.div className="w-[18px] h-[18px] flex items-center justify-center rounded-full border border-black/10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2 + idx * 0.08, type: "spring", stiffness: 400 }}>
                            <CheckCircle2 size={12} className="text-[#527BFF]" />
                          </motion.div>
                        </div>
                        <span className="text-[#606266] text-[16px] leading-[1.6]">{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const FeatureGrid = () => {
  const features = [
    { icon: BellRing, title: "Constant Reminder", description: "With constant reminder, notifications will keep ringing until you handle them." },
    { icon: Repeat, title: "Repeat Reminder", description: "With recurring rules like weekly, monthly, yearly and custom ones at your service, you'll never forget a thing." },
    { icon: Zap, title: "NLP", description: "Smart time recognition from your input when adding tasks, with automatic reminders set." },
    { icon: Filter, title: "Filter", description: 'Easily customize filters like "high-priority tasks for this week" to view quickly.' },
    { icon: Keyboard, title: "Keyboard Shortcuts", description: "Use shortcuts and command menus to perform quick operations." },
    { icon: Users, title: "Collaboration", description: "Share lists with friends and colleagues, assign tasks, and improve collaboration." },
    { icon: Puzzle, title: "Integration", description: "Subscribe calendar and integrate with other apps. Manage all matters in TickTick." },
    { icon: BarChart2, title: "Statistics", description: "Track tasks, focus duration, and habit logs to get a comprehensive view of your progress." },
    { icon: Palette, title: "Theme", description: "Choose from 40+ themes to customize your personalized productivity tool." },
  ];

  return (
    <section className="py-[120px] bg-[#F7F8FA]">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div className="text-center mb-[60px]" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <h2 className="text-[36px] font-bold leading-[1.3] mb-2 tracking-tight">
            <span className="text-[#527BFF]">Rich and diverse features</span>
          </h2>
          <div className="text-[36px] font-bold leading-[1.3] text-black">Meet your unique needs</div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                className="bg-white p-10 rounded-[12px] flex flex-col items-start border border-[#EBEEF5]"
                variants={{ hidden: { opacity: 0, y: 40, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }}
                whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.08)", transition: { duration: 0.3 } }}
              >
                <motion.div className="mb-6 p-0 rounded-lg" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 300 }}>
                  <Icon className="w-[44px] h-[44px] text-black/80" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-[20px] font-bold text-black mb-3 leading-[1.4]">{feature.title}</h3>
                <p className="text-[#606266] text-[15px] leading-[1.6]">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="mt-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.8, duration: 0.5 }}>
          <motion.a href="/features" className="inline-flex items-center text-[#909399] hover:text-[#527BFF] transition-colors text-[16px] group" whileHover={{ x: 5 }}>
            More
            <ChevronRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const SyncSection = () => {
  return (
    <section className="w-full py-[120px] bg-[#ffffff] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div className="relative w-full min-h-[500px] lg:h-[480px] rounded-[32px] overflow-hidden flex items-center bg-[#527BFF]" initial={{ opacity: 0, y: 60, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <div className="absolute inset-0 z-0">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/platform-background-8.png" alt="Background pattern" className="w-full h-full object-cover opacity-100" />
          </div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between px-8 lg:px-[80px] py-12 lg:py-0">
            <div className="w-full lg:w-[45%] text-left">
              <motion.h2 className="text-[32px] lg:text-[48px] font-extrabold text-white leading-[1.1] mb-6" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
                Sync across all platforms
              </motion.h2>
              <motion.p className="text-[16px] lg:text-[18px] text-white/90 leading-[1.6] mb-10 max-w-[440px]" initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.35, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}>
                Whether it's your phone, computer, tablet, or watch, TickTick offers real-time sync and seamless connection.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
                <motion.a href="/download" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#527BFF] font-semibold text-[16px] rounded-full hover:bg-opacity-90 transition-all duration-300 shadow-sm" whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" }} whileTap={{ scale: 0.98 }}>
                  Download
                </motion.a>
              </motion.div>
            </div>

            <div className="w-full lg:w-[55%] mt-12 lg:mt-0 flex justify-center lg:justify-end">
              <motion.div className="relative w-full max-w-[600px] aspect-[1.3/1]" initial={{ opacity: 0, x: 60, scale: 0.9 }} whileInView={{ opacity: 1, x: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}>
                <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/platform-9.png" alt="TickTick on multiple devices" className="w-full h-full object-contain drop-shadow-2xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const MediaRecommendations = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const recommendations = [
    { id: "mkbhd", name: "MKBHD", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/mkbhd-10.png", avatar: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/media/avatar/mkbhd.png", quote: "My favorite app of the entire year which is my to-do app. It's called TickTick.", highlight: "My favorite app of the entire year", link: "#" },
    { id: "wirecutter", name: "Wirecutter", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/wirecutter-11.png", avatar: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/media/avatar/wirecutter.png", quote: "TickTick is our favorite app for productivity because of its clean design and powerful features.", highlight: "favorite app for productivity", link: "#" },
    { id: "the_verge", name: "The Verge", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/the_verge-12.png", avatar: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/media/avatar/the_verge.png", quote: "It's rare to find a productivity app that manages to do so much so simply.", highlight: "do so much so simply", link: "#" },
    { id: "mashable", name: "Mashable", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/mashable-13.png", avatar: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/media/avatar/mashable.png", quote: "TickTick is a powerhouse of productivity for anyone who wants to stay organized.", highlight: "powerhouse of productivity", link: "#" },
    { id: "digitaltrends", name: "Digital Trends", logo: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/images/digitaltrends-14.png", avatar: "https://d107mjio2rjf74.cloudfront.net/sites/res/newHome/tick/media/avatar/digitaltrends.png", quote: "One of the most complete productivity solutions we have ever used.", highlight: "most complete productivity solutions", link: "#" },
  ];

  const activeMedia = recommendations[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % recommendations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSelect = (index) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const cardVariants = {
    enter: (direction) => ({ x: direction > 0 ? 100 : -100, opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (direction) => ({ x: direction < 0 ? 100 : -100, opacity: 0, scale: 0.95 }),
  };

  return (
    <section className="py-[120px] bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <h2 className="text-[36px] font-bold leading-[1.3] text-black mb-2">Recommended by top media</h2>
          <div className="text-[24px] font-bold text-black opacity-80">Standing out among other apps</div>
        </motion.div>

        <motion.div className="relative max-w-[800px] mx-auto min-h-[440px]" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.8, delay: 0.2 }}>
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div className="w-[90%] h-full bg-white border border-[#EBEEF5] rounded-[16px] shadow-sm transform translate-y-8 scale-[0.98] opacity-60" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 0.6, y: 32 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} />
            <motion.div className="absolute w-[95%] h-full bg-white border border-[#EBEEF5] rounded-[16px] shadow-sm transform translate-y-4 scale-[0.99] opacity-80" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 0.8, y: 16 }} viewport={{ once: true }} transition={{ delay: 0.3, duration: 0.6 }} />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div key={activeMedia.id} className="relative bg-white border border-[#EBEEF5] rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-12 h-full flex flex-col items-center justify-center text-center" custom={direction} variants={cardVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}>
              <motion.div className="flex items-center justify-center mb-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.4 }}>
                <div className="w-[64px] h-[64px] relative rounded-full overflow-hidden mr-4 border border-[#EBEEF5]">
                  <img src={activeMedia.avatar} alt={activeMedia.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-[18px] font-semibold text-black">{activeMedia.name}</div>
              </motion.div>

              <motion.div className="text-[32px] leading-[1.4] text-black font-medium max-w-[600px] mx-auto" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
                <p>"{activeMedia.quote}"</p>
              </motion.div>

              <div className="mt-8 flex gap-1 justify-center">
                {recommendations.map((_, idx) => (
                  <motion.div key={idx} className={`h-1 rounded-full ${idx === activeIndex ? "bg-[#527BFF]" : "bg-[#EBEEF5]"}`} animate={{ width: idx === activeIndex ? 32 : 8 }} transition={{ duration: 0.3 }} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <motion.div className="mt-16 overflow-x-auto" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5, duration: 0.6 }}>
          <ul className="flex items-center justify-center gap-4 sm:gap-8 min-w-max px-4">
            {recommendations.map((media, index) => (
              <motion.li key={media.id} onClick={() => handleSelect(index)} className={`cursor-pointer flex items-center justify-center ${activeIndex === index ? "opacity-100" : "opacity-40"}`} whileHover={{ scale: 1.1, opacity: 1 }} whileTap={{ scale: 0.95 }} animate={{ filter: activeIndex === index ? "grayscale(0)" : "grayscale(1)", opacity: activeIndex === index ? 1 : 0.4 }} transition={{ duration: 0.3 }}>
                <div className="relative w-[120px] h-[40px] flex items-center justify-center">
                  <img src={media.logo} alt={media.name} className="w-full h-full object-contain" />
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

const UserTestimonials = () => {
  const testimonials = [
    { name: "yuji", role: "Creating an environment for life", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/yuji-2.jpg", content: "I think it's the best task management app in recent years. Even the free version is great!" },
    { name: "DRESS CODE.", role: "Representative director of Drip Co., Ltd.", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/xiongtai-6.jpg", content: "An all-in-one productivity app that has all the features you need for task management!" },
    { name: "Karina Spivakova", role: "Author of Yandex Zen and YouTube", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/KarinaSpivakova-10.jpg", content: "This is the perfect planner! From the bottom of my heart I recommend everyone who wants to try to tune in their tasks and your life!" },
    { name: "MyEducationDiscount.com", role: "The home of EDU discounts for teachers & staff.", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/MyEducationDiscount-3.png", content: "TickTick, a task management app that helps users to stay organized, is recognizing educators and students with a 25% discount on TickTick Premium." },
    { name: "Engineer Joy", role: "Mechanical Engineering student", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/engineer-7.jpg", content: "The real strength of this app is its compatibility. While working at the company, I can write to-dos freely on my desktop, make quick notes on my mobile phone, and check with my iPad!" },
    { name: "Vitaly Salakhmir", role: "IT Project manager", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/VitalySalakhmir-11.jpg", content: "There is a version of TickTick for any device - I have it on my phone, tablet and work MacBook. TickTick is awesome." },
    { name: "Yuuk", role: "GOOD ONE: Introducing exciting products", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/Yuuk-4.jpg", content: "The UI is simple and intuitive, and very easy to get started with. Lists show all the things I need to do and habits I want to track." },
    { name: "Moe", role: "Humanist. Engineer. Tech Geek.", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/Moe-8.jpg", content: "Personally the reason I like TickTick is mainly the simplicity. It's minimal and clean. TickTick is packed with features but only the ones that are absolutely necessary." },
    { name: "Dr. Yohama Caraballo-Arias", role: "Professor, writer and researcher @ UNIBO-Italy", avatar: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/9f6c07eb-309c-4c39-a20b-8d421fc76dd6-ticktick-com/assets/icons/UNIBO-12.jpg", content: "The Eisenhower matrix to view priorities has been a brilliant innovation. I use Tick Tick every day, especially the habit tracker with reminders and the focus function." },
  ];

  const TestimonialCard = ({ testimonial, index }) => (
    <motion.div className="mb-6 break-inside-avoid" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6, delay: (index % 6) * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}>
      <motion.div className="bg-white rounded-[12px] p-6 border border-[#EBEEF5] shadow-sm h-fit" whileHover={{ y: -5, boxShadow: "0 15px 35px rgba(0,0,0,0.08)", transition: { duration: 0.3 } }}>
        <div className="flex items-center gap-3 mb-4">
          <motion.div className="relative w-10 h-10 flex-shrink-0" initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 + (index % 6) * 0.05, type: "spring", stiffness: 300 }}>
            <img src={testimonial.avatar} alt={testimonial.name} className="rounded-full object-cover w-full h-full" />
          </motion.div>
          <div>
            <h4 className="text-[15px] font-bold text-[#000000] leading-tight">{testimonial.name}</h4>
            <p className="text-[13px] text-[#909399] leading-tight mt-0.5">{testimonial.role}</p>
          </div>
        </div>
        <p className="text-[15px] text-[#606266] leading-[1.6] italic">{testimonial.content}</p>
      </motion.div>
    </motion.div>
  );

  return (
    <section className="py-[100px] bg-[#F7F8FA] overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1248px]">
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          <motion.h2 className="text-[18px] font-bold text-[#527BFF] mb-2 uppercase tracking-wide" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1, duration: 0.6 }}>
            Highly rated by users
          </motion.h2>
          <motion.p className="text-[32px] md:text-[36px] font-bold text-[#000000] leading-tight" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.6 }}>
            Ongoing updates to stay preferred
          </motion.p>
        </motion.div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard key={`${testimonial.name}-${idx}`} testimonial={testimonial} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CtaBottom = () => {
  return (
    <section className="relative overflow-hidden pt-[100px] pb-[120px] md:pt-[120px] md:pb-[140px]" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #FAFBFF 100%)" }}>
      <motion.div className="absolute bottom-0 left-[-10%] w-[50%] h-[80%] blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(82, 123, 255, 0.15) 0%, transparent 70%)", zIndex: 0 }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 0.4, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
      <motion.div className="absolute bottom-[-10%] right-[-5%] w-[45%] h-[70%] blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255, 235, 150, 0.3) 0%, transparent 60%)", zIndex: 0 }} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 0.3, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} />

      <div className="container relative z-10 px-6 mx-auto text-center">
        <motion.h2 className="mb-10 text-[28px] md:text-[36px] font-bold tracking-tight text-[#527BFF]" style={{ lineHeight: "1.3" }} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
          Ready to be more productive?
        </motion.h2>

        <motion.div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}>
          <motion.a href="/signup" className="inline-flex items-center justify-center px-8 py-3 text-[16px] font-semibold text-white shadow-md" style={{ backgroundColor: "#527BFF", borderRadius: "100px", minWidth: "160px", height: "48px" }} whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(82, 123, 255, 0.3)" }} whileTap={{ scale: 0.98 }}>
            Get Started
          </motion.a>
          <motion.a href="/download" className="inline-flex items-center justify-center px-8 py-3 text-[16px] font-semibold border" style={{ color: "#527BFF", borderColor: "rgba(82, 123, 255, 0.3)", borderRadius: "100px", minWidth: "160px", height: "48px" }} whileHover={{ scale: 1.05, backgroundColor: "rgba(82, 123, 255, 0.05)" }} whileTap={{ scale: 0.98 }}>
            Download
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <TrustBadges />
        <CoreFeaturesVideos />
        <IntuitiveFeaturesTabs />
        <FeatureGrid />
        <SyncSection />
        <MediaRecommendations />
        <UserTestimonials />
        <CtaBottom />
      </div>
      <Footer />
    </main>
  );
};

export default Home;