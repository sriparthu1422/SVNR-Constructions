import React from 'react';

const SocialBar = () => {
    const socialLinks = [
        {
            name: 'WhatsApp',
            href: 'https://wa.me/919876543210', // Replace with actual number
            bgColor: 'bg-[#25D366]',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.99 2C6.47 2 2 6.48 2 12C2 13.88 2.52 15.65 3.42 17.15L2 22L7.02 20.66C8.5 21.5 10.2 22 11.99 22C17.51 22 22 17.52 22 12C22 6.48 17.51 2 11.99 2ZM17.14 16.03C16.92 16.64 15.82 17.1 15.22 17.18C14.77 17.24 14.1 17.34 11.51 16.27C8.17 14.89 6.03 11.49 5.88 11.29C5.73 11.08 4.64 9.61 4.64 8.08C4.64 6.55 5.43 5.8 5.73 5.49C5.97 5.24 6.36 5.12 6.74 5.12C6.86 5.12 6.96 5.13 7.05 5.13C7.38 5.15 7.54 5.17 7.76 5.7C8.03 6.36 8.68 7.96 8.76 8.13C8.84 8.3 8.97 8.52 8.86 8.74C8.75 8.95 8.68 9.07 8.51 9.27C8.35 9.46 8.16 9.68 8.02 9.81C7.86 9.96 7.69 10.12 7.88 10.45C8.06 10.77 8.67 11.78 9.58 12.58C10.75 13.61 11.71 13.94 12.06 14.09C12.39 14.23 12.78 14.2 13.01 13.95C13.3 13.63 13.68 13.02 14.05 12.44C14.32 12.02 14.65 11.97 15.06 12.11C15.48 12.26 17.69 13.35 18.12 13.56C18.55 13.78 18.84 13.89 18.95 14.07C19.06 14.26 19.06 15.17 17.14 16.03Z" />
                </svg>
            )
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/svnrconstructions', // Replace with actual link
            bgColor: 'bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
            )
        },
        {
            name: 'Facebook',
            href: 'https://facebook.com/svnrconstructions', // Replace with actual link
            bgColor: 'bg-[#1877F2]',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            name: 'X (Twitter)',
            href: 'https://twitter.com/svnrconstructions', // Replace with actual link
            bgColor: 'bg-black border border-gray-800',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            )
        }
    ];

    return (
        <div className="fixed sm:left-0 sm:top-1/2 sm:-translate-y-1/2 bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 z-50 flex sm:flex-col flex-row gap-2 p-2">
            {socialLinks.map((link) => (
                <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
            group flex items-center w-10 sm:w-12 hover:w-10 sm:hover:w-40 h-10 sm:h-12 rounded-full 
            transition-all duration-300 ease-in-out overflow-hidden shadow-lg
            ${link.bgColor} text-white
          `}
                    aria-label={link.name}
                >
                    {/* Icon Container (always visible) */}
                    <div className="w-10 sm:w-12 h-10 sm:h-12 flex-shrink-0 flex items-center justify-center">
                        {React.cloneElement(link.icon, { width: 20, height: 20 })}
                    </div>

                    {/* Text Container (revealed on hover ONLY on larger screens to avoid weird mobile expansion) */}
                    <span className="opacity-0 group-hover:opacity-100 whitespace-nowrap font-medium text-sm transition-opacity duration-300 ml-1 hidden sm:block">
                        {link.name}
                    </span>
                </a>
            ))}
        </div>
    );
};

export default SocialBar;
