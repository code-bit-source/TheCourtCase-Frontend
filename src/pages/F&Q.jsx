"use client";

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronRight, ChevronLeft } from 'lucide-react';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [expandedItems, setExpandedItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    { label: "Welcome", isSection: true },
    { label: "🏅 Beginner's Guide", page: "beginners-guide" },
    { label: "🔍 FAQ", page: "faq" },
    { label: "💎 Design Principles", page: "design-principles" },
    { label: "🚀 What's New", page: "whats-new" },
    { label: "Feature Guide", isSection: true },
    { label: "✅ Task", hasChevron: true, subItems: ["Create a Task", "Edit a Task", "Complete a Task", "Delete a Task", "Task Priority", "Task Tags"] },
    { label: "📆 Calendar", hasChevron: true, subItems: ["Calendar View", "Sync with Google Calendar", "Sync with Outlook", "Calendar Settings"] },
    { label: "🎯 Eisenhower Matrix", hasChevron: true, subItems: ["What is Eisenhower Matrix", "How to Use It", "Matrix Settings"] },
    { label: "🍅 Pomodoro", hasChevron: true, subItems: ["Start a Pomo", "Pomo Settings", "Pomo Statistics"] },
    { label: "⏰ Habit Tracker", hasChevron: true, subItems: ["Create a Habit", "Track Progress", "Habit Statistics"] },
    { label: "⏳ Countdown", hasChevron: true, subItems: ["Create Countdown", "Countdown Widget"] },
    { label: "🤝 Collaboration", hasChevron: true, subItems: ["Share a List", "Assign Tasks", "Team Features"] },
    { label: "🔗 Import and Integration", hasChevron: true, subItems: ["Import from Todoist", "Import from Wunderlist", "API Integration"] },
    { label: "🏆 Achievements", hasChevron: true, subItems: ["Achievement Score", "Badges", "Leaderboard"] },
    { label: "🔑 Account and Security", hasChevron: true, subItems: ["Change Password", "Two-Factor Auth", "Delete Account"] },
    { label: "Unique Features", isSection: true },
    { label: "⏳ Timeline View", page: null },
    { label: "💻 Cross-Platform Support", page: null },
    { label: "🌮️ Widgets", page: null },
    { label: "📝 Desktop Sticky Notes", page: null },
    { label: "⌨️ Desktop Shortcuts", page: null },
    { label: "🖱️ Desktop Interaction Tips", page: null },
    { label: "📔 Notes and Summary", page: null },
    { label: "🕐 Smart Recognition", page: null },
    { label: "🔜 Shortcuts", page: null },
  ];

  const toggleExpand = (idx) => {
    setExpandedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <aside className="w-[280px] hidden md:flex flex-col border-r border-[#f0f0f0] bg-[#fafafa] h-screen fixed left-0 top-0 overflow-y-auto z-40">
      <div className="p-6 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-[#bdbdbd]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documentation..."
            className="w-full h-[44px] bg-white border border-[#e8e8e8] rounded-xl pl-11 pr-4 text-[14px] text-[#424242] placeholder-[#bdbdbd] focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/10 transition-all shadow-sm"
          />
        </div>
      </div>
      <nav className="flex-1 px-3 pb-8">
        {menuItems.map((item, idx) => (
          item.isSection ? (
            <div key={idx} className="text-[11px] font-semibold uppercase text-[#9e9e9e] px-3 py-3 mt-5 tracking-wider">{item.label}</div>
          ) : (
            <div key={idx}>
              <button
                onClick={() => {
                  if (item.hasChevron) toggleExpand(idx);
                  else if (item.page) onPageChange(item.page);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 text-[14px] rounded-lg transition-all ${
                  item.page === currentPage 
                    ? 'text-[#6366f1] font-medium bg-[#eef2ff]' 
                    : 'text-[#616161] hover:bg-white hover:text-[#424242]'
                }`}
              >
                <span className="truncate">{item.label}</span>
                {item.hasChevron && <ChevronDown className={`w-4 h-4 text-[#9e9e9e] transition-transform ${expandedItems[idx] ? 'rotate-180' : ''}`} />}
              </button>
              {item.hasChevron && expandedItems[idx] && item.subItems && (
                <div className="ml-5 mt-1 mb-2 border-l-2 border-[#e8e8e8] pl-3">
                  {item.subItems.map((subItem, subIdx) => (
                    <button key={subIdx} className="w-full text-left px-2 py-2 text-[13px] text-[#757575] hover:text-[#6366f1] rounded-md transition-colors">{subItem}</button>
                  ))}
                </div>
              )}
            </div>
          )
        ))}
      </nav>
    </aside>
  );
};

const BeginnersGuidePage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "iOS", videoUrl: "https://pull.ticktick.app/hc/all/51f09b5965184b4174fe5a367f37a0bf.mp4" },
    { label: "Android", videoUrl: "https://pull.ticktick.app/hc/all/eec3b2b1c1b2f1455cd3bf9c2bb682b8.mp4" },
  ];

  const features = [
    { id: 'todo-list', title: 'Todo List, Save Brainpower', description: 'Write down things in your mind, so you can have a clear understanding of the tasks you need to complete each day.', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/e04acab6ad73689b5b86246ad582e022-4.jpg' },
    { id: 'schedule', title: 'Schedule Management, Clear at a Glance', description: 'You can visually view the schedules of each month and day, and no longer be confused about "what\'s next".', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/e4b88c69858311d00081f06566c16adb-5.jpg' },
    { id: 'matrix', title: 'Eisenhower Matrix, Boost Efficiency', description: 'Eisenhower Matrix can help you divide tasks into two levels of importance and urgency, helping you be more efficient.', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/d20d4bad144a40a24fef6932d69c9715-6.jpg' },
    { id: 'pomodoro', title: 'Efficient Focus, Rescue Procrastination', description: 'Start a Pomodoro timer, focusing for 25 minutes at a time to help you concentrate and get things done.', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/51af4cb99cfb3af65767df0b430ae5c7-7.jpg' },
    { id: 'habits', title: 'Develop Habits, Improve Yourself', description: 'The Habit Gallery has over 60 habits to choose from. Select the habits you want and set small goals for yourself!', image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/9fa05a7f85e5cb263635d9048b0690f4-8.png' },
  ];

  return (
    <article>
      <h1 className="text-[32px] font-bold leading-[1.2] mb-6 text-[#1a1a1a]">🏅 Beginner&apos;s Guide</h1>
      <div className="rounded-xl overflow-hidden mb-10 shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/db7b9a33c0c93dabc3e36abcc0c82b20-3.jpg" alt="Hero" className="w-full h-auto" />
      </div>

      <h2 id="what-is-ticktick" className="text-[24px] font-semibold leading-[1.3] mt-16 mb-4 text-[#1a1a1a]">What is TickTick?</h2>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-5">TickTick is a simple and easy-to-use time management tool. It includes modules for Tasks, Calendar, Eisenhower Matrix, Pomodoro, and Habit Tracker. You can use it to manage your work and life, achieve your goals in less time, and free yourself from the clutter of to-do lists.</p>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4 font-medium">Getting Started Video</p>

      <div className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          {tabs.map((tab, index) => (
            <button key={tab.label} onClick={() => setActiveTab(index)} className={`px-4 py-1.5 text-[13px] rounded-full font-medium transition-all ${activeTab === index ? "bg-[#6366f1] text-white shadow-sm" : "bg-[#f5f5f5] text-[#757575] hover:bg-[#eeeeee]"}`}>{tab.label}</button>
          ))}
        </div>
        <div className="relative w-full overflow-hidden rounded-xl border border-[#e8e8e8] bg-[#1a1a1a] aspect-video shadow-sm">
          <video controls className="w-full h-full object-contain" playsInline key={activeTab}>
            <source src={tabs[activeTab].videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>

      {features.map((feature) => (
        <div key={feature.id}>
          <h3 id={feature.id} className="text-[20px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">{feature.title}</h3>
          <p className="text-[16px] leading-[1.7] mb-5 text-[#4a4a4a]">{feature.description}</p>
          <img src={feature.image} alt={feature.title} className="w-full h-auto rounded-xl mb-10 shadow-sm" />
        </div>
      ))}

      <h2 id="how-can-i-use-it" className="text-[24px] font-semibold leading-[1.3] mt-16 mb-4 text-[#1a1a1a]">How can I use it?</h2>
      
      <h3 className="text-[20px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Convenient and Fast Recording of Tasks</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">Meet your quick recording needs anytime, anywhere:</p>
      <ul className="list-disc ml-6 mb-5 space-y-2 text-[#4a4a4a] text-[16px] leading-[1.7]">
        <li>Suddenly have an idea in your mind? Record it all at once using voice recording.</li>
        <li>Can&apos;t handle a work email at the moment? Forward it to TickTick to make sure you don&apos;t forget.</li>
      </ul>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">You can quickly add tasks in many ways.</p>
      <Link to="/help-center" className="text-[#6366f1] hover:text-[#4f46e5] inline-flex items-center gap-1 font-medium mb-8 transition-colors">👉 How to quickly add tasks</Link>

      <h3 className="text-[20px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Never Miss a Reminder Again</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">You can set multiple reminders for important tasks, such as your mother&apos;s birthday. Set a reminder three days in advance and another one on the day itself to make sure you don&apos;t miss it.</p>
      <Link to="/help-center" className="text-[#6366f1] hover:text-[#4f46e5] inline-flex items-center gap-1 font-medium mb-8 transition-colors">👉 Effective Reminder feature</Link>

      <h3 className="text-[20px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Use Repeat Feature to Save Brain Capacity</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">We have many tasks that need to be done regularly, such as:</p>
      <ul className="list-disc ml-6 mb-5 space-y-2 text-[#4a4a4a] text-[16px] leading-[1.7]">
        <li>Weekly meetings</li>
        <li>Credit card payments</li>
        <li>Friend&apos;s birthday</li>
      </ul>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">This is where the Repeat feature comes in handy. TickTick provides many time options for recurring tasks. <Link to="/help-center" className="text-[#6366f1] hover:text-[#4f46e5] font-medium transition-colors">👉 Powerful recurring tasks</Link></p>

      <h2 id="follow-ticktick" className="text-[24px] font-semibold leading-[1.3] mt-16 mb-4 text-[#1a1a1a]">Follow TickTick</h2>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">If you want to get more application updates and time management methods, you can follow us on social media.</p>
      <ul className="list-disc ml-6 mb-5 space-y-2 text-[#4a4a4a] text-[16px] leading-[1.7]">
        <li>Twitter: @TickTick</li>
        <li>Instagram: @TickTickApp</li>
        <li>Facebook: @TickTickApp</li>
      </ul>
    </article>
  );
};

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({ "0-0": true });
  const toggleItem = (key) => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  const sections = [
    { emoji: "🔥", title: "Hot Topics", items: [
      { title: "How to back up data?", content: "You can log in to the web version to back up your data. Log in to your account - Click on the 'Avatar' in the upper left corner - 'Settings', then click on 'Backup & Restore' in the left sidebar - 'Generate Backup' to save your data backup on the desktop." },
      { title: "How to merge account data?", content: "If you want to merge the data of two accounts, you can first back up the data of one account, and then import the backed up data into another account via the Web version settings." },
      { title: "How to add pictures or attachments to tasks?", content: "TickTick supports adding pictures and attachments. Click on the task - upper right corner '...' - 'Attachment' on mobile, or use Ctrl+V on desktop details page." },
      { title: "Does TickTick offer Educational Discounts?", content: "Yes, students and educators can enjoy a 25% discount. Register with an educational email and apply via the Educational Discount page." }
    ]},
    { emoji: "🔑", title: "Account & Data", items: [
      { title: "How to change password?", content: "Go to Settings > Account > Change Password. You'll need to enter your current password and then set a new one." },
      { title: "How do I delete my account?", content: "Go to Settings > Account > Delete Account. Please note this action is irreversible and all your data will be permanently deleted." },
      { title: "How to recover a deleted task?", content: "Deleted tasks are moved to Trash and kept for 30 days. Go to Settings > Trash to restore any accidentally deleted tasks." }
    ]},
    { emoji: "✅", title: "List & Task", items: [
      { title: "How to view Task Activities?", content: "Task activities show all changes made to a task. Click on a task > '...' menu > 'Activities' to see the complete history." },
      { title: "Why can't I see some smart lists?", content: "Smart lists can be shown or hidden in Settings > Smart Lists. Toggle the visibility of lists like 'Today', 'Tomorrow', 'Next 7 Days', etc." }
    ]}
  ];

  return (
    <article>
      <h1 className="text-[32px] font-bold leading-[1.2] mb-6 text-[#1a1a1a]">🔍 FAQ</h1>
      <div className="rounded-xl overflow-hidden mb-10 shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/afe4ec5d22de3ceb3ede766ea6b598f8-3.jpeg" alt="FAQ Banner" className="w-full h-auto" />
      </div>
      {sections.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-10">
          <h2 className="text-[24px] font-semibold text-[#1a1a1a] flex items-center gap-3 mt-12 mb-6"><span>{section.emoji}</span> {section.title}</h2>
          <div className="space-y-3">
            {section.items.map((item, itemIdx) => {
              const key = `${sectionIdx}-${itemIdx}`;
              return (
                <div key={itemIdx} className="rounded-xl overflow-hidden border border-[#e8e8e8] bg-white shadow-sm">
                  <button onClick={() => toggleItem(key)} className="w-full flex items-center gap-3 p-4 text-left hover:bg-[#fafafa] transition-colors">
                    {openItems[key] ? <ChevronDown className="w-5 h-5 text-[#6366f1]" /> : <ChevronRight className="w-5 h-5 text-[#9e9e9e]" />}
                    <span className="text-[15px] font-medium text-[#1a1a1a]">{item.title}</span>
                  </button>
                  {openItems[key] && <div className="px-5 pb-5 pt-0 text-[15px] leading-[1.7] text-[#4a4a4a] ml-8">{item.content}</div>}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </article>
  );
};

const DesignPrinciplesPage = () => {
  return (
    <article className="text-[16px] leading-[1.7] text-[#4a4a4a]">
      <h1 className="text-[32px] font-bold leading-[1.2] mb-8 text-[#1a1a1a]">💎 Design Principles</h1>
      <div className="mb-10 rounded-xl overflow-hidden shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/0644abbde8509a96a8c80eb79dbaad2f-3.jpeg" alt="Design Principles Hero" className="w-full h-auto" />
      </div>
      <p className="mb-6">How to create an app loved by millions of users worldwide? This is not a simple question.</p>

      <h3 id="classic-design" className="text-[20px] font-semibold leading-[1.4] mt-12 mb-4 text-[#1a1a1a]">Only Classic Design Can Transcend Time</h3>
      <p className="mb-6">Those familiar with efficiency apps may notice that our app is different from others, with a major difference being the presentation of task details.</p>
      <p className="mb-6">Many apps put a lot of functional buttons on the task details page, which looks rich. But in our opinion, this is not good design, because these functions are not necessary for users.</p>
      <p className="mb-6">So we boldly subtracted and only left the most essential functions, leaving more space for users to write. Because we believe that only simple design can approach classics, transcend time, and withstand the test of time.</p>
      <p className="mb-6">In addition to simplicity, we also strive to meet users&apos; intuition in many designs.</p>
      <p className="mb-6">In real life, we can pick up an object and place it in different positions. In our app, you can also adjust the position of tasks by long-pressing and dragging, whether in the task list, calendar, or Eisenhower Matrix.</p>
      <p className="mb-6">All of these operations are so natural that you don&apos;t even realize they are our design.</p>

      <h3 id="befriend-users" className="text-[20px] font-semibold leading-[1.4] mt-12 mb-4 text-[#1a1a1a]">Befriend Users Without Disturbing Them</h3>
      <p className="mb-6">In our view, when users use our app, they are to some extent having a conversation with us. We hope that our relationship with users is not that of customers or traffic, but more like friends.</p>
      <p className="mb-6">Because when users record their things in our app, it is a kind of trust in us. So we hope that in the eyes of users, we are a kind, honest, and trustworthy image.</p>
      <p className="mb-6">This is why we don&apos;t have &quot;splash ads,&quot; even though it can bring us considerable revenue. We also maintain the rare &quot;restraint&quot; in this industry, without unremovable red dots and dazzling marketing activities.</p>
      <p className="mb-6">In the interaction with users, users will also inadvertently feel our intentions. Here&apos;s a small example.</p>
      <p className="mb-6">&quot;Do you think 12:30 AM is midnight or noon?&quot;</p>
      <p className="mb-6">When asked this question, many people are confused, but in fact, in the 12-hour format, 12:30 AM is actually early morning. So when users choose 12:30 AM, we will have a small prompt to avoid them selecting the wrong time.</p>
      <p className="mb-6">And there are actually many designs like this in our app.</p>

      <h3 id="manage-everything" className="text-[20px] font-semibold leading-[1.4] mt-12 mb-4 text-[#1a1a1a]">Help Users Manage Everything in Life</h3>
      <p className="mb-6">We now have nearly 20 million users worldwide, and the earliest users of our product have been with us for 9 years.</p>
      <p className="mb-6">From the initial Task and Reminder features to the later Calendar function, Pomodoro, Habit Tracker, and Eisenhower Matrix.</p>
      <p className="mb-6">We are very grateful to these users. It is because of their support that we can continuously improve and refine our app. At the same time, it also allows us to more deeply understand that &quot;what users need is not just task management, but everything in their lives.&quot;</p>
      <p className="mb-6">Of course, at the same time, a new issue has been placed in front of us:</p>
      <p className="mb-6">How to balance powerful features and ease of use while meeting the needs of more users?</p>
      <p className="mb-6">Our answer is to respect the user&apos;s power of choice.</p>
      <p className="mb-6">In our app, users can choose which features they need and which ones they don&apos;t, based on their preferences. Users can also adjust the order of features and even hide less frequently used ones behind a &quot;More&quot; button.</p>

      <h3 id="final-thoughts" className="text-[20px] font-semibold leading-[1.4] mt-12 mb-4 text-[#1a1a1a]">Final Thoughts</h3>
      <p className="mb-6">Finally, thank you so much for reading, and we hope our app can help you lead a mindful life and achieve more.</p>
    </article>
  );
};

const WhatsNewPage = () => {
  return (
    <article>
      <h1 className="text-[32px] font-bold leading-[1.25] mb-6 text-[#1a1a1a]">🚀 What&apos;s New</h1>

      <h2 id="version-8" className="text-[24px] font-semibold leading-[1.3] mt-12 mb-4 text-[#1a1a1a]">Version 8.0 — A Major Update to Tasks & Calendar 🚀 (Jan 8)</h2>
      
      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Suggested Tasks</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">The Today list now includes a new <strong>Suggested Tasks</strong> feature. It helps you review unfinished tasks and decide what to focus on today. Tasks are suggested based on factors such as creation time, rescheduling history, and upcoming due dates, making it easier to identify priorities and quickly add them to Today.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/936289531111971ea9624278324a4a3f-3.png" alt="Suggested Tasks" className="w-full h-auto" />
      </figure>
      <blockquote className="border-l-4 border-[#6366f1] bg-[#f8f9ff] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">How to use: Today → Top-right Suggested Tasks</blockquote>

      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">List Backgrounds</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">You can now set a personalized background for each list. By using different visual styles, it&apos;s easier to distinguish between work, life, and personal lists at a glance.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/31ac4cd63e94feeb06d2f34011974a6b-4.png" alt="List Backgrounds" className="w-full h-auto" />
      </figure>
      <blockquote className="border-l-4 border-[#f59e0b] bg-[#fffbeb] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">📱 Mobile only</blockquote>
      <blockquote className="border-l-4 border-[#6366f1] bg-[#f8f9ff] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">How to use: List → More → Background</blockquote>

      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Yearly View + Heatmap</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">A new <strong>Yearly View</strong> is now available, giving you a year-at-a-glance overview to support long-term planning. You can also enable the <strong>heatmap</strong> to visualize task density across the year.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/96131496c074baf637704f375d6732bd-5.png" alt="Yearly View Heatmap" className="w-full h-auto" />
      </figure>
      <blockquote className="border-l-4 border-[#6366f1] bg-[#f8f9ff] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">How to use: Calendar → View Options → Style → Enable Heatmap</blockquote>

      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Flexible Month View</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">The Month View now supports pinch-to-zoom gestures. You can zoom in to show fewer weeks and check more tasks directly within each date.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/fd68a81cf08bfc3d981453192f52886a-6.png" alt="Flexible Month View" className="w-full h-auto" />
      </figure>
      <blockquote className="border-l-4 border-[#f59e0b] bg-[#fffbeb] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">📱 Mobile only</blockquote>

      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">New Modern Style</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">A new Modern calendar style is now available, offering a cleaner and more streamlined look with improved readability.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/0fb4ab43897aaeca1d780fa6a57b1a2b-7.png" alt="Modern Style" className="w-full h-auto" />
      </figure>
      <blockquote className="border-l-4 border-[#6366f1] bg-[#f8f9ff] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">How to use: Calendar → View Options → Style → Modern</blockquote>

      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Desktop Interface Improvements</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">A new <strong>Card Style</strong> layout is now available on desktop. The card-based interface makes information structure clearer and browsing more intuitive.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/347d77763cc988f52d62de5edbc5e393-8.png" alt="Desktop Card Style" className="w-full h-auto" />
      </figure>
      <blockquote className="border-l-4 border-[#6366f1] bg-[#f8f9ff] pl-4 py-3 my-6 text-[14px] text-[#4a4a4a] rounded-r-lg">How to use: Settings → Appearance → Theme → Interface Style → Card</blockquote>

      <h2 id="interface-refresh" className="text-[24px] font-semibold leading-[1.3] mt-14 mb-4 text-[#1a1a1a]">Interface Refresh 🆕 Now More Translucent (Oct 30)</h2>
      
      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Adapted for iOS 26 Liquid Glass</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">TickTick now supports the Liquid Glass design on iOS 26, bringing a more translucent, natural, and visually upgraded interface.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/f2ec03590c6cd14380bc83ffc8e5b60e-9.jpeg" alt="Liquid Glass" className="w-full h-auto" />
      </figure>

      <h3 className="text-[18px] font-semibold leading-[1.4] mt-10 mb-3 text-[#1a1a1a]">Optimized Constant Reminder</h3>
      <p className="text-[16px] leading-[1.7] text-[#4a4a4a] mb-4">On iOS 26, the upgraded Constant Reminder works like a system alarm, ringing on time even in Focus, Do Not Disturb, or Sleep mode—so important tasks are never missed.</p>
      <figure className="my-8 rounded-xl overflow-hidden border border-[#e8e8e8] shadow-sm">
        <img src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/88825747-66d9-4678-8ecf-ff1c386d2c8e-help-ticktick-com/assets/images/e1432d74e103193c9494309c4bdd9905-10.jpeg" alt="Constant Reminder" className="w-full h-auto" />
      </figure>
    </article>
  );
};

const FeedbackNav = ({ currentPage, onPageChange }) => {
  const navData = {
    "beginners-guide": { prev: null, next: { label: "FAQ", page: "faq", emoji: "🔍" } },
    "faq": { prev: { label: "Beginner's Guide", page: "beginners-guide", emoji: "🏅" }, next: { label: "Design Principles", page: "design-principles", emoji: "💎" } },
    "design-principles": { prev: { label: "FAQ", page: "faq", emoji: "🔍" }, next: { label: "What's New", page: "whats-new", emoji: "🚀" } },
    "whats-new": { prev: { label: "Design Principles", page: "design-principles", emoji: "💎" }, next: null },
  };
  const data = navData[currentPage];

  return (
    <div className="mt-20 pt-10 border-t border-[#e8e8e8]">
      <div className="flex flex-col items-center gap-4 mb-12">
        <span className="text-[16px] font-medium text-[#1a1a1a]">Did the content help you?</span>
        <div className="flex gap-4">
          <button className="w-14 h-14 rounded-full border-2 border-[#e8e8e8] flex items-center justify-center hover:bg-[#f0fdf4] hover:border-[#22c55e] transition-all text-2xl">😊</button>
          <button className="w-14 h-14 rounded-full border-2 border-[#e8e8e8] flex items-center justify-center hover:bg-[#fef2f2] hover:border-[#ef4444] transition-all text-2xl">🙁</button>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {data.prev ? (
          <button onClick={() => onPageChange(data.prev.page)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#6366f1] hover:bg-[#f5f5ff] transition-colors font-medium"><ChevronLeft size={18} /> {data.prev.emoji} {data.prev.label}</button>
        ) : <div />}
        {data.next ? (
          <button onClick={() => onPageChange(data.next.page)} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#6366f1] hover:bg-[#f5f5ff] transition-colors font-medium">{data.next.emoji} {data.next.label} <ChevronRight size={18} /></button>
        ) : <div />}
      </div>
    </div>
  );
};

export default function HelpCenter() {
  const [currentPage, setCurrentPage] = useState("faq");

  const renderPage = () => {
    switch (currentPage) {
      case "beginners-guide": return <BeginnersGuidePage />;
      case "design-principles": return <DesignPrinciplesPage />;
      case "whats-new": return <WhatsNewPage />;
      case "faq": default: return <FAQPage />;
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="flex-1 md:ml-[280px] overflow-y-auto">
        <div className="max-w-[800px] mx-auto px-6 py-12 md:px-10">
          {renderPage()}
          <FeedbackNav currentPage={currentPage} onPageChange={setCurrentPage} />
        </div>
      </main>
    </div>
  );
}
