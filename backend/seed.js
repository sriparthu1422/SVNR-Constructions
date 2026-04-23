import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import Project from './models/Project.js';
import Testimonial from './models/Testimonial.js';
import Founder from './models/Founder.js';
import Stat from './models/Stat.js';
import Admin from './models/Admin.js';

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Founder.deleteMany({});
    await Stat.deleteMany({});

    console.log('🗑️  Cleared existing data.');

    // ── LIVE PROJECTS ─────────────────────────────────────
    const liveProjects = [
      {
        name: 'Ankura Farms',
        location: 'Thimajipet, Jadcherla',
        projectType: 'live',
        stage: 'Finishing',
        progress: 90,
        completion: 'Dec 2024',
        image: '',
        milestones: [
          { title: 'Foundation', date: 'Jan 2023', status: 'completed' },
          { title: 'Structure Completed', date: 'Aug 2023', status: 'completed' },
          { title: 'Brick Work', date: 'Dec 2023', status: 'completed' },
          { title: 'Finishing Works', date: 'In Progress', status: 'current' },
          { title: 'Handover', date: 'Dec 2024', status: 'upcoming' },
        ],
        approvals: ['RERA Approved', 'GHMC Sanctioned', 'Environmental Clearance', 'Fire NOC', 'Pollution Control Board'],
        units: [
          { type: '3 BHK East', size: '2400', facing: 'East', status: 'Available' },
          { type: '3 BHK West', size: '2200', facing: 'West', status: 'Sold Out' },
          { type: '4 BHK Sky Villa', size: '4500', facing: 'East', status: 'Few Left' },
        ],
        sortOrder: 1,
      },
      {
        name: 'The Ayati',
        location: 'Jubilee Hills, Hyderabad',
        projectType: 'live',
        stage: 'Structure',
        progress: 60,
        completion: 'June 2025',
        image: 'https://images.unsplash.com/photo-1590247813693-5541d1c609fd?q=80&w=2009&auto=format&fit=crop',
        milestones: [
          { title: 'Foundation', date: 'Mar 2023', status: 'completed' },
          { title: 'Structure', date: 'In Progress', status: 'current' },
          { title: 'Finishing Works', date: 'Dec 2024', status: 'upcoming' },
          { title: 'Handover', date: 'June 2025', status: 'upcoming' },
        ],
        sortOrder: 2,
      },
    ];

    // ── DELIVERED PROJECTS ─────────────────────────────────
    const deliveredProjects = [
      {
        name: 'Vinayak Homes',
        location: 'Miryalaguda, Telangana',
        projectType: 'delivered',
        completionYear: '2020',
        totalUnits: 15,
        area: '732 SQ.Yards',
        image: '',
        testimonial: 'Truly premium living experience.',
        sortOrder: 1,
      },
      {
        name: 'Manasa Sarovar',
        location: 'Miryalaguda, Telangana',
        projectType: 'delivered',
        completionYear: '2021',
        totalUnits: 40,
        area: '1850 Sq.Yards',
        image: '',
        testimonial: 'Exceeded all expectations in quality and timeline.',
        sortOrder: 2,
      },
      {
        name: 'Sai Datta Residency',
        location: 'Miryalaguda, Telangana',
        projectType: 'delivered',
        completionYear: '2021',
        totalUnits: 25,
        area: '1212 SQ.Yards',
        image: '',
        testimonial: 'Truly premium living experience.',
        sortOrder: 3,
      },
      {
        name: 'Greenspace',
        location: 'Miryalaguda, Telangana',
        projectType: 'delivered',
        completionYear: '2023',
        totalUnits: 25,
        area: '1200 SQ.Yards',
        image: '',
        testimonial: 'Truly premium living experience.',
        sortOrder: 4,
      },
      {
        name: 'The Lotus Residency',
        location: 'Miryalaguda, Telangana',
        projectType: 'delivered',
        completionYear: '2023',
        totalUnits: 10,
        area: '678 SQ.Yards',
        image: '',
        testimonial: 'Truly premium living experience.',
        sortOrder: 5,
      },
      {
        name: 'The Breeze',
        location: 'Narsingi (Manchirevula)',
        projectType: 'delivered',
        completionYear: '2025',
        totalUnits: 70,
        area: '3756 SQ.Yards',
        image: '',
        testimonial: 'Truly premium living experience.',
        sortOrder: 6,
      },
    ];

    // ── UPCOMING PROJECTS ────────────────────────────────
    const upcomingProjects = [
      {
        name: 'SVNR Builders',
        location: 'Hyderabad',
        projectType: 'upcoming',
        size: 'Plot Sizes: Coming soon',
        launch: 'Coming soon',
        concept: 'Coming soon',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
        sortOrder: 1,
      },
      {
        name: 'SVNR Builders',
        location: 'Coming soon',
        projectType: 'upcoming',
        size: 'Plot Sizes: Coming soon',
        launch: 'Coming soon',
        concept: 'Coming soon',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop',
        sortOrder: 2,
      },
    ];

    await Project.insertMany([...liveProjects, ...deliveredProjects, ...upcomingProjects]);
    console.log('✅ Projects seeded.');

    // ── TESTIMONIALS ──────────────────────────────────────
    const testimonials = [
      { name: 'Rajesh Kumar', text: 'Buying a home with SVNR was the best decision we made. The quality of construction and attention to detail is unmatched in Hyderabad.', location: 'Software Engineer', sortOrder: 1 },
      { name: 'Priya Reddy', text: 'From the initial booking to the final handover, the process was seamless. Their transparency and timely delivery focused approach is commendable.', location: 'Doctor', sortOrder: 2 },
      { name: 'Mohan Rao', text: "I was impressed by the sustainable practices they follow. Living in an eco-friendly home that doesn't compromise on luxury is a dream come true.", location: 'Business Owner', sortOrder: 3 },
      { name: 'Anita Desai', text: 'The amenities provided at SVNR Heights are world-class. It truly feels like a community designed for modern families.', location: 'Architect', sortOrder: 4 },
      { name: 'Vikram Singh', text: 'Professionalism at its peak. The team was always available to answer our queries and kept us updated throughout the construction phase.', location: 'Investment Banker', sortOrder: 5 },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('✅ Testimonials seeded.');

    // ── FOUNDERS ──────────────────────────────────────────
    const founders = [
      {
        name: 'Sri. V. Narayana Reddy',
        role: 'Founder & Chairman',
        image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=2070&auto=format&fit=crop',
        description: "With over 25 years of experience in the construction industry, Mr. Narayana Reddy has been the driving force behind SVNR's legacy of trust. His vision for sustainable urban living has transformed the city's skyline, ensuring that every project reflects quality, integrity, and long-term value for homeowners.",
        sortOrder: 1,
      },
      {
        name: 'Smt. K. Lakshmi',
        role: 'Managing Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2776&auto=format&fit=crop',
        description: 'A stalwart in operational excellence, Mrs. Lakshmi brings a detailed-oriented approach to execution. Her focus on customer satisfaction and timely delivery has helped the company build a loyal clientele. She believes that a home is built with hands, but a household is built with hearts.',
        sortOrder: 2,
      },
      {
        name: 'Mr. Arjun Reddy',
        role: 'Director of Innovation',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2144&auto=format&fit=crop',
        description: 'Leading the technological integration at SVNR, Arjun ensures that all projects meet modern standards of smart living. From eco-friendly materials to automation-ready infrastructure, his forward-thinking strategies prepare our homes for the future generations.',
        sortOrder: 3,
      },
      {
        name: 'Ram Krishna',
        role: 'Founder',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop',
        description: 'A visionary leader and instrumental force behind SVNR, Ram Krishna brings strategic direction and profound expertise to the organization, shaping our long-term goals and commitment to excellence.',
        sortOrder: 4,
      },
    ];

    await Founder.insertMany(founders);
    console.log('✅ Founders seeded.');

    // ── STATS ─────────────────────────────────────────────
    const stats = [
      { label: 'Happy Families', value: '1500+', sortOrder: 1 },
      { label: 'Units Delivered', value: '276', sortOrder: 2 },
      { label: 'Years of Excellence', value: '10+', sortOrder: 3 },
      { label: 'Sq. Ft. Delivered', value: '2M+', sortOrder: 4 },
      { label: 'Ongoing Projects', value: '5', sortOrder: 5 },
    ];

    await Stat.insertMany(stats);
    console.log('✅ Stats seeded.');

    // ── DEFAULT ADMIN ────────────────────────────────────
    const existingAdmin = await Admin.findOne({
      $or: [{ email: 'admin@svnr.com' }, { username: 'admin' }]
    });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'admin',
        email: 'admin@svnr.com',
        password: 'admin123',
      });
      await admin.save();
      console.log('✅ Default admin created (email: admin@svnr.com, password: admin123)');
    } else {
      console.log('ℹ️  Admin already exists, skipping.');
    }

    console.log('\n🎉 All seed data inserted successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error.message);
    process.exit(1);
  }
};

seedData();
