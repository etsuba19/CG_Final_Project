// Planet configuration data
export const PLANET_DATA = {
    mercury: { 
        name: "Mercury", 
        distance: 5.8, 
        size: 1.5, 
        color: 0x8C7853, 
        period: 8.8, 
        rotation: 5.86,
        type: "Terrestrial Planet",
        fact1: "Closest planet to the Sun",
        fact2: "No moons or rings",
        fact3: "Extreme temperature variations"
    },
    venus: { 
        name: "Venus", 
        distance: 10.8, 
        size: 2.4, 
        color: 0xFFC649, 
        period: 22.5, 
        rotation: 24.3,
        type: "Terrestrial Planet",
        fact1: "Hottest planet in solar system",
        fact2: "Rotates backwards (retrograde)",
        fact3: "Thick atmosphere of carbon dioxide"
    },
    earth: { 
        name: "Earth", 
        distance: 15, 
        size: 2.5, 
        color: 0x6B93D6, 
        period: 36.5, 
        rotation: 1,
        type: "Terrestrial Planet",
        fact1: "Only planet known to have life",
        fact2: "Has one natural satellite (Moon)",
        fact3: "71% of surface covered by water"
    },
    mars: { 
        name: "Mars", 
        distance: 22.8, 
        size: 1.3, 
        color: 0xC1440E, 
        period: 68.7, 
        rotation: 1.03,
        type: "Terrestrial Planet",
        fact1: "Known as the Red Planet",
        fact2: "Has two small moons",
        fact3: "Target for future human exploration"
    },
    jupiter: { 
        name: "Jupiter", 
        distance: 77.8, 
        size: 18, 
        color: 0xD8CA9D, 
        period: 433.3, 
        rotation: 0.41,
        type: "Gas Giant",
        fact1: "Largest planet in solar system",
        fact2: "Has 79 known moons",
        fact3: "Great Red Spot storm"
    },
    saturn: { 
        name: "Saturn", 
        distance: 143.4, 
        size: 15, 
        color: 0xFAD5A5, 
        period: 1075.9, 
        rotation: 0.45,
        type: "Gas Giant",
        fact1: "Famous for its spectacular rings",
        fact2: "Has 82 confirmed moons",
        fact3: "Least dense planet (would float in water)"
    },
    uranus: { 
        name: "Uranus", 
        distance: 287.1, 
        size: 10, 
        color: 0x4FD0E7, 
        period: 3068.7, 
        rotation: 0.72,
        type: "Ice Giant",
        fact1: "Tilted on its side (98 degrees)",
        fact2: "Has 27 known moons",
        fact3: "Blue-green color from methane gas"
    },
    neptune: { 
        name: "Neptune", 
        distance: 449.5, 
        size: 9.7, 
        color: 0x4B70DD, 
        period: 6019, 
        rotation: 0.67,
        type: "Ice Giant",
        fact1: "Farthest planet from the Sun",
        fact2: "Has the strongest winds in solar system",
        fact3: "Has 14 known moons"
    }
};

export const SUN_DATA = {
    name: "Sun",
    size: 8,
    color: 0xFFFF00,
    type: "Yellow Dwarf Star",
    fact1: "Center of our solar system",
    fact2: "Contains 99.86% of solar system's mass",
    fact3: "Surface temperature: 5,778 K (10,000°F)"
};

export const MOON_DATA = {
    name: "Moon",
    size: 0.7,
    color: 0xCCCCCC,
    distance: 4,
    period: 2.73,
    fact1: "Earth's only natural satellite",
    fact2: "Only celestial body humans have walked on",
    fact3: "Causes ocean tides on Earth"
};
