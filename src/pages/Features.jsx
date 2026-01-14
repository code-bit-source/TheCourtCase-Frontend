import React, { useState, useRef, useEffect } from "react";
import { 
  Bell, Clock, Mail, RotateCw, MapPin, CalendarDays, 
  ChevronLeft, ChevronRight, ChevronDown 
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// --- Utilities ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Section Components ---

const FeatureWords = ["Features", "Efficiency", "Matrix", "Reminders", "Calendar"];

const Hero = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % FeatureWords.length);
        setIsVisible(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[600px] pt-[72px] pb-[120px] overflow-hidden bg-white selection:bg-[#E8EDFF]">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[80%] rounded-full blur-[100px] opacity-[0.08]"
          style={{ background: "radial-gradient(circle, #5271ff 0%, transparent 70%)" }}
        />
        <div 
          className="absolute top-[-5%] right-[-5%] w-[50%] h-[70%] rounded-full blur-[100px] opacity-[0.06]"
          style={{ background: "radial-gradient(circle, #ff6699 0%, transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10 pt-[100px] flex flex-col items-center text-center mx-auto px-6">
        <h1 className="max-w-[900px] text-[48px] md:text-[64px] font-[800] leading-[1.1] tracking-[-0.03em] text-[#111111]">
          <span className="block">Boost Your Productivity</span>
          <div className="flex items-center justify-center gap-3 md:gap-4 mt-2 h-[80px]">
            <span>with</span>
            <div className="relative inline-flex items-center">
              <div className="mr-3 text-[#5271FF] scale-110">
                 <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4.5 20.29L5.21 21L12 18L18.79 21L19.5 20.29L12 2Z" fillOpacity="0.8"/>
                 </svg>
              </div>
              <span 
                className={`text-[#5271FF] transition-all duration-500 transform ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {FeatureWords[currentWordIndex]}
              </span>
            </div>
          </div>
        </h1>

        <p className="mt-8 max-w-[560px] text-[18px] md:text-[20px] text-[#666666] leading-[1.5]">
          Strike a balance between powerful features and ease of use to keep you focused on goals.
        </p>
      </div>

      <style>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-up {
          animation: fade-up 1s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
    </section>
  );
};

const FloatingCard = ({ children, className, delay = "0s", duration = "6s" }) => (
  <div 
    className={`absolute transition-all duration-700 ease-out hover:scale-105 hover:z-50 ${className}`}
    style={{ animation: `floating ${duration} ease-in-out ${delay} infinite` }}
  >
    <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-[24px] p-4 shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden">
      {children}
    </div>
  </div>
);

const CaptureTasks = () => (
  <section className="relative overflow-hidden py-[120px] bg-white">
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none -z-10">
      <div className="absolute top-[10%] left-[10%] w-[400px] h-[400px] bg-[#5271FF]/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[100px]" />
    </div>
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center mb-[60px] max-w-2xl mx-auto">
        <h2 className="text-[#5271FF] font-bold text-[36px] leading-[1.2] mb-2">Capture tasks quickly</h2>
        <div className="text-[#111111] font-bold text-[36px] leading-[1.2]">Adding tasks has never been easier</div>
      </div>
      <div className="relative h-[800px] w-full max-w-[1000px] mx-auto">
        <FloatingCard className="bottom-[10%] right-[5%] w-[320px]" delay="0.5s" duration="7s">
          <div className="relative h-[180px] w-full mb-4 rounded-xl overflow-hidden bg-white/50">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/more-1.png" alt="Third-Party App Add" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
          <div className="px-2">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">Third-Party App Add</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">Quickly add tasks by @我的滴答清单 on Weibo, using the plugin in your email, or right-clicking any text in your browser.</p>
          </div>
        </FloatingCard>
        <FloatingCard className="bottom-[5%] left-[5%] w-[280px]" delay="1s" duration="5.5s">
          <div className="relative h-[220px] w-full mb-4 rounded-xl overflow-hidden bg-white/50">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/widget-2.png" alt="Widget Add" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
          <div className="px-2">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">Widget Add</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">After adding the widget to your phone's home screen, you can not only view tasks but also quickly add new ones.</p>
          </div>
        </FloatingCard>
        <FloatingCard className="top-[35%] right-0 w-[360px]" delay="1.5s" duration="8s">
          <div className="relative h-[120px] w-full mb-4 rounded-xl overflow-hidden bg-white/50">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/quickAdd-3.png" alt="Desktop Shortcut Add" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
          <div className="px-2">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">Desktop Shortcut Add</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">With a global shortcut, add tasks instantly, no matter what you're working on.</p>
          </div>
        </FloatingCard>
        <FloatingCard className="top-[10%] left-0 w-[340px]" delay="2s" duration="6.5s">
          <div className="relative h-[240px] w-full mb-4 rounded-xl overflow-hidden bg-white/50">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/google-4.png" alt="Google Calendar Add" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
          <div className="px-2">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">Google Calendar Add</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">Achieve integration with Google Calendar. Tasks can be added there as well, keeping your productivity flowing.</p>
          </div>
        </FloatingCard>
        <FloatingCard className="top-0 left-[40%] translate-x-[-50%] w-[330px]" delay="0s" duration="7.5s">
          <div className="relative h-[140px] w-full mb-4 rounded-xl overflow-hidden bg-white/50">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/nlp-5.png" alt="NLP" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
          <div className="px-2">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">NLP</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">Utilize NLP for task time setting. Just type in your information, and it will be identified instantly.</p>
          </div>
        </FloatingCard>
        <FloatingCard className="top-[45%] left-[15%] w-[260px]" delay="2.5s" duration="6s">
          <div className="relative h-[160px] w-full mb-4 rounded-xl overflow-hidden bg-white/50">
            <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/voice-6.png" alt="Voice Add" className="absolute inset-0 w-full h-full object-contain p-2" />
          </div>
          <div className="px-2">
            <h3 className="text-[18px] font-semibold text-[#111111] mb-2">Voice Add</h3>
            <p className="text-[14px] text-[#666666] leading-relaxed">When typing isn't convenient, just add tasks with voice, and it will automatically convert to text.</p>
          </div>
        </FloatingCard>
      </div>
    </div>
    <style>{`
      @keyframes floating {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-15px); }
        100% { transform: translateY(0px); }
      }
    `}</style>
  </section>
);

const TaskManagement = () => (
  <section className="relative w-full overflow-hidden bg-white py-[120px]">
    <div className="container mx-auto px-6 max-w-[1200px]">
      <div className="mb-16">
        <h2 className="text-[#5271FF] text-[36px] font-bold leading-tight tracking-tight mb-2">Effortless task management</h2>
        <div className="text-[#111111] text-[36px] font-bold leading-tight tracking-tight">Handle your work and personal tasks</div>
      </div>
      <div className="relative h-[600px] md:h-[700px] w-full mt-10">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute left-0 top-0 z-10 w-[60%] md:w-[50%] transform -translate-x-8 translate-y-0">
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white/70 backdrop-blur-md border border-white/30">
              <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/list-7.png" alt="List view interface" width={680} height={480} className="w-full h-auto object-cover" />
            </div>
            <div className="mt-8 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#111111]"><path d="M6 8h20M6 16h20M6 24h20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                <h3 className="text-[24px] font-semibold text-[#111111]">List</h3>
              </div>
              <p className="text-[#666666] text-[16px] max-w-[280px]">Manage tasks with list to keep your plans organized.</p>
            </div>
          </div>
          <div className="absolute left-1/2 top-[15%] z-20 w-[60%] md:w-[45%] transform -translate-x-[40%] translate-y-10">
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white/70 backdrop-blur-md border border-white/30">
              <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/filter-8.png" alt="Filter view interface" width={580} height={440} className="w-full h-auto object-cover" />
            </div>
            <div className="mt-8 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#111111]"><path d="M3 6h18M6 12h12M10 18h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
                <h3 className="text-[24px] font-semibold text-[#111111]">Filter</h3>
              </div>
              <p className="text-[#666666] text-[16px] max-w-[280px]">Use smart filters to focus on what matters most.</p>
            </div>
          </div>
          <div className="absolute right-0 top-[30%] z-30 w-[60%] md:w-[45%] transform translate-x-4 translate-y-20">
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] bg-white/70 backdrop-blur-md border border-white/30">
              <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/tag-9.png" alt="Tag view interface" width={580} height={440} className="w-full h-auto object-cover" />
            </div>
            <div className="mt-8 pl-4">
              <div className="flex items-center gap-3 mb-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="text-[#111111]"><path d="M25.5 16.5L16.5 25.5L6.5 15.5V6.5h9l10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="10.5" cy="10.5" r="1.5" fill="currentColor"/></svg>
                <h3 className="text-[24px] font-semibold text-[#111111]">Tag</h3>
              </div>
              <p className="text-[#666666] text-[16px] max-w-[280px]">Add tags to tasks, making task management easier.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="absolute -top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#5271FF10] rounded-full blur-[100px] pointer-events-none -z-10" />
    <div className="absolute -bottom-[10%] -right-[10%] w-[600px] h-[600px] bg-[#FF669905] rounded-full blur-[100px] pointer-events-none -z-10" />
  </section>
);

const reminderData = [
  { id: "notification", title: "Notification", description: "Set a time to get reminders, you can not only choose multiple alerts, but also pin them to your lock screen (iOS only).", icon: <Bell className="w-[20px] h-[20px]" />, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/reminder-10.png" },
  { id: "constant", title: "Constant Reminder", description: "After enabling Constant Reminder, notifications will keep ringing until you handle them.", icon: <Clock className="w-[20px] h-[20px]" />, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/strong-11.png" },
  { id: "email", title: "Email Reminder", description: "Besides app notifications, you can also get email reminders. Never miss any important ones.", icon: <Mail className="w-[20px] h-[20px]" />, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/mail-13.png" },
  { id: "repeat", title: "Repeat Reminder", description: "With recurring rules like weekly, monthly, yearly and custom ones at your service, you'll never forget a thing.", icon: <RotateCw className="w-[20px] h-[20px]" />, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/repeat-14.png" },
  { id: "location", title: "Location Reminder", description: "Some tasks need specific locations. When there, TickTick will remind you. (iOS only).", icon: <MapPin className="w-[20px] h-[20px]" />, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/location-15.png" },
  { id: "daily", title: "Daily Reminder", description: "Enable daily reminders and set a time, and TickTick will remind you to organize today's tasks and start a new day.", icon: <CalendarDays className="w-[20px] h-[20px]" />, image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/daily-17.png" },
];

const Reminders = () => {
  const [activeId, setActiveId] = useState("notification");
  return (
    <section className="py-[120px] bg-white overflow-hidden">
      <div className="container max-w-[1200px] mx-auto px-6">
        <div className="mb-[40px]">
          <h2 className="text-[#5271FF] text-[20px] font-semibold mb-2 leading-tight">Powerful reminder features</h2>
          <div className="text-[36px] font-bold text-[#111111] leading-[1.2]">Never miss any important tasks</div>
        </div>
        <div className="flex flex-col lg:flex-row items-start gap-[60px]">
          <div className="w-full lg:w-[420px] flex flex-col gap-3 shrink-0">
            {reminderData.map((item) => (
              <button key={item.id} onClick={() => setActiveId(item.id)} className={cn("flex items-start gap-4 p-5 rounded-[12px] text-left transition-all duration-300", activeId === item.id ? "bg-[#E8EDFF] shadow-sm transform translate-x-2" : "bg-[#F5F5F5] hover:bg-gray-100")}>
                <div className={cn("p-2 rounded-lg shrink-0", activeId === item.id ? "text-[#5271FF]" : "text-[#666666]")}>{item.icon}</div>
                <div>
                  <h3 className={cn("text-[18px] font-bold leading-tight mb-1", activeId === item.id ? "text-[#111111]" : "text-[#666666]")}>{item.title}</h3>
                  {activeId === item.id && <p className="text-[14px] text-[#666666] leading-relaxed">{item.description}</p>}
                </div>
              </button>
            ))}
          </div>
          <div className="relative w-full aspect-[4/3] lg:h-[600px] bg-[#F5F9FF] rounded-[24px] border border-[#EEEEEE] overflow-hidden flex items-center justify-center p-8">
            {reminderData.map((item) => (
              <div key={item.id} className={cn("absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out px-12", activeId === item.id ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-95 pointer-events-none")}>
                <div className="relative w-full h-full">
                  <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const calendarTabs = [
  { key: "month", label: "Monthly", description: "The Monthly View offers a clear overview of the entire month. You can easily plan and check there.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/month-18.png" },
  { key: "week", label: "Weekly", description: "The Weekly View provides a more focused outlook on your week's commitments and available time slots.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/week-19.png" },
  { key: "agenda", label: "Agenda", description: "The Agenda View lists your upcoming tasks in a vertical timeline, perfect for focusing on what's next.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/month-18.png" },
  { key: "m-day", label: "Multi-Day", description: "View multiple days at once to coordinate across your near-term schedule effectively.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/week-19.png" },
  { key: "m-week", label: "Multi-Week", description: "Plan across several weeks to keep track of longer project phases and upcoming deadlines.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/month-18.png" },
];

const CalendarSchedule = () => {
  const [activeTab, setActiveTab] = useState(calendarTabs[0]);
  return (
    <section className="bg-white py-[120px] overflow-hidden">
      <div className="container mx-auto max-w-[1200px] px-6">
        <div className="mb-14">
          <h2 className="text-[36px] font-bold leading-[1.2] tracking-[-0.01em] text-[#111111] mb-2"><span className="text-[#5271FF]">Schedule your day</span></h2>
          <div className="text-[36px] font-bold leading-[1.2] tracking-[-0.01em] text-[#111111]">Visualize your schedule on the Calendar</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-[1000px] aspect-[1000/620] mb-12 transition-all duration-500 ease-in-out">
            <div className="absolute inset-0 bg-white rounded-[24px] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-[#eeeeee]">
              {calendarTabs.map((tab) => (
                <div key={tab.key} className={cn("absolute inset-0 transition-opacity duration-500 flex items-center justify-center p-4", activeTab.key === tab.key ? "opacity-100 z-10" : "opacity-0 z-0")}>
                  <img src={tab.image} alt={tab.label} className="absolute inset-0 w-full h-full object-contain p-2" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-2 md:gap-x-10 mb-8 border-b border-[#eeeeee] w-full max-w-[800px]">
            {calendarTabs.map((tab) => (
              <button key={tab.key} onClick={() => setActiveTab(tab)} className={cn("relative pb-4 text-[18px] font-semibold transition-all cursor-pointer focus:outline-none", activeTab.key === tab.key ? "text-[#111111]" : "text-[#666666] hover:text-[#111111]")}>
                {tab.label}
                {activeTab.key === tab.key && <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#111111] rounded-full" />}
              </button>
            ))}
          </div>
          <div className="max-w-[700px] text-center"><p className="text-[16px] leading-[1.6] text-[#666666] transition-opacity duration-300">{activeTab.description}</p></div>
        </div>
      </div>
    </section>
  );
};

const viewTabs = [
  { id: "list", label: "List", title: "List", description: "In the list view, content is organized into three columns for a clear structure. The first column is for category lists, making task management easy. The second shows tasks and their schedules, while the third provides task details where you can add notes, images, and use Markdown for content creation.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/list-20.png" },
  { id: "kanban", label: "Kanban", title: "Kanban", description: "In the kanban view, tasks are organized into columns based on your chosen grouping, making it easy to see different types at a glance. For example, with custom grouping, you can view what the product, design, development, and operations teams need to do today, along with progress details and statuses.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/kanban-21.png" },
  { id: "timeline", label: "Timeline", title: "Timeline", description: "The timeline view is a lighter project management tool compared to Gantt charts. Tasks are displayed according to their set durations, allowing you to see how long each task will take at a glance. You can also easily adjust task durations or start times by dragging, enabling flexible project scheduling.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/timeline-22.png" },
];

const ViewModes = () => {
  const [activeTab, setActiveTab] = useState(viewTabs[0].id);
  const currentTab = viewTabs.find((tab) => tab.id === activeTab) || viewTabs[0];
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="mb-12">
          <h2 className="text-[#5271FF] text-[20px] font-bold mb-2">Multiple view modes</h2>
          <p className="text-[#111111] text-[36px] font-bold leading-tight">Find the best way to manage</p>
        </div>
        <div className="relative mb-16">
          <div className="flex gap-12 border-b border-[#EEEEEE]">
            {viewTabs.map((tab) => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={cn("pb-4 text-[20px] font-medium transition-all relative cursor-pointer outline-none", activeTab === tab.id ? "text-[#111111]" : "text-[#666666] hover:text-[#111111]")}>
                {tab.label}
                {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#111111] rounded-t-full" />}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 pt-8">
            <h3 className="text-[28px] font-bold text-[#111111] mb-6">{currentTab.title}</h3>
            <p className="text-[#666666] text-[16px] leading-[1.8]">{currentTab.description}</p>
          </div>
          <div className="lg:col-span-7 relative">
            <div className="relative w-full aspect-[16/10] bg-[#F9FAFB] rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
              <img src={currentTab.image} alt={currentTab.label} className="absolute inset-0 w-full h-full object-contain p-4 lg:p-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const EfficiencyTools = () => (
  <section className="py-[120px] bg-white overflow-hidden">
    <div className="container mx-auto px-6 max-w-[1200px]">
      <div className="mb-[40px] text-left md:text-center">
        <h2 className="text-[36px] font-bold leading-[1.2] tracking-[-0.01em] text-[#111111]"><span className="text-[#5271FF]">Rich efficiency tools</span></h2>
        <div className="text-[36px] font-bold leading-[1.2] tracking-[-0.01em] text-[#111111]">Help you manage time better</div>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full">
          <div className="relative border border-[#EEEEEE] rounded-[24px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:translate-y-[-5px] transition-all duration-300 p-8 min-h-[460px] flex flex-col items-center justify-center text-center group">
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-80">
              <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/habit-23.png" alt="Habit Tracker" className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="relative z-10 bg-white/70 backdrop-blur-sm p-6 rounded-2xl max-w-[400px]">
              <h3 className="text-[24px] font-semibold text-[#111111] mb-2">Habit Tracker</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">Detailed statistics and feedback help you develop good habits.</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-[#EEEEEE] rounded-[24px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:translate-y-[-5px] transition-all duration-300 p-10 flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-[24px] font-semibold text-[#111111] mb-2">Eisenhower Matrix</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">Concentrate on important and urgent tasks to improve work efficiency.</p>
            </div>
            <div className="mt-auto flex justify-center">
              <div className="relative w-full max-w-[320px] aspect-square">
                <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/matrix-24.png" alt="Matrix" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            </div>
          </div>
          <div className="border border-[#EEEEEE] rounded-[24px] bg-white shadow-[0_10px_40px_rgba(0,0,0,0.04)] hover:translate-y-[-5px] transition-all duration-300 p-10 flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-[24px] font-semibold text-[#111111] mb-2">Pomodoro</h3>
              <p className="text-[16px] text-[#666666] leading-[1.6]">Break down complex tasks using the Pomodoro, stay focused, and conquer procrastination.</p>
            </div>
            <div className="mt-auto flex justify-center py-6">
              <div className="relative w-full max-w-[320px] aspect-square">
                <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/pomo-25.png" alt="Pomodoro" className="absolute inset-0 w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const moreFeaturesData = [
  { title: "Keyboard Shortcuts", description: "Use shortcuts and command menus to perform quick operations.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/shortcuts-26.png" },
  { title: "Collaboration", description: "Share lists with friends and colleagues, assign tasks, and improve collaboration.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/share-27.png" },
  { title: "Integration", description: "Subscribe calendar and integrate with other apps. Manage all matters in TickTick.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/integration-28.png" },
  { title: "Statistics", description: "Track tasks, focus duration, and habit logs to get a comprehensive view of your progress.", image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/81a6c31f-a41e-47ab-ac9c-5d7625794739-ticktick-com/assets/images/statistics-29.png" },
];

const MoreFeatures = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (el) { el.addEventListener("scroll", checkScroll); checkScroll(); window.addEventListener("resize", checkScroll); }
    return () => { if (el) el.removeEventListener("scroll", checkScroll); window.removeEventListener("resize", checkScroll); };
  }, []);
  const scroll = (direction) => { if (scrollRef.current) scrollRef.current.scrollBy({ left: direction === "left" ? -400 : 400, behavior: "smooth" }); };
  return (
    <section className="py-[120px] bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="max-w-[800px]"><h2 className="text-[36px] font-bold text-[#111111] border-l-4 border-[#5271FF] pl-4">Explore more features</h2></div>
          <div className="flex gap-4">
            <button onClick={() => scroll("left")} disabled={!canScrollLeft} className={cn("w-12 h-12 flex items-center justify-center rounded-full border border-[#EEEEEE] transition-all", !canScrollLeft ? "opacity-30" : "hover:bg-[#F5F5F5]")}><ChevronLeft className="w-6 h-6 text-[#111111]" /></button>
            <button onClick={() => scroll("right")} disabled={!canScrollRight} className={cn("w-12 h-12 flex items-center justify-center rounded-full border border-[#EEEEEE] transition-all", !canScrollRight ? "opacity-30" : "hover:bg-[#F5F5F5]")}><ChevronRight className="w-6 h-6 text-[#111111]" /></button>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-none" style={{ scrollbarWidth: 'none' }}>
          {moreFeaturesData.map((feature, index) => (
            <div key={index} className="flex-shrink-0 w-[280px] md:w-[380px] snap-start">
              <div className="bg-white rounded-[24px] border border-[#EEEEEE] overflow-hidden transition-all hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-full flex flex-col">
                <div className="relative aspect-[4/3] bg-[#F9FAFB] flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <img src={feature.image} alt={feature.title} className="absolute inset-0 w-full h-full object-contain" />
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-[20px] font-semibold text-[#111111] mb-3">{feature.title}</h3>
                  <p className="text-[16px] text-[#666666] leading-[1.6]">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`.scrollbar-none::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
};

// --- Main Page Export ---

const Features = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-[#E8EDFF]">
      <Header />
      <main className="flex-1">
        <Hero />
        <CaptureTasks />
        <TaskManagement />
        <Reminders />
        <CalendarSchedule />
        <ViewModes />
        <EfficiencyTools />
        <MoreFeatures />
      </main>
      <Footer />
    </div>
  );
};

export default Features;
