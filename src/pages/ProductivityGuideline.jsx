import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const articles = [
  {
    id: '1',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-ticktick-com/assets/images/a317d2fe112fdb80c0b569a949c0d032-1.png',
    title: 'Pomodoro Made Smarter with TickTick | How I Organize Tasks & Stay Productive｜User Story',
    intro: "Why I Switched from a Simple Timer to a Smarter Productivity App When I first started looking for a good task manager, I wasn't expecting much — just something reliable with recurring tasks and maybe a Pomodoro timer. TickTick's free plan immediately stood out.",
    link: '/resources/article/7384480099346677760/pomodoro-timer-task-manager'
  },
  {
    id: '2',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-ticktick-com/assets/images/3a0f1486ba7a21b683cad3b42aaf378e-2.png',
    title: 'ADHD Daily Routine Guide: Time Management Strategies That Actually Work',
    intro: "Time can be slippery when you have ADHD. You might lose track of it, underestimate how long tasks will take, or get stuck in \"task paralysis.\" That's not because you're lazy or disorganized — your brain just processes time and attention differently.",
    link: '/resources/article/adhd-daily-routine-guide'
  },
  {
    id: '3',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-ticktick-com/assets/images/7fb79f5920867f7a460e0a45766782fc-3.png',
    title: "How I Use TickTick's Calendar to Stay Organized",
    intro: "Why a Calendar Changed Everything Not long ago, my days felt like constant chaos. I'd remember that something happened—but not exactly when. It felt like I was moving through time with no markers—just a blur of days I couldn't make sense of.",
    link: '/resources/article/calendar-organization-guide'
  },
  {
    id: '4',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-ticktick-com/assets/images/3fb545dc88833912205bd6c65a179f13-4.png',
    title: 'Mastering Your To-Do List: The Ultimate Guide to Boosting Productivity',
    intro: "In today's fast-moving world, we are constantly juggling work projects, household responsibilities, and personal growth goals. The list of tasks seems never-ending. With overwhelming tasks and information, we need a simple yet effective way.",
    link: '/resources/article/mastering-todo-list'
  },
  {
    id: '5',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-ticktick-com/assets/images/e3dc94c54e30b2a2b3e6b233a53fb774-5.png',
    title: '12 Time Management Tips You Need to Master in 2025',
    intro: "From optimizing your daily routine to achieving long-term goals, we've gathered 12 time management strategies for 2025 that will help you take control of your schedule. Discover how each method can enhance your productivity.",
    link: '/resources/article/12-time-management-tips-2025'
  },
  {
    id: '6',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/23c7b630-3381-4e6f-bed7-79b9849a4c8f-ticktick-com/assets/images/7200c74724886e0c283ac40f0e2d350e-6.png',
    title: 'Deep Work Explained: How to Stay Focused in a Distracted World',
    intro: 'In the age of information overload, our attention is constantly being fragmented by countless trivial matters and distractions. Emails, social media, instant messaging—these seemingly important activities are quietly eroding our productivity.',
    link: '/resources/article/deep-work-explained'
  }
];

const HeroSection = () => {
  return (
    <section className="relative pt-[100px] pb-[60px] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div 
          className="absolute top-[-15%] left-[-10%] w-[60%] h-[70%] bg-[#E6F0FF] rounded-full opacity-70 blur-[100px]"
          style={{ zIndex: -1 }}
        />
        <div 
          className="absolute top-[-10%] right-[-10%] w-[50%] h-[60%] bg-[#F3E8FF] rounded-full opacity-60 blur-[100px]"
          style={{ zIndex: -1 }}
        />
      </div>

      <div className="max-w-[1140px] mx-auto px-6 relative z-10 text-center">
        <div className="mb-4">
          <h1 className="text-[48px] font-bold leading-[1.2] tracking-[-0.02em] text-[#000000]">
            Productivity Hub
          </h1>
        </div>

        <div className="max-w-[640px] mx-auto">
          <p className="text-[18px] leading-[1.5] font-normal text-[#555555]">
            Discover practical strategies to manage your time and organize your life more effectively.
          </p>
        </div>
      </div>
    </section>
  );
};

const ArticleGrid = () => {
  return (
    <section className="bg-white py-[60px]">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {articles.map((article) => (
            <article 
              key={article.id} 
              className="flex flex-col group h-full"
            >
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-[12px] mb-6">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <a 
                  href={article.link}
                  className="inline-block"
                >
                  <h3 className="text-[18px] font-bold leading-[1.4] text-black mb-3 line-clamp-2 hover:text-[#5297ff] transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                </a>
                <p className="text-[14px] leading-[1.6] text-[#5C5C5C] mb-4 line-clamp-3">
                  {article.intro}
                </p>
              </div>
            </article>
          ))}
        </div>
        
        <div className="mt-16 flex justify-center">
          <a 
            href="#" 
            className="text-[14px] font-medium text-[#5C5C5C] hover:text-[#5297ff] flex items-center gap-1 transition-colors"
          >
            More
            <svg 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default function ProductivityGuideline() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <ArticleGrid />
      </div>
      <Footer />
    </main>
  );
}
