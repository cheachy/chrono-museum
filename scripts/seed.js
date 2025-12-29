require('dotenv').config({ path: '../.env' });
const connectDB = require('../src/config/db'); 
const Era = require('../src/models/era');
const erasData = require('./erasData');

const seedData = async () => {
  try {
    await connectDB(); 

    console.log('Deleting old data...');
    await Era.deleteMany({});

    console.log('Inserting new data...');
    await Era.insertMany(erasData); 

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seedData();