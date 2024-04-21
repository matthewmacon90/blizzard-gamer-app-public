export default [
    {
        id: 0,
        className: `Warrior`,
        playableSpecs: [
            {
                classGuide: `https://www.wowhead.com/guide/classes/warrior/arms/overview-pve-dps`,
                specName: `Arms`, 
                specType: `Damage`, 
                specRole: `Melee`, 
                specInfo: `Arms Warriors are a damage spec that focuses on using a two-handed weapon to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/warrior/fury/overview-pve-dps`,
                specName: `Fury`, 
                specType: `Damage`, 
                specRole: `Melee`, 
                specInfo: `Fury Warriors are a damage spec that focuses on dual-wielding two-handed weapons to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/warrior/protection/overview-pve-tank`,
                specName: `Protection`, 
                specType: `Tank`, 
                specRole: `Melee`, 
                specInfo: `Protection Warriors are a tank spec that focuses on using a shield and a one-handed weapon to protect their allies. They have a variety of abilities that allow them to mitigate damage and protect their allies. They are capable of tanking multiple targets at once and have good survivability.`
            }
        ],
        roles: [`Tank`, `Damage`],
        roleType: `Melee`,
        is_melee: true,
        is_ranged: false,
        armorType: `Plate`,
        availableWeapons: [`Axe`, `Mace`, `Sword`, `Polearm`, `Two-Handed`, `Dual-Wield`, `Shield`],
        availableRaces: [`Human`, `Dwarf`, `Night Elf`, `Gnome`, `Draenei`, `Worgen`, `Orc`, `Undead`, 
            `Tauren`, `Troll`, `Blood Elf`, `Goblin`, `Pandaren`, `Highmountain Tauren`, `Nightborne`, `Void Elf`, 
            `Lightforged Draenei`, `Zandalari Troll`, `Kul Tiran`, `Dark Iron Dwarf`, `Vulpera`,     `Mag'har Orc`, `Mechagnome`
            ],
        classInfo: `Warriors are a plate-wearing melee class, capable of tanking 
            and dealing melee damage. They are the only class that can dual-wield two-handed weapons. They have three specs: Fury, Arms, and Protection. Fury and Arms are damage specs, while Protection is the tanking spec.`,
    }, 
    {
        id: 1,
        className: `Paladin`,
        playableSpecs: [
            {
                classGuide: `https://www.wowhead.com/guide/classes/paladin/holy/overview-pve-healer`,
                specName: `Holy`, 
                specType: `Healer`, 
                specRole: `Melee`, 
                specInfo: `Holy Paladins are a healer spec that focuses on using the Light to heal their allies. They have a variety of abilities that allow them to heal multiple targets at once. They are capable of healing large amounts of damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/paladin/protection/overview-pve-tank`,
                specName: `Protection`, 
                specType: `Tank`, 
                specRole: `Melee`, 
                specInfo: `Protection Paladins are a tank spec that focuses on using a shield and a one-handed weapon to protect their allies. They have a variety of abilities that allow them to mitigate damage and protect their allies. They are capable of tanking multiple targets at once and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/paladin/retribution/overview-pve-dps`,
                specName: `Retribution`, 
                specType: `Damage`, 
                specRole: `Melee`, 
                specInfo: `Retribution Paladins are a damage spec that focuses on using the Light to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            }
        ],
        roles: [`Healer`, `Tank`, `Damage`],
        roleType: `Melee`,
        is_melee: true,
        is_ranged: false,
        armorType: `Plate`,
        availableWeapons: [`Axe`, `Mace`, `Sword`, `Polearm`, `Two-Handed`, `Shield`],
        availableRaces: [`Human`, `Dwarf`, `Draenei`, `Lightforged Draenei`, `Dark Iron Dwarf`, `Tauren`, `Blood Elf`, `Zandalari Troll`],
        classInfo: `Paladins are a plate-wearing melee class, capable of tanking, healing, and dealing melee damage. They have three specs: Holy, Protection, and Retribution.`,
    },
    {
        id: 2,
        className: `Death Knight`,
        playableSpecs: [
            {
                classGuide: `https://www.wowhead.com/guide/classes/death-knight/blood/overview-pve-tank`,
                specName: `Blood`, 
                specType: `Tank`, 
                specRole: `Melee`, 
                specInfo: `Blood Death Knights are a tank spec that focuses on using blood magic to protect their allies. They have a variety of abilities that allow them to mitigate damage and protect their allies. They are capable of tanking multiple targets at once and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/death-knight/frost/overview-pve-dps`,
                specName: `Frost`, 
                specType: `Damage`, 
                specRole: `Melee`, 
                specInfo: `Frost Death Knights are a damage spec that focuses on using frost magic to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/death-knight/unholy/overview-pve-dps`,
                specName: `Unholy`, 
                specType: `Damage`, 
                specRole: `Melee`, 
                specInfo: `Unholy Death Knights are a damage spec that focuses on using unholy magic to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            }
        ],
        roles: [`Tank`, `Damage`],
        roleType: `Melee`,
        is_melee: true,
        is_ranged: false,
        armorType: `Plate`,
        availableWeapons: [`Axe`, `Mace`, `Sword`, `Polearm`, `Two-Handed`, `Dual-Wield`],
        availableRaces: [`Human`, `Dwarf`, `Night Elf`, `Gnome`, `Draenei`, `Worgen`, `Orc`, `Undead`, `Tauren`, `Troll`, `Blood Elf`, 
            `Goblin`, `Pandaren`, `Nightborne`, `Void Elf`, 
            `Lightforged Draenei`, `Zandalari Troll`, `Kul Tiran`, `Dark Iron Dwarf`, `Vulpera`, `Mag'har Orc`, `Mechagnome`, `Highmountain Tauren`
            ],
        classInfo: `Death Knights are a plate-wearing melee class, capable of tanking and dealing melee damage. They have three specs: Blood, Frost, and Unholy.`,
    },
    {
        id: 4,
        className: `Hunter`,
        playableSpecs: [
            {
                classGuide: `https://www.wowhead.com/guide/classes/hunter/beast-mastery/overview-pve-dps`,
                specName: `Beast Mastery`, 
                specType: `Damage`, 
                specRole: `Ranged`, 
                specInfo: `Beast Mastery Hunters are a damage spec that focuses on using their pets to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/hunter/marksmanship/overview-pve-dps`,
                specName: `Marksmanship`, 
                specType: `Damage`, 
                specRole: `Ranged`, 
                specInfo: `Marksmanship Hunters are a damage spec that focuses on using ranged weapons to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/hunter/survival/overview-pve-dps`,
                specName: `Survival`, 
                specType: `Damage`, 
                specRole: `Melee`, 
                specInfo: `Survival Hunters are a damage spec that focuses on using melee weapons to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            }
        ],
        roles: [`Damage`],
        roleType: `Ranged`,
        is_melee: false,
        is_ranged: true,
        armorType: `Mail`,
        availableWeapons: [`Axe`, `Bow`, `Crossbow`, `Dagger`, `Fist Weapon`, `Gun`, `Polearm`, `Staff`, `Sword`, `Two-Handed`, `Warglaive`],
        availableRaces: [`Human`, `Dwarf`, `Night Elf`, `Gnome`, `Draenei`, `Worgen`, `Orc`, `Undead`, `Tauren`, `Troll`, 
            `Blood Elf`, `Goblin`, `Pandaren`, `Highmountain Tauren`, `Nightborne`, `Void Elf`, `Lightforged Draenei`, 
            `Zandalari Troll`, `Kul Tiran`, `Dark Iron Dwarf`, `Vulpera`, `Mag'har Orc`, `Mechagnome`
            ],
        classInfo: `Hunters are a mail-wearing ranged class, capable of dealing ranged damage. They have three specs: Beast Mastery, Marksmanship, and Survival.`,
    },
    {
        id: 5,
        className: `Shaman`,
        playableSpecs: [
            {
                classGuide: `https://www.wowhead.com/guide/classes/shaman/elemental/overview-pve-dps`,
                specName: `Elemental`, 
                specType: `Damage`, 
                specRole: `Ranged`, 
                specInfo: `Elemental Shamans are a damage spec that focuses on using the elements to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/shaman/enhancement/overview-pve-dps`,
                specName: `Enhancement`,
                specType: `Damage`,
                specRole: `Melee`,
                specInfo: `Enhancement Shamans are a damage spec that focuses on using the elements to deal damage. They have a variety of abilities that allow them to deal damage to multiple targets at once. They are capable of dealing high burst damage and have good survivability.`
            },
            {
                classGuide: `https://www.wowhead.com/guide/classes/shaman/restoration/overview-pve-healer`,
                specName: `Restoration`,
                specType: `Healer`,
                specRole: `Ranged`,
                specInfo: `Restoration Shamans are a healer spec that focuses on using the elements to heal their allies. They have a variety of abilities that allow them to heal multiple targets at once. They are capable of healing large amounts of damage and have good survivability.`
            }
        ],
        roles: [`Damage`, `Healer`],
        roleType: [`Melee`, `Ranged`],
        is_melee: true,
        is_ranged: true,
        armorType: `Mail`,
        availableWeapons: [`Axe`, `Dagger`, `Fist Weapon`, `Mace`, `Shield`, `Staff`, `Sword`, `Two-Handed`],
        availableRaces: [`Human`, `Dwarf`, `Night Elf`, `Gnome`, `Draenei`, `Worgen`, `Orc`, `Undead`, `Tauren`, `Troll`, `Blood Elf`, `Goblin`, `Pandaren`, 
            `Highmountain Tauren`, `Nightborne`, `Void Elf`, `Lightforged Draenei`, 
            `Zandalari Troll`, `Kul Tiran`, `Dark Iron Dwarf`, `Vulpera`, `Mag'har Orc`, `Mechagnome`, `Pandaren`
            ],
        classInfo: `Shamans are a mail-wearing class, capable of dealing ranged and melee damage, as well as healing. They have three specs: Elemental, Enhancement, and Restoration.`,
    }
];
