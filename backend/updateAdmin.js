import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';

dotenv.config();

const updateAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    const newEmail = 'svnr@constructions.com';
    const newPassword = 'svnrConstruction@1234';

    // Find the existing admin or create a new one
    let admin = await Admin.findOne();

    if (admin) {
      admin.email = newEmail;
      admin.password = newPassword;
      admin.username = 'admin'; // Keeping username as admin
      await admin.save();
      console.log('✅ Admin credentials updated successfully!');
    } else {
      admin = new Admin({
        username: 'admin',
        email: newEmail,
        password: newPassword
      });
      await admin.save();
      console.log('✅ New Admin created successfully!');
    }

    console.log(`New Email: ${newEmail}`);
    console.log(`New Password: ${newPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin:', error.message);
    process.exit(1);
  }
};

updateAdmin();
