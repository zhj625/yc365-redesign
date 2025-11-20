import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight, Gift, Zap, Globe2, BrainCircuit } from 'lucide-react';

const SLIDES = [
  {
    id: 1,
    // Abstract 3D Shapes / Blockchain Nodes
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=2000&q=80",
    title: (
      <>
        Predict. Create. <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Earn.</span>
      </>
    ),
    subtitle: "The decentralized prediction market. Build your own outcome tokens today.",
    cta: "Create Market",
    bgGradient: "from-[#020617]/95 via-[#1e1b4b]/90 to-transparent", // Deep Slate to Indigo
    badge: { icon: <Zap className="w-3 h-3 text-cyan-300" />, text: "Web3 Powered" }
  },
  {
    id: 4, // Referral Slide
    // Abstract 3D Fluid / Purple Pink
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=2000&q=80", 
    title: (
      <>
        Invite Friends. <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Get Yield.</span>
      </>
    ),
    subtitle: "Earn 5% lifetime commissions on every trade your referrals make. Smart contracts enabled.",
    cta: "Get Referral Link",
    bgGradient: "from-[#2e1065]/95 via-[#4c1d95]/80 to-transparent", // Deep Violet
    badge: { icon: <Gift className="w-3 h-3 text-pink-300" />, text: "Partner Program" }
  },
  {
    id: 2,
    // Digital Earth / Network
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80",
    title: (
      <>
        Global Events. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">On Chain.</span>
      </>
    ),
    subtitle: "Trade on breaking news, sports, and crypto prices with instant settlement.",
    cta: "Explore Markets",
    bgGradient: "from-[#022c22]/95 via-[#0f766e]/80 to-transparent", // Deep Emerald/Teal
    badge: { icon: <Globe2 className="w-3 h-3 text-emerald-300" />, text: "Live Oracle Feed" }
  },
  {
    id: 3,
    // AI / Neural Network
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=2000&q=80",
    title: (
      <>
        AI Analysis. <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">DeFi Data.</span>
      </>
    ),
    subtitle: "Leverage Gemini AI to analyze market sentiment and volume trends.",
    cta: "View Analytics",
    bgGradient: "from-[#172554]/95 via-[#1e3a8a]/80 to-transparent", // Deep Blue
    badge: { icon: <BrainCircuit className="w-3 h-3 text-violet-300" />, text: "Gemini Integrated" }
  }
];

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/20 my-6 group h-[200px] md:h-[260px] ring-1 ring-black/5">
      
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div 
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image with slight scale effect */}
          <div className={`absolute inset-0 w-full h-full transition-transform duration-[6000ms] ease-linear ${index === currentSlide ? 'scale-110' : 'scale-100'}`}>
             <img 
                src={slide.image} 
                alt="Hero Background" 
                className="w-full h-full object-cover"
              />
          </div>
          
          {/* Web3 Grid Texture Overlay */}
          <div 
            className="absolute inset-0 z-[1] opacity-20" 
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)',
              backgroundSize: '20px 20px'
            }}
          ></div>

          {/* Gradient Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} z-[2]`}></div>

          {/* Content */}
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-14 max-w-4xl">
            
            {/* Badge */}
            <div className={`flex items-center gap-2 mb-4 transition-all duration-700 delay-100 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {slide.badge ? (
                 <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5 w-fit shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                  {slide.badge.icon}
                  {slide.badge.text}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider border border-white/10 flex items-center gap-1.5 w-fit shadow-sm">
                  <Sparkles className="w-3 h-3 text-yellow-300" />
                  Web3 Prediction
                </span>
              )}
            </div>
            
            {/* Title */}
            <h1 className={`text-2xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-3 drop-shadow-2xl tracking-tight transition-all duration-700 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              {slide.title}
            </h1>
            
            {/* Subtitle */}
            <p className={`text-slate-200 text-xs md:text-base mb-6 max-w-lg font-medium leading-relaxed line-clamp-2 drop-shadow-md transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
               {slide.subtitle}
            </p>

            {/* Buttons */}
            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-400 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <button className="px-6 py-2.5 rounded-full bg-white text-slate-900 text-xs md:text-sm font-bold shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] flex items-center gap-2 group/btn">
                {slide.cta}
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-slate-900" />
              </button>
              <button className="px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md text-white text-xs md:text-sm font-semibold border border-white/10 transition-all hover:border-white/30 hover:text-white">
                Read Docs
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls - Subtle and Techy */}
      <button 
        onClick={prevSlide}
        className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white/70 hover:text-white border border-white/5 transition-all opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white/70 hover:text-white border border-white/5 transition-all opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Indicators - Sleek line style */}
      <div className="absolute bottom-4 left-6 md:left-14 z-30 flex gap-1.5">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1 rounded-full transition-all duration-500 ${
              index === currentSlide ? 'bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'bg-white/20 w-2 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;