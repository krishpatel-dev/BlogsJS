import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing MongoDB Connection...');
console.log('Connection String:', process.env.MONGODB_URI);
console.log('');

const testConnection = async () => {
    try {
        console.log('⏳ Attempting to connect...');

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000 // 5 second timeout
        });

        console.log('✅ MongoDB Connected Successfully!');
        console.log('📊 Database Name:', mongoose.connection.db.databaseName);
        console.log('🌐 Host:', mongoose.connection.host);
        console.log('🔌 Port:', mongoose.connection.port);

        // List all databases
        const admin = mongoose.connection.db.admin();
        const { databases } = await admin.listDatabases();

        console.log('\n📚 Available Databases:');
        databases.forEach(db => {
            console.log(`  - ${db.name} (${(db.sizeOnDisk / 1024 / 1024).toFixed(2)} MB)`);
        });

        await mongoose.connection.close();
        console.log('\n✅ Connection closed successfully');
        process.exit(0);

    } catch (error) {
        console.error('\n❌ Connection Failed!');
        console.error('Error:', error.message);
        console.error('\n🔧 Troubleshooting Tips:');
        console.error('1. Make sure MongoDB service is running');
        console.error('2. Close MongoDB Compass if it\'s open');
        console.error('3. Check if another app is using port 27017');
        console.error('4. Try restarting MongoDB service');
        process.exit(1);
    }
};

testConnection();
