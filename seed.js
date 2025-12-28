require('dotenv').config()
const mongoose = require('mongoose');

// REPLACE with your Connection String
const MONGO_URI = process.env.MONGO_URI;

const DB = [
  {
    id: "prehistory",
    env: "preset: forest; fog: 0.7; skyType: atmosphere; groundColor: #3d2c20", 
    items: [
      { name: "Stone Axe", 
        info: "The first lever machine used by early humans.", 
        model: "assets/prehistory/axe.glb", 
        scale: "0.25 0.25 0.25",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Fire Pit", 
        info: "Marks the mastery of energy control.", 
        model: "assets/prehistory/bonfire.glb", 
        scale: "1 1 1",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Cave Art", 
        info: "The birth of abstract communication.", 
        model: "assets/prehistory/cave.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Bone Needle", 
        info: "The beginning of complex textile manufacturing.", 
        model: "assets/prehistory/bone.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Woven Basket", 
        info: "Early logistics: transporting goods.", 
        model: "assets/prehistory/basket.glb", 
        scale: "0.1 0.1 0.1",
        rotation: "0 0 0", offset: "0 0 0"}
    ]
  },
  {
    id: "classical",
    env: "preset: egypt; skyType: gradient; lighting: distant; groundColor: #e6c288",
    items: [
      { name: "Amphora", 
        info: "Standardized shipping container of the ancient world.", 
        model: "assets/classical/amphora.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Legion Helmet", 
        info: "Mass-produced armor for professional armies.", 
        model: "assets/classical/helmet.glb", 
        scale: "0.01 0.01 0.01",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Papyrus", 
        info: "Portable information storage.", 
        model: "assets/classical/papyrus.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Marble Bust", 
        info: "Political propaganda through art.", 
        model: "assets/classical/bust.glb", 
        scale: "0.4 0.4 0.4",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Gold Coin", 
        info: "Standardized currency enabling global trade.",
        model: "assets/classical/coin.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"}
    ]
  },
  {
    id: "middleages",
    env: "preset: starry; fog: 0.5; groundColor: #1a1a1a; grid: none",
    items: [
      { name: "Iron Sword", 
        info: "High-carbon steel metallurgy.", 
        model: "assets/middle/sword.glb", 
        scale: "1 1 1", 
        rotation:"0 0 90", 
        offset: "0 -5 0"},
      { name: "Shield", 
        info: "Heraldry: The first visual ID systems.", 
        model: "assets/middle/shield.glb", 
        scale: "0.25 0.25 0.25",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Crown", 
        info: "Centralized authority and feudalism.", 
        model: "assets/middle/crown.glb", 
        scale: "0.25 0.25 0.25",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Cross", 
        info: "The unifying power of organized religion.", 
        model: "assets/middle/Cross.glb", 
        scale: "0.025 0.025 0.025",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Manuscript", 
        info: "Preservation of knowledge by monastic orders.", 
        model: "assets/middle/manuscript.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"}
    ]
  },
  {
    id: "earlymodern",
    env: "preset: arches; skyType: atmosphere; lighting: distant; groundColor: #8f7e6b",
    items: [
      { name: "Compass", 
        info: "Global navigation and the Age of Discovery.", 
        model: "assets/modern/compass.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Printing Press", 
        info: "Democratization of information.", 
        model: "assets/modern/printer.glb", 
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Telescope", 
        info: "Scientific observation challenging dogma.", 
        model: "assets/modern/telescope.glb", 
        scale: "0.4 0.4 0.4",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Gunpowder", 
        info: "The end of walled fortifications.", 
        model: "assets/modern/gunpowder.glb", 
        scale: "2.5 2.5 2.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Spices", 
        info: "Commodities that drove global colonization.", 
        model: "assets/modern/spices.glb", 
        scale: "1 1 1",
        rotation: "0 0 0", offset: "0 0 0"}
    ]
  },
  {
    id: "contemporary",
    env: "preset: tron; grid: 1x1; groundColor: #000; skyType: gradient",
    items: [
      { name: "Microchip", 
        info: "The brain of the Information Age.", 
        model: "assets/contemporary/microchip.glb", 
        scale: "0.2 0.2 0.2",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Rocket", 
        info: "Expanding humanity beyond Earth.", 
        model: "assets/contemporary/rocket.glb", 
        scale: "1.5 1.5 1.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Smartphone", 
        info: "Sum of all human knowledge in your pocket.", 
        model: "assets/contemporary/phone.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Plastic", 
        info: "Synthetic materials: Blessing and curse.", 
        model: "assets/contemporary/plastic.glb", 
        scale: "0.1 0.1 0.1",
        rotation: "0 0 0", offset: "0 0 0"},
      { name: "Robot Arm", 
        info: "Automation and the future of labor.", 
        model: "assets/contemporary/robotarm.glb", 
        scale: "0.5 0.5 0.5",
        rotation: "0 0 0", offset: "0 0 0"}
    ]
  }
];

const EraSchema = new mongoose.Schema({ id: String, env: String, items: Array });
const Era = mongoose.model('Era', EraSchema);

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected. Deleting old data...');
    await Era.deleteMany({}); // Clear old data
    console.log('Inserting new data...');
    await Era.insertMany(DB);
    console.log('Data Seeded Successfully!');
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });