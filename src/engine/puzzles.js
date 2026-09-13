export const ADVENTURERS = ['Aldric', 'Mira', 'Theron', 'Sylva', 'Brom']

export const CATEGORIES = ['race', 'realm', 'familiar', 'class']

export const CATEGORY_LABELS = {
  race:     'Race',
  realm:    'Realm',
  familiar: 'Familiar',
  class:    'Class',
}

export const CATEGORY_VALUES = {
  race:     ['Elf', 'Dwarf', 'Demihuman', 'Human', 'Druid'],
  realm:    ['Forest', 'Mountain', 'Desert', 'Ocean', 'Shadow'],
  familiar: ['Dragon', 'Phoenix', 'Wolf', 'Raven', 'Golem'],
  class:    ['Warrior', 'Mage', 'Archer', 'Rogue', 'Paladin'],
}

export const CATEGORY_FOLDERS = {
  race:     'races',
  realm:    'realms',
  familiar: 'familiars',
  class:    'classes',
}

export const DIFFICULTY_LABELS = {
  easy:   'Novice',
  medium: 'Adept',
  hard:   'Master',
}

export const PUZZLES = [
  // ─── Puzzle 1 ─────────────────────────────────────────────────────────────
  {
    id: 1,
    name: 'The Tavern Enigma',
    difficulty: 'easy',
    description:
      'Five adventurers rest at the inn. Study their manner and uncover their secrets.',
    clues: [
      { id: 1,  type: 'direct', adventurer: 'Aldric', category: 'race',     value: 'Human',   text: 'Aldric is a Human.' },
      { id: 2,  type: 'direct', adventurer: 'Mira',   category: 'race',     value: 'Elf',     text: 'Mira is an Elf.' },
      { id: 3,  type: 'direct', adventurer: 'Brom',   category: 'race',     value: 'Dwarf',   text: 'Brom is a Dwarf.' },
      { id: 4,  type: 'direct', adventurer: 'Theron', category: 'race',     value: 'Druid',   text: 'Theron follows the ancient path of the Druid.' },
      { id: 5,  type: 'same',   cat1: 'race',     val1: 'Druid',   cat2: 'realm',    val2: 'Shadow',   text: 'The Druid dwells in the Shadow Realm.' },
      { id: 6,  type: 'direct', adventurer: 'Mira',   category: 'class',    value: 'Mage',    text: 'Mira walks the arcane path of the Mage.' },
      { id: 7,  type: 'same',   cat1: 'class',    val1: 'Mage',    cat2: 'realm',    val2: 'Forest',   text: 'The Mage hails from the Forest Realm.' },
      { id: 8,  type: 'direct', adventurer: 'Sylva',  category: 'class',    value: 'Archer',  text: 'Sylva is an Archer.' },
      { id: 9,  type: 'direct', adventurer: 'Theron', category: 'familiar', value: 'Raven',   text: 'Theron communes with a Raven.' },
      { id: 10, type: 'same',   cat1: 'realm',    val1: 'Ocean',   cat2: 'familiar', val2: 'Wolf',     text: 'The adventurer of the Ocean Realm is bonded to a Wolf.' },
      { id: 11, type: 'same',   cat1: 'class',    val1: 'Paladin', cat2: 'familiar', val2: 'Dragon',   text: 'The Paladin commands a Dragon.' },
      { id: 12, type: 'same',   cat1: 'class',    val1: 'Warrior', cat2: 'familiar', val2: 'Golem',    text: 'The Warrior is bonded to a Golem.' },
      { id: 13, type: 'same',   cat1: 'race',     val1: 'Dwarf',   cat2: 'realm',    val2: 'Desert',   text: 'The Dwarf hails from the scorching Desert.' },
      { id: 14, type: 'direct', adventurer: 'Mira',   category: 'familiar', value: 'Phoenix', text: 'Mira is bonded to a Phoenix.' },
      { id: 15, type: 'direct', adventurer: 'Aldric', category: 'class',    value: 'Warrior', text: 'Aldric walks the path of the Warrior.' },
    ],
    solution: {
      Aldric: { race: 'Human',     realm: 'Mountain', familiar: 'Golem',   class: 'Warrior' },
      Mira:   { race: 'Elf',       realm: 'Forest',   familiar: 'Phoenix', class: 'Mage'    },
      Theron: { race: 'Druid',     realm: 'Shadow',   familiar: 'Raven',   class: 'Rogue'   },
      Sylva:  { race: 'Demihuman', realm: 'Ocean',    familiar: 'Wolf',    class: 'Archer'  },
      Brom:   { race: 'Dwarf',     realm: 'Desert',   familiar: 'Dragon',  class: 'Paladin' },
    },
  },

  // ─── Puzzle 2 ─────────────────────────────────────────────────────────────
  {
    id: 2,
    name: "The Dragon's Riddle",
    difficulty: 'medium',
    description:
      'Five guild members conceal their identities. Decipher the ancient clues to reveal the truth.',
    clues: [
      { id: 1,  type: 'same',   cat1: 'race',     val1: 'Druid',     cat2: 'realm',    val2: 'Ocean',    text: 'The Druid is drawn to the vast Ocean Realm.' },
      { id: 2,  type: 'same',   cat1: 'race',     val1: 'Elf',       cat2: 'familiar', val2: 'Raven',    text: 'The Elf communes with a Raven.' },
      { id: 3,  type: 'same',   cat1: 'class',    val1: 'Mage',      cat2: 'realm',    val2: 'Shadow',   text: 'The Mage dwells in the Shadow Realm.' },
      { id: 4,  type: 'same',   cat1: 'class',    val1: 'Paladin',   cat2: 'familiar', val2: 'Dragon',   text: 'The Paladin commands a Dragon.' },
      { id: 5,  type: 'direct', adventurer: 'Mira',   category: 'class',    value: 'Warrior',  text: 'Mira walks the path of the Warrior.' },
      { id: 6,  type: 'same',   cat1: 'class',    val1: 'Warrior',   cat2: 'familiar', val2: 'Golem',    text: 'The Warrior commands a Golem.' },
      { id: 7,  type: 'same',   cat1: 'race',     val1: 'Dwarf',     cat2: 'realm',    val2: 'Mountain', text: 'The Dwarf calls the Mountain Realm home.' },
      { id: 8,  type: 'direct', adventurer: 'Theron', category: 'race',     value: 'Human',    text: 'Theron is a Human.' },
      { id: 9,  type: 'direct', adventurer: 'Brom',   category: 'class',    value: 'Archer',   text: 'Brom is an Archer.' },
      { id: 10, type: 'same',   cat1: 'realm',    val1: 'Ocean',     cat2: 'familiar', val2: 'Phoenix',  text: 'The Ocean Realm adventurer communes with a Phoenix.' },
      { id: 11, type: 'not',    cat1: 'class',    val1: 'Rogue',     cat2: 'realm',    val2: 'Forest',   text: 'The Rogue does not hail from the Forest Realm.' },
      { id: 12, type: 'not',    cat1: 'class',    val1: 'Rogue',     cat2: 'realm',    val2: 'Shadow',   text: 'The Rogue does not dwell in the Shadow Realm.' },
      { id: 13, type: 'direct', adventurer: 'Sylva',  category: 'class',    value: 'Mage',     text: 'Sylva commands the arcane arts.' },
      { id: 14, type: 'direct', adventurer: 'Sylva',  category: 'race',     value: 'Elf',      text: 'Sylva is an Elf.' },
      { id: 15, type: 'same',   cat1: 'race',     val1: 'Human',     cat2: 'realm',    val2: 'Forest',   text: 'The Human dwells in the Forest Realm.' },
      { id: 16, type: 'direct', adventurer: 'Brom',   category: 'race',     value: 'Demihuman',text: 'Brom is a Demihuman.' },
    ],
    solution: {
      Aldric: { race: 'Druid',     realm: 'Ocean',    familiar: 'Phoenix', class: 'Rogue'   },
      Mira:   { race: 'Dwarf',     realm: 'Mountain', familiar: 'Golem',   class: 'Warrior' },
      Theron: { race: 'Human',     realm: 'Forest',   familiar: 'Dragon',  class: 'Paladin' },
      Sylva:  { race: 'Elf',       realm: 'Shadow',   familiar: 'Raven',   class: 'Mage'    },
      Brom:   { race: 'Demihuman', realm: 'Desert',   familiar: 'Wolf',    class: 'Archer'  },
    },
  },

  // ─── Puzzle 3 ─────────────────────────────────────────────────────────────
  {
    id: 3,
    name: 'The Lost Scroll',
    difficulty: 'hard',
    description:
      'A cryptic scroll bears few clues. Only the wisest of minds may prevail.',
    clues: [
      { id: 1,  type: 'same',       cat1: 'race',     val1: 'Elf',       cat2: 'realm',    val2: 'Forest',   text: 'The Elf dwells in the ancient Forest Realm.' },
      { id: 2,  type: 'same',       cat1: 'familiar', val1: 'Dragon',    cat2: 'class',    val2: 'Mage',     text: 'The keeper of the Dragon follows the path of the Mage.' },
      { id: 3,  type: 'same',       cat1: 'realm',    val1: 'Shadow',    cat2: 'familiar', val2: 'Raven',    text: 'A Raven circles above the Shadow Realm.' },
      { id: 4,  type: 'same',       cat1: 'class',    val1: 'Warrior',   cat2: 'familiar', val2: 'Golem',    text: 'The Warrior commands an iron Golem.' },
      { id: 5,  type: 'not',        cat1: 'class',    val1: 'Paladin',   cat2: 'realm',    val2: 'Ocean',    text: 'The Paladin shuns the Ocean Realm.' },
      { id: 6,  type: 'same',       cat1: 'race',     val1: 'Druid',     cat2: 'familiar', val2: 'Raven',    text: 'The Druid communes with a Raven.' },
      { id: 7,  type: 'same',       cat1: 'realm',    val1: 'Ocean',     cat2: 'familiar', val2: 'Phoenix',  text: 'A Phoenix soars above the Ocean Realm.' },
      { id: 8,  type: 'same',       cat1: 'race',     val1: 'Dwarf',     cat2: 'realm',    val2: 'Mountain', text: 'The Dwarf carves a home in the Mountain Realm.' },
      { id: 9,  type: 'same',       cat1: 'race',     val1: 'Demihuman', cat2: 'realm',    val2: 'Desert',   text: 'The Demihuman claims the Desert as homeland.' },
      { id: 10, type: 'direct',     adventurer: 'Brom',   category: 'familiar', value: 'Dragon',   text: 'Brom commands a Dragon.' },
      { id: 11, type: 'direct',     adventurer: 'Mira',   category: 'class',    value: 'Rogue',    text: 'Mira walks the shadowed path of the Rogue.' },
      { id: 12, type: 'direct_not', adventurer: 'Sylva',  category: 'class',    value: 'Warrior',  text: 'Sylva does not walk the path of the Warrior.' },
      { id: 13, type: 'direct_not', adventurer: 'Theron', category: 'class',    value: 'Archer',   text: 'Theron is not an Archer.' },
      { id: 14, type: 'direct',     adventurer: 'Theron', category: 'realm',    value: 'Mountain', text: 'Theron hails from the Mountain Realm.' },
      { id: 15, type: 'same',       cat1: 'race',     val1: 'Elf',       cat2: 'familiar', val2: 'Dragon',   text: 'The Elf is the keeper of the Dragon.' },
      { id: 16, type: 'same',       cat1: 'class',    val1: 'Rogue',     cat2: 'realm',    val2: 'Shadow',   text: 'The Rogue dwells in the Shadow Realm.' },
      { id: 17, type: 'direct_not', adventurer: 'Aldric', category: 'realm',    value: 'Ocean',    text: 'Aldric does not dwell in the Ocean Realm.' },
      { id: 18, type: 'same',       cat1: 'class',    val1: 'Warrior',   cat2: 'realm',    val2: 'Mountain', text: 'The Warrior makes the Mountain their home.' },
    ],
    solution: {
      Aldric: { race: 'Demihuman', realm: 'Desert',   familiar: 'Wolf',    class: 'Paladin' },
      Mira:   { race: 'Druid',     realm: 'Shadow',   familiar: 'Raven',   class: 'Rogue'   },
      Theron: { race: 'Dwarf',     realm: 'Mountain', familiar: 'Golem',   class: 'Warrior' },
      Sylva:  { race: 'Human',     realm: 'Ocean',    familiar: 'Phoenix', class: 'Archer'  },
      Brom:   { race: 'Elf',       realm: 'Forest',   familiar: 'Dragon',  class: 'Mage'    },
    },
  },
]
