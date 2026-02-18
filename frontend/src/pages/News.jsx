/** @format */

import React from 'react';
import { Calendar, Award, Newspaper, ArrowRight, ExternalLink } from 'lucide-react';

const newsUpdates = [
  {
    id: 1,
    type: 'Project Update',
    date: 'Feb 15, 2024',
    title: 'The Ayati Reaches Final Finishing Stage',
    excerpt: 'We are pleased to announce that structural work is 100% complete and interiors are underway.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    type: 'Award',
    date: 'Jan 20, 2024',
    title: 'Best Luxury Developer 2023',
    excerpt: 'SVNR Constructions was honored with the "Excellence in Luxury Living" award at the Hyderabad Real Estate Summit.',
    image: 'https://images.unsplash.com/photo-1531973576160-7125cdcd63e7?q=80&w=2074&auto=format&fit=crop',
  },
  {
    id: 3,
    type: 'Launch',
    date: 'Dec 05, 2023',
    title: 'Unveiling "The Lakefront" - Premium Villa Plots',
    excerpt: 'Our newest venture near Osman Sagar offers exclusive villa plots for those seeking serenity.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
  },
];

const pressReleases = [
  {
    source: 'The Economic Times',
    title: 'Hyderabad Real Estate Market Sees 15% Growth',
    link: '#'
  },
  {
    source: 'Construction Week',
    title: 'Sustainable Building Practices on the Rise',
    link: '#'
  },
  {
    source: 'Telangana Today',
    title: 'SVNR Announces New Project in Financial District',
    link: '#'
  }
]

const News = () => {
  return (
    <div className='min-h-screen bg-black text-white pt-24 px-4 md:px-8 pb-12'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='mb-16 border-l-4 border-yellow-500 pl-6'>
          <h1 className='text-4xl md:text-5xl font-bold mb-2'>
            News & Media
          </h1>
          <p className='text-gray-400 max-w-2xl'>
            Stay updated with the latest developments, achievements, and insights from SVNR Constructions.
          </p>
        </div>

        {/* Featured News Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20'>
          {newsUpdates.map((item) => (
            <div
              key={item.id}
              className='bg-stone-900 border border-white/10 rounded-lg overflow-hidden group hover:border-yellow-500/50 transition-all duration-300 flex flex-col'>
              <div className='h-48 overflow-hidden relative'>
                <img
                  src={item.image}
                  alt={item.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                />
                <div className='absolute top-4 left-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold text-yellow-500 uppercase tracking-wider'>
                  {item.type}
                </div>
              </div>
              <div className='p-6 flex flex-col flex-grow'>
                <div className='flex items-center gap-2 text-gray-400 text-sm mb-3'>
                  <Calendar size={14} className="text-yellow-500" />
                  {item.date}
                </div>
                <h3 className='text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors'>
                  {item.title}
                </h3>
                <p className='text-gray-400 text-sm leading-relaxed mb-6 flex-grow'>
                  {item.excerpt}
                </p>
                <button className='flex items-center gap-2 text-white font-medium hover:text-yellow-500 transition-colors text-sm uppercase tracking-wide'>
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Press & Awards Section */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
          {/* Press Releases */}
          <div className='md:col-span-2'>
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-3'>
              <Newspaper className="text-yellow-500" />
              In The Press
            </h2>
            <div className='space-y-4'>
              {pressReleases.map((press, idx) => (
                <a key={idx} href={press.link} className='block bg-stone-900 border border-white/10 p-6 rounded-lg hover:bg-stone-800 transition-colors group'>
                  <div className='flex justify-between items-center'>
                    <div>
                      <span className='text-xs text-yellow-500 font-bold uppercase tracking-wider mb-1 block'>{press.source}</span>
                      <h3 className='text-lg font-bold text-white group-hover:underline'>{press.title}</h3>
                    </div>
                    <ExternalLink size={20} className='text-gray-500 group-hover:text-white transition-colors' />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div className='md:col-span-1 border border-yellow-500/20 bg-yellow-500/5 p-8 rounded-xl'>
            <h2 className='text-2xl font-bold mb-6 flex items-center gap-3'>
              <Award className="text-yellow-500" />
              Recognition
            </h2>
            <ul className='space-y-6'>
              <li className='border-l-2 border-yellow-500 pl-4'>
                <h4 className='font-bold text-white'>Best Residential Project 2023</h4>
                <p className='text-sm text-gray-400 mt-1'>Times Business Awards</p>
              </li>
              <li className='border-l-2 border-yellow-500 pl-4'>
                <h4 className='font-bold text-white'>Safety Excellence Award</h4>
                <p className='text-sm text-gray-400 mt-1'>National Safety Council</p>
              </li>
              <li className='border-l-2 border-gray-600 pl-4 opacity-70'>
                <h4 className='font-bold text-white'>Green Building Certification</h4>
                <p className='text-sm text-gray-400 mt-1'>IGBC Gold Rating (Ayati)</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;