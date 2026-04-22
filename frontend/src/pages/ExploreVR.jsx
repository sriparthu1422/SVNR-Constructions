import React from 'react';
import { Home, Layers, Sun, Maximize } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ExploreVR = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Home className="w-5 h-5 text-yellow-500" />,
      text: "Walk through every room"
    },
    {
      icon: <Layers className="w-5 h-5 text-yellow-500" />,
      text: "Switch floors instantly"
    },
    {
      icon: <Sun className="w-5 h-5 text-yellow-500" />,
      text: "View sunrise & sunset directions"
    },
    {
      icon: <Maximize className="w-5 h-5 text-yellow-500" />,
      text: "Experience realistic interior scale"
    }
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center font-sans tracking-wide'>
      {/* Blurred Luxury Background / Overlay */}
      <div className='absolute inset-0 bg-black/80 backdrop-blur-md z-0 pointer-events-none'>
        <img
          src='https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop'
          alt='Luxury Apartment Blurred'
          className='w-full h-full object-cover opacity-20 blur-lg scale-110'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent'></div>
      </div>

      {/* Popup Card Container */}
      <div
        className='relative z-10 w-[94%] max-w-4xl bg-[#121316] border border-white/10 shadow-2xl rounded-2xl p-6 md:p-10 pb-24 md:pb-10 text-center flex flex-col items-center overflow-y-auto max-h-[96vh] text-white'
        style={{ animation: 'zoomIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >

        {/* Close Button linking back / closing popup (simulated) */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {/* Top Launching Badge */}
        <div className='bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-bold uppercase tracking-widest py-1.5 px-5 rounded-full mb-6 backdrop-blur-sm'>
          VR Flat Tours Launching Soon
        </div>

        {/* Main Heading */}
        <h1 className='text-3xl md:text-5xl font-bold mb-4 leading-tight tracking-tight text-white drop-shadow-xl'>
          Experience Your Future Home in <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-500/80">Virtual Reality</span>
        </h1>

        {/* Description Text */}
        <p className='text-gray-300 text-sm md:text-base leading-relaxed max-w-[650px] mb-8'>
          We are preparing immersive VR flat tours that allow you to explore 2BHK & 3BHK layouts, understand floor positioning, check balcony views, and experience real space — before possession.
        </p>

        {/* Feature Highlights Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-left mb-6 w-full max-w-2xl'>
          {features.map((feature, idx) => (
            <div key={idx} className='flex items-center gap-4 bg-white/5 border border-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors duration-300 group'>
              <div className='flex-shrink-0 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center border border-white/5 group-hover:border-yellow-500/30 transition-colors'>
                {feature.icon}
              </div>
              <span className='text-gray-200 font-medium text-sm'>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Bottom Supporting Text */}
        <div className='text-gray-500 text-[10px] sm:text-xs uppercase tracking-widest font-bold'>
          Launching soon for our premium projects.
        </div>
      </div>

      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default ExploreVR;