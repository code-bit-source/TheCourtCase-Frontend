import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const AboutUs = () => {
  return (
    <div className="bg-white font-sans text-[#1f2329] antialiased">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-20 pb-0 md:pt-[100px]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
            <div className="w-full md:w-1/2 z-10">
              <h1 className="text-[40px] md:text-[48px] font-bold leading-[1.1] mb-8 tracking-tight">
                We do<br />
                what we love,<br />
                for the better
              </h1>
              <p className="text-[16px] md:text-[18px] leading-[1.6] text-[#1f2329] max-w-[440px]">
                We lucubrate in the realm of time,<br /> 
                empowering everyone the ability <br /> 
                and peacefulness to stay organized, stay creative.
              </p>
            </div>
            
            <div className="w-full md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[580px] h-[300px] md:h-[450px]">
                <img
                  src="https://d107mjio2rjf74.cloudfront.net/sites/res/aboutUsNew/header.png"
                  alt="TickTick Team Illustration"
                  className="w-full h-full object-contain object-right"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section - One Team, One Goal */}
      <section className="bg-[#f9f9f9] pt-[60px] pb-[40px]">
        <div className="container mx-auto max-w-[1100px] px-6">
          <div className="max-w-[1100px]">
            <h2 className="text-[32px] md:text-[40px] font-bold leading-[1.3] mb-8">
              One Team, One Goal
            </h2>
            
            <div className="space-y-6 text-[16px] leading-[1.6]">
              <p>
                We are a diversified team mainly based in the United States. Some code, some write; some are time masters, some are fighting with procrastination. What brings us together is the deep belief in the art of time management; the passion to build a simple, but not simpler product; and the goal to help everyone boost productivity and enjoy life.
              </p>
              
              <p>
                In as early as 2010, the founding team began the endeavor with an Android app called GTasks, which syncs with Google Tasks. At that time, the app was listed as "one of the best todo list apps" at Google Play Store. In 2013, we officially launched TickTick. This new app derives from GTasks, but has a lot more functionalities and can sync across multiple platforms.
              </p>
              
              <p>
                The team has been dedicating in the realm of time for a decade with great love. We value our users' experience, and continuously develop innovative features to make the app ever more stable and smooth. TickTick is one of the very first to-do list apps to creatively integrate features such as Calendar, Pomodoro Timer, Habit, into one functional app. Users are at our heart, and the inexhaustible source of power to make TickTick grow.
              </p>
            </div>

            {/* World Map Dot-Matrix Graphic */}
            <div className="mt-12 mb-16 flex justify-center">
              <img
                src="https://d107mjio2rjf74.cloudfront.net/sites/res/aboutUsNew/intro.png"
                alt="World Map Graphic"
                className="w-full max-w-[1000px] h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto max-w-[1100px] px-6 text-left">
          <p className="text-[16px] leading-[1.6]">
            To learn more about the team, or have any questions, you're more than welcome to contact us at{' '}
            <a 
              href="mailto:support@ticktick.com" 
              className="text-[#617fdf] transition-colors hover:underline"
            >
              support@ticktick.com
            </a>.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;