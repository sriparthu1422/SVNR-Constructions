import React from 'react';

const ProjectSkeleton = () => {
    return (
        <div className='bg-stone-900 border border-white/10 rounded-lg overflow-hidden animate-pulse h-full flex flex-col'>
            <div className='relative h-72 bg-stone-800 shrink-0'></div>
            <div className='p-6 space-y-4 flex flex-col flex-grow'>
                <div className='h-8 bg-stone-800 rounded w-3/4'></div>
                <div className='h-4 bg-stone-800 rounded w-1/2'></div>
                <div className='grid grid-cols-2 gap-4 pt-4 border-t border-white/10 mt-auto'>
                    <div className='space-y-2'>
                        <div className='h-3 bg-stone-800 rounded w-full'></div>
                        <div className='h-6 bg-stone-800 rounded w-1/2'></div>
                    </div>
                    <div className='space-y-2'>
                        <div className='h-3 bg-stone-800 rounded w-full'></div>
                        <div className='h-6 bg-stone-800 rounded w-1/2'></div>
                    </div>
                </div>
                <div className='h-12 bg-stone-800 rounded w-full mt-4'></div>
            </div>
        </div>
    );
};

export default ProjectSkeleton;
