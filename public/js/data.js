// Make DB globally accessible
window.DB = {
  prehistory: {
    env: "preset: forest; fog: 0.7; skyType: atmosphere; groundColor: #3d2c20", 
    items: [
      { 
        name: "Stone Axe", 
        info: "One of humanity's earliest tools, the stone axe utilized the principle of leverage. By attaching a sharpened stone to a wooden handle, early humans could chop wood for shelter, butcher large game, and defend their tribes with significantly more force than a hand-held rock.",
        model: "assets/prehistory/axe.glb",
        scale: "0.25 0.25 0.25"
      },
      { 
        name: "Fire Pit", 
        info: "The mastery of fire changed human evolution. Beyond providing warmth and protection from predators at night, the fire pit allowed humans to cook food, which made calories easier to digest and fueled rapid brain development.",
        model: "assets/prehistory/bonfire.glb",
        scale: "1 1 1"
      },
      { 
        name: "Cave Art", 
        info: "Found in deep caverns, these paintings represent the birth of abstract thought and storytelling. They serve as the first historical records, depicting hunting scenes and spiritual rituals, proving that early humans had a desire to communicate beyond simple survival.",
        model: "assets/prehistory/cave.glb",
        scale: "0.5 0.5 0.5"
      },
      { 
        name: "Bone Needle", 
        info: "Carved from animal remains, this delicate tool revolutionized survival. It allowed humans to sew tight-fitting, layered clothing from furs and hides, enabling migration into colder climates that were previously uninhabitable.",
        model: "assets/prehistory/bone.glb",
        scale: "0.5 0.5 0.5"
      },
      { 
        name: "Woven Basket", 
        info: "Before the invention of pottery, woven plant fibers created the first lightweight containers. This innovation in logistics allowed gatherers to transport large amounts of berries, nuts, and resources back to camp efficiently.",
        model: "assets/prehistory/basket.glb",
        scale: "0.1 0.1 0.1"
      }
    ],
    backgroundModels: [
      {
        id: "volcano",
        model: "assets/prehistory/volcano.glb",
        position: "0 0 -100",
        scale: "50 50 50",
        rotation: "0 0 0"
      },
      {
        id: "large-bone",
        model: "assets/prehistory/large_bone.glb",
        position: "8 0.5 5",
        scale: "3 3 3",
        rotation: "0 45 0"
      }
    ]
  },
  classical: {
    env: "preset: egypt; skyType: gradient; lighting: distant; groundColor: #e6c288",
    items: [
      { 
        name: "Amphora", 
        info: "These two-handled ceramic jars were the standard shipping containers of the ancient world. Designed to stack efficiently in ship hulls, they transported wine, olive oil, and grain across the vast trade networks of the Mediterranean.",
        model: "assets/classical/amphora.glb",
        scale: "0.5 0.5 0.5"
      },
      { 
        name: "Legion Helmet", 
        info: "A symbol of the Roman military machine, this helmet was mass-produced for professional soldiers. It offered excellent protection for the head and neck while allowing visibility, representing the disciplined and standardized nature of the Empire's armies.",
        model: "assets/classical/helmet.glb",
        scale: "0.01 0.01 0.01"
      },
      { 
        name: "Papyrus", 
        info: "Made from reeds along the Nile River, papyrus was a revolutionary portable alternative to heavy stone tablets. It allowed for the easy administration of vast empires, the recording of taxes, and the preservation of literature and history.",
        model: "assets/classical/papyrus.glb",
        scale: "0.5 0.5 0.5"
      },
      { 
        name: "Marble Bust", 
        info: "These realistic sculptures were often used as political propaganda. Rulers commissioned busts to display their likeness in public squares throughout their empire, reminding citizens of their authority and god-like status.",
        model: "assets/classical/bust.glb",
        scale: "0.4 0.4 0.4"
      },
      { 
        name: "Gold Coin", 
        info: "The invention of standardized coinage replaced clumsy barter systems. Gold coins held intrinsic value and were recognized across borders, facilitating international trade, taxation, and the accumulation of wealth.",
        model: "assets/classical/coin.glb",
        scale: "0.5 0.5 0.5"
      }
    ]
  },
  middleages: {
    env: "preset: starry; fog: 0.5; groundColor: #1a1a1a; grid: none",
    items: [
      { 
        name: "Iron Sword", 
        info: "Forged by skilled blacksmiths, high-carbon steel swords were the primary weapons of the knight class. They represented the pinnacle of medieval metallurgy, requiring immense skill to balance durability with a razor-sharp edge.",
        model: "assets/middle/sword.glb",
        scale: "1 1 1"
      },
      { 
        name: "Shield", 
        info: "In the chaos of battle, knowing friend from foe was impossible without visual aids. Shields were painted with 'heraldry'—unique symbols and colors acting as a visual ID system to identify a knight's family and allegiance.",
        model: "assets/middle/shield.glb",
        scale: "0.25 0.25 0.25"
      },
      { 
        name: "Crown", 
        info: "The ultimate symbol of feudal power. The crown represented the 'Divine Right of Kings,' the political doctrine asserting that a monarch's legitimacy came directly from God and was not subject to earthly authority.",
        model: "assets/middle/crown.glb",
        scale: "0.25 0.25 0.25"
      },
      { 
        name: "Cross", 
        info: "The cross symbolized the Church, which was the unifying power of the Middle Ages. Religious institutions influenced every aspect of life, from education and law to the legitimacy of wars and the crowning of kings.",
        model: "assets/middle/cross.glb",
        scale: "0.025 0.025 0.025"
      },
      { 
        name: "Manuscript", 
        info: "Before the printing press, books were rare treasures. Monks in monasteries painstakingly copied texts by hand onto parchment, preserving the knowledge of history, theology, and science through the turbulent Dark Ages.",
        model: "assets/middle/manuscript.glb",
        scale: "0.5 0.5 0.5"
      }
    ]
  },
  earlymodern: {
    env: "preset: arches; skyType: atmosphere; lighting: distant; groundColor: #8f7e6b",
    items: [
      { 
        name: "Compass", 
        info: "By using a magnetized needle to point North, the compass allowed sailors to navigate the open ocean rather than hugging the coastline. This technology sparked the Age of Discovery and connected the continents.",
        model: "assets/modern/compass.glb",
        scale: "0.5 0.5 0.5"
      },
      { 
        name: "Printing Press", 
        info: "Johannes Gutenberg's movable type allowed for the mass production of books. This drastically reduced the cost of information, increased literacy rates, and broke the monopoly the wealthy and the church held on knowledge.",
        model: "assets/modern/printer.glb",
        scale: "1.5 1.5 1.5"
      },
      { 
        name: "Telescope", 
        info: "This instrument magnified the heavens, allowing astronomers like Galileo to prove the Earth revolved around the Sun. This observation challenged centuries of religious dogma and launched the Scientific Revolution.",
        model: "assets/modern/telescope.glb",
        scale: "0.4 0.4 0.4"
      },
      { 
        name: "Gunpowder", 
        info: "Originally invented in China, gunpowder was adapted for military cannons in the West. It could smash through stone walls, rendering medieval castles obsolete and changing the strategy of warfare forever.",
        model: "assets/modern/gunpowder.glb",
        scale: "2.5 2.5 2.5"
      },
      { 
        name: "Spices", 
        info: "Exotic spices like pepper, cinnamon, and cloves were once worth their weight in gold. The desperate demand for these preservatives drove European nations to colonize the Americas and Asia to control the trade routes.",
        model: "assets/modern/spices.glb",
        scale: "1 1 1"
      }
    ]
  },
  contemporary: {
    env: "preset: tron; grid: 1x1; groundColor: #000; skyType: gradient",
    items: [
      { 
        name: "Microchip", 
        info: "A tiny wafer of silicon containing billions of microscopic transistors. The microchip is the brain of the Information Age, powering everything from supercomputers and cars to coffee makers and wristwatches.",
        model: "assets/contemporary/microchip.glb",
        scale: "0.2 0.2 0.2"
      },
      { 
        name: "Rocket", 
        info: "Rocketry allowed humanity to overcome gravity. This technology enabled the deployment of satellites for global communication and GPS, and facilitated the historic Apollo missions that put humans on the Moon.",
        model: "assets/contemporary/rocket.glb",
        scale: "1.5 1.5 1.5"
      },
      { 
        name: "Smartphone", 
        info: "A convergence of almost all previous technologies. It places a camera, GPS, high-speed computer, and the sum of all human knowledge into a device that fits in a pocket, connecting billions of people instantly.",
        model: "assets/contemporary/phone.glb",
        scale: "0.5 0.5 0.5"
      },
      { 
        name: "Plastic", 
        info: "A synthetic material that is cheap, durable, and sterile. While it revolutionized medicine and food safety, its resistance to decomposition has created a massive global environmental challenge.",
        model: "assets/contemporary/plastic.glb",
        scale: "0.1 0.1 0.1"
      },
      { 
        name: "Robot Arm", 
        info: "The backbone of modern manufacturing. These programmable machines perform repetitive, precise, or dangerous tasks with superhuman speed, redefining the future of labor and industrial production.",
        model: "assets/contemporary/robotarm.glb",
        scale: "0.5 0.5 0.5"
      }
    ]
  }
};

// Also assign to const DB for backward compatibility
const DB = window.DB;