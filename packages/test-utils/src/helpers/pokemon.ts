export type PokemonType =
  | 'Normal'
  | 'Fire'
  | 'Fighting'
  | 'Water'
  | 'Flying'
  | 'Grass'
  | 'Poison'
  | 'Electric'
  | 'Ground'
  | 'Psychic'
  | 'Rock'
  | 'Ice'
  | 'Bug'
  | 'Dragon'
  | 'Ghost'
  | 'Dark'
  | 'Steel'
  | 'Fairy'

export type PokedexEntry = {
  id?: number
  name: string
  type: PokemonType[]
  base: {
    HP: number
    Attack: number
    Defense: number
    SpAttack: number
    SpDefense: number
    Speed: number
  }
}

export const allPokemonArray: PokedexEntry[] = [
  {
    id: 1,
    name: 'Bulbasaur',
    type: ['Grass', 'Poison'],
    base: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      SpAttack: 65,
      SpDefense: 65,
      Speed: 45,
    },
  },
  {
    id: 2,
    name: 'Ivysaur',
    type: ['Grass', 'Poison'],
    base: {
      HP: 60,
      Attack: 62,
      Defense: 63,
      SpAttack: 80,
      SpDefense: 80,
      Speed: 60,
    },
  },
  {
    id: 3,
    name: 'Venusaur',
    type: ['Grass', 'Poison'],
    base: {
      HP: 80,
      Attack: 82,
      Defense: 83,
      SpAttack: 100,
      SpDefense: 100,
      Speed: 80,
    },
  },
  {
    id: 4,
    name: 'Charmander',
    type: ['Fire'],
    base: {
      HP: 39,
      Attack: 52,
      Defense: 43,
      SpAttack: 60,
      SpDefense: 50,
      Speed: 65,
    },
  },
  {
    id: 5,
    name: 'Charmeleon',
    type: ['Fire'],
    base: {
      HP: 58,
      Attack: 64,
      Defense: 58,
      SpAttack: 80,
      SpDefense: 65,
      Speed: 80,
    },
  },
  {
    id: 6,
    name: 'Charizard',
    type: ['Fire', 'Flying'],
    base: {
      HP: 78,
      Attack: 84,
      Defense: 78,
      SpAttack: 109,
      SpDefense: 85,
      Speed: 100,
    },
  },
  {
    id: 7,
    name: 'Squirtle',
    type: ['Water'],
    base: {
      HP: 44,
      Attack: 48,
      Defense: 65,
      SpAttack: 50,
      SpDefense: 64,
      Speed: 43,
    },
  },
  {
    id: 8,
    name: 'Wartortle',
    type: ['Water'],
    base: {
      HP: 59,
      Attack: 63,
      Defense: 80,
      SpAttack: 65,
      SpDefense: 80,
      Speed: 58,
    },
  },
  {
    id: 9,
    name: 'Blastoise',
    type: ['Water'],
    base: {
      HP: 79,
      Attack: 83,
      Defense: 100,
      SpAttack: 85,
      SpDefense: 105,
      Speed: 78,
    },
  },
  {
    id: 10,
    name: 'Caterpie',
    type: ['Bug'],
    base: {
      HP: 45,
      Attack: 30,
      Defense: 35,
      SpAttack: 20,
      SpDefense: 20,
      Speed: 45,
    },
  },
  {
    id: 11,
    name: 'Metapod',
    type: ['Bug'],
    base: {
      HP: 50,
      Attack: 20,
      Defense: 55,
      SpAttack: 25,
      SpDefense: 25,
      Speed: 30,
    },
  },
  {
    id: 12,
    name: 'Butterfree',
    type: ['Bug', 'Flying'],
    base: {
      HP: 60,
      Attack: 45,
      Defense: 50,
      SpAttack: 90,
      SpDefense: 80,
      Speed: 70,
    },
  },
  {
    id: 13,
    name: 'Weedle',
    type: ['Bug', 'Poison'],
    base: {
      HP: 40,
      Attack: 35,
      Defense: 30,
      SpAttack: 20,
      SpDefense: 20,
      Speed: 50,
    },
  },
  {
    id: 14,
    name: 'Kakuna',
    type: ['Bug', 'Poison'],
    base: {
      HP: 45,
      Attack: 25,
      Defense: 50,
      SpAttack: 25,
      SpDefense: 25,
      Speed: 35,
    },
  },
  {
    id: 15,
    name: 'Beedrill',
    type: ['Bug', 'Poison'],
    base: {
      HP: 65,
      Attack: 90,
      Defense: 40,
      SpAttack: 45,
      SpDefense: 80,
      Speed: 75,
    },
  },
  {
    id: 16,
    name: 'Pidgey',
    type: ['Normal', 'Flying'],
    base: {
      HP: 40,
      Attack: 45,
      Defense: 40,
      SpAttack: 35,
      SpDefense: 35,
      Speed: 56,
    },
  },
  {
    id: 17,
    name: 'Pidgeotto',
    type: ['Normal', 'Flying'],
    base: {
      HP: 63,
      Attack: 60,
      Defense: 55,
      SpAttack: 50,
      SpDefense: 50,
      Speed: 71,
    },
  },
  {
    id: 18,
    name: 'Pidgeot',
    type: ['Normal', 'Flying'],
    base: {
      HP: 83,
      Attack: 80,
      Defense: 75,
      SpAttack: 70,
      SpDefense: 70,
      Speed: 101,
    },
  },
  {
    id: 19,
    name: 'Rattata',
    type: ['Normal'],
    base: {
      HP: 30,
      Attack: 56,
      Defense: 35,
      SpAttack: 25,
      SpDefense: 35,
      Speed: 72,
    },
  },
  {
    id: 20,
    name: 'Raticate',
    type: ['Normal'],
    base: {
      HP: 55,
      Attack: 81,
      Defense: 60,
      SpAttack: 50,
      SpDefense: 70,
      Speed: 97,
    },
  },
  {
    id: 21,
    name: 'Spearow',
    type: ['Normal', 'Flying'],
    base: {
      HP: 40,
      Attack: 60,
      Defense: 30,
      SpAttack: 31,
      SpDefense: 31,
      Speed: 70,
    },
  },
  {
    id: 22,
    name: 'Fearow',
    type: ['Normal', 'Flying'],
    base: {
      HP: 65,
      Attack: 90,
      Defense: 65,
      SpAttack: 61,
      SpDefense: 61,
      Speed: 100,
    },
  },
  {
    id: 23,
    name: 'Ekans',
    type: ['Poison'],
    base: {
      HP: 35,
      Attack: 60,
      Defense: 44,
      SpAttack: 40,
      SpDefense: 54,
      Speed: 55,
    },
  },
  {
    id: 24,
    name: 'Arbok',
    type: ['Poison'],
    base: {
      HP: 60,
      Attack: 95,
      Defense: 69,
      SpAttack: 65,
      SpDefense: 79,
      Speed: 80,
    },
  },
  {
    id: 25,
    name: 'Pikachu',
    type: ['Electric'],
    base: {
      HP: 35,
      Attack: 55,
      Defense: 40,
      SpAttack: 50,
      SpDefense: 50,
      Speed: 90,
    },
  },
  {
    id: 26,
    name: 'Raichu',
    type: ['Electric'],
    base: {
      HP: 60,
      Attack: 90,
      Defense: 55,
      SpAttack: 90,
      SpDefense: 80,
      Speed: 110,
    },
  },
  {
    id: 27,
    name: 'Sandshrew',
    type: ['Ground'],
    base: {
      HP: 50,
      Attack: 75,
      Defense: 85,
      SpAttack: 20,
      SpDefense: 30,
      Speed: 40,
    },
  },
  {
    id: 28,
    name: 'Sandslash',
    type: ['Ground'],
    base: {
      HP: 75,
      Attack: 100,
      Defense: 110,
      SpAttack: 45,
      SpDefense: 55,
      Speed: 65,
    },
  },
  {
    id: 29,
    name: 'Nidoran♀',
    type: ['Poison'],
    base: {
      HP: 55,
      Attack: 47,
      Defense: 52,
      SpAttack: 40,
      SpDefense: 40,
      Speed: 41,
    },
  },
  {
    id: 30,
    name: 'Nidorina',
    type: ['Poison'],
    base: {
      HP: 70,
      Attack: 62,
      Defense: 67,
      SpAttack: 55,
      SpDefense: 55,
      Speed: 56,
    },
  },
  {
    id: 31,
    name: 'Nidoqueen',
    type: ['Poison', 'Ground'],
    base: {
      HP: 90,
      Attack: 92,
      Defense: 87,
      SpAttack: 75,
      SpDefense: 85,
      Speed: 76,
    },
  },
  {
    id: 32,
    name: 'Nidoran♂',
    type: ['Poison'],
    base: {
      HP: 46,
      Attack: 57,
      Defense: 40,
      SpAttack: 40,
      SpDefense: 40,
      Speed: 50,
    },
  },
  {
    id: 33,
    name: 'Nidorino',
    type: ['Poison'],
    base: {
      HP: 61,
      Attack: 72,
      Defense: 57,
      SpAttack: 55,
      SpDefense: 55,
      Speed: 65,
    },
  },
  {
    id: 34,
    name: 'Nidoking',
    type: ['Poison', 'Ground'],
    base: {
      HP: 81,
      Attack: 102,
      Defense: 77,
      SpAttack: 85,
      SpDefense: 75,
      Speed: 85,
    },
  },
  {
    id: 35,
    name: 'Clefairy',
    type: ['Fairy'],
    base: {
      HP: 70,
      Attack: 45,
      Defense: 48,
      SpAttack: 60,
      SpDefense: 65,
      Speed: 35,
    },
  },
  {
    id: 36,
    name: 'Clefable',
    type: ['Fairy'],
    base: {
      HP: 95,
      Attack: 70,
      Defense: 73,
      SpAttack: 95,
      SpDefense: 90,
      Speed: 60,
    },
  },
  {
    id: 37,
    name: 'Vulpix',
    type: ['Fire'],
    base: {
      HP: 38,
      Attack: 41,
      Defense: 40,
      SpAttack: 50,
      SpDefense: 65,
      Speed: 65,
    },
  },
  {
    id: 38,
    name: 'Ninetales',
    type: ['Fire'],
    base: {
      HP: 73,
      Attack: 76,
      Defense: 75,
      SpAttack: 81,
      SpDefense: 100,
      Speed: 100,
    },
  },
  {
    id: 39,
    name: 'Jigglypuff',
    type: ['Normal', 'Fairy'],
    base: {
      HP: 115,
      Attack: 45,
      Defense: 20,
      SpAttack: 45,
      SpDefense: 25,
      Speed: 20,
    },
  },
  {
    id: 40,
    name: 'Wigglytuff',
    type: ['Normal', 'Fairy'],
    base: {
      HP: 140,
      Attack: 70,
      Defense: 45,
      SpAttack: 85,
      SpDefense: 50,
      Speed: 45,
    },
  },
  {
    id: 41,
    name: 'Zubat',
    type: ['Poison', 'Flying'],
    base: {
      HP: 40,
      Attack: 45,
      Defense: 35,
      SpAttack: 30,
      SpDefense: 40,
      Speed: 55,
    },
  },
  {
    id: 42,
    name: 'Golbat',
    type: ['Poison', 'Flying'],
    base: {
      HP: 75,
      Attack: 80,
      Defense: 70,
      SpAttack: 65,
      SpDefense: 75,
      Speed: 90,
    },
  },
  {
    id: 43,
    name: 'Oddish',
    type: ['Grass', 'Poison'],
    base: {
      HP: 45,
      Attack: 50,
      Defense: 55,
      SpAttack: 75,
      SpDefense: 65,
      Speed: 30,
    },
  },
  {
    id: 44,
    name: 'Gloom',
    type: ['Grass', 'Poison'],
    base: {
      HP: 60,
      Attack: 65,
      Defense: 70,
      SpAttack: 85,
      SpDefense: 75,
      Speed: 40,
    },
  },
  {
    id: 45,
    name: 'Vileplume',
    type: ['Grass', 'Poison'],
    base: {
      HP: 75,
      Attack: 80,
      Defense: 85,
      SpAttack: 110,
      SpDefense: 90,
      Speed: 50,
    },
  },
  {
    id: 46,
    name: 'Paras',
    type: ['Bug', 'Grass'],
    base: {
      HP: 35,
      Attack: 70,
      Defense: 55,
      SpAttack: 45,
      SpDefense: 55,
      Speed: 25,
    },
  },
  {
    id: 47,
    name: 'Parasect',
    type: ['Bug', 'Grass'],
    base: {
      HP: 60,
      Attack: 95,
      Defense: 80,
      SpAttack: 60,
      SpDefense: 80,
      Speed: 30,
    },
  },
  {
    id: 48,
    name: 'Venonat',
    type: ['Bug', 'Poison'],
    base: {
      HP: 60,
      Attack: 55,
      Defense: 50,
      SpAttack: 40,
      SpDefense: 55,
      Speed: 45,
    },
  },
  {
    id: 49,
    name: 'Venomoth',
    type: ['Bug', 'Poison'],
    base: {
      HP: 70,
      Attack: 65,
      Defense: 60,
      SpAttack: 90,
      SpDefense: 75,
      Speed: 90,
    },
  },
  {
    id: 50,
    name: 'Diglett',
    type: ['Ground'],
    base: {
      HP: 10,
      Attack: 55,
      Defense: 25,
      SpAttack: 35,
      SpDefense: 45,
      Speed: 95,
    },
  },
  {
    id: 51,
    name: 'Dugtrio',
    type: ['Ground'],
    base: {
      HP: 35,
      Attack: 100,
      Defense: 50,
      SpAttack: 50,
      SpDefense: 70,
      Speed: 120,
    },
  },
  {
    id: 52,
    name: 'Meowth',
    type: ['Normal'],
    base: {
      HP: 40,
      Attack: 45,
      Defense: 35,
      SpAttack: 40,
      SpDefense: 40,
      Speed: 90,
    },
  },
  {
    id: 53,
    name: 'Persian',
    type: ['Normal'],
    base: {
      HP: 65,
      Attack: 70,
      Defense: 60,
      SpAttack: 65,
      SpDefense: 65,
      Speed: 115,
    },
  },
  {
    id: 54,
    name: 'Psyduck',
    type: ['Water'],
    base: {
      HP: 50,
      Attack: 52,
      Defense: 48,
      SpAttack: 65,
      SpDefense: 50,
      Speed: 55,
    },
  },
  {
    id: 55,
    name: 'Golduck',
    type: ['Water'],
    base: {
      HP: 80,
      Attack: 82,
      Defense: 78,
      SpAttack: 95,
      SpDefense: 80,
      Speed: 85,
    },
  },
  {
    id: 56,
    name: 'Mankey',
    type: ['Fighting'],
    base: {
      HP: 40,
      Attack: 80,
      Defense: 35,
      SpAttack: 35,
      SpDefense: 45,
      Speed: 70,
    },
  },
  {
    id: 57,
    name: 'Primeape',
    type: ['Fighting'],
    base: {
      HP: 65,
      Attack: 105,
      Defense: 60,
      SpAttack: 60,
      SpDefense: 70,
      Speed: 95,
    },
  },
  {
    id: 58,
    name: 'Growlithe',
    type: ['Fire'],
    base: {
      HP: 55,
      Attack: 70,
      Defense: 45,
      SpAttack: 70,
      SpDefense: 50,
      Speed: 60,
    },
  },
  {
    id: 59,
    name: 'Arcanine',
    type: ['Fire'],
    base: {
      HP: 90,
      Attack: 110,
      Defense: 80,
      SpAttack: 100,
      SpDefense: 80,
      Speed: 95,
    },
  },
  {
    id: 60,
    name: 'Poliwag',
    type: ['Water'],
    base: {
      HP: 40,
      Attack: 50,
      Defense: 40,
      SpAttack: 40,
      SpDefense: 40,
      Speed: 90,
    },
  },
  {
    id: 61,
    name: 'Poliwhirl',
    type: ['Water'],
    base: {
      HP: 65,
      Attack: 65,
      Defense: 65,
      SpAttack: 50,
      SpDefense: 50,
      Speed: 90,
    },
  },
  {
    id: 62,
    name: 'Poliwrath',
    type: ['Water', 'Fighting'],
    base: {
      HP: 90,
      Attack: 95,
      Defense: 95,
      SpAttack: 70,
      SpDefense: 90,
      Speed: 70,
    },
  },
  {
    id: 63,
    name: 'Abra',
    type: ['Psychic'],
    base: {
      HP: 25,
      Attack: 20,
      Defense: 15,
      SpAttack: 105,
      SpDefense: 55,
      Speed: 90,
    },
  },
  {
    id: 64,
    name: 'Kadabra',
    type: ['Psychic'],
    base: {
      HP: 40,
      Attack: 35,
      Defense: 30,
      SpAttack: 120,
      SpDefense: 70,
      Speed: 105,
    },
  },
  {
    id: 65,
    name: 'Alakazam',
    type: ['Psychic'],
    base: {
      HP: 55,
      Attack: 50,
      Defense: 45,
      SpAttack: 135,
      SpDefense: 95,
      Speed: 120,
    },
  },
  {
    id: 66,
    name: 'Machop',
    type: ['Fighting'],
    base: {
      HP: 70,
      Attack: 80,
      Defense: 50,
      SpAttack: 35,
      SpDefense: 35,
      Speed: 35,
    },
  },
  {
    id: 67,
    name: 'Machoke',
    type: ['Fighting'],
    base: {
      HP: 80,
      Attack: 100,
      Defense: 70,
      SpAttack: 50,
      SpDefense: 60,
      Speed: 45,
    },
  },
  {
    id: 68,
    name: 'Machamp',
    type: ['Fighting'],
    base: {
      HP: 90,
      Attack: 130,
      Defense: 80,
      SpAttack: 65,
      SpDefense: 85,
      Speed: 55,
    },
  },
  {
    id: 69,
    name: 'Bellsprout',
    type: ['Grass', 'Poison'],
    base: {
      HP: 50,
      Attack: 75,
      Defense: 35,
      SpAttack: 70,
      SpDefense: 30,
      Speed: 40,
    },
  },
  {
    id: 70,
    name: 'Weepinbell',
    type: ['Grass', 'Poison'],
    base: {
      HP: 65,
      Attack: 90,
      Defense: 50,
      SpAttack: 85,
      SpDefense: 45,
      Speed: 55,
    },
  },
  {
    id: 71,
    name: 'Victreebel',
    type: ['Grass', 'Poison'],
    base: {
      HP: 80,
      Attack: 105,
      Defense: 65,
      SpAttack: 100,
      SpDefense: 70,
      Speed: 70,
    },
  },
  {
    id: 72,
    name: 'Tentacool',
    type: ['Water', 'Poison'],
    base: {
      HP: 40,
      Attack: 40,
      Defense: 35,
      SpAttack: 50,
      SpDefense: 100,
      Speed: 70,
    },
  },
  {
    id: 73,
    name: 'Tentacruel',
    type: ['Water', 'Poison'],
    base: {
      HP: 80,
      Attack: 70,
      Defense: 65,
      SpAttack: 80,
      SpDefense: 120,
      Speed: 100,
    },
  },
  {
    id: 74,
    name: 'Geodude',
    type: ['Rock', 'Ground'],
    base: {
      HP: 40,
      Attack: 80,
      Defense: 100,
      SpAttack: 30,
      SpDefense: 30,
      Speed: 20,
    },
  },
  {
    id: 75,
    name: 'Graveler',
    type: ['Rock', 'Ground'],
    base: {
      HP: 55,
      Attack: 95,
      Defense: 115,
      SpAttack: 45,
      SpDefense: 45,
      Speed: 35,
    },
  },
  {
    id: 76,
    name: 'Golem',
    type: ['Rock', 'Ground'],
    base: {
      HP: 80,
      Attack: 120,
      Defense: 130,
      SpAttack: 55,
      SpDefense: 65,
      Speed: 45,
    },
  },
  {
    id: 77,
    name: 'Ponyta',
    type: ['Fire'],
    base: {
      HP: 50,
      Attack: 85,
      Defense: 55,
      SpAttack: 65,
      SpDefense: 65,
      Speed: 90,
    },
  },
  {
    id: 78,
    name: 'Rapidash',
    type: ['Fire'],
    base: {
      HP: 65,
      Attack: 100,
      Defense: 70,
      SpAttack: 80,
      SpDefense: 80,
      Speed: 105,
    },
  },
  {
    id: 79,
    name: 'Slowpoke',
    type: ['Water', 'Psychic'],
    base: {
      HP: 90,
      Attack: 65,
      Defense: 65,
      SpAttack: 40,
      SpDefense: 40,
      Speed: 15,
    },
  },
  {
    id: 80,
    name: 'Slowbro',
    type: ['Water', 'Psychic'],
    base: {
      HP: 95,
      Attack: 75,
      Defense: 110,
      SpAttack: 100,
      SpDefense: 80,
      Speed: 30,
    },
  },
  {
    id: 81,
    name: 'Magnemite',
    type: ['Electric', 'Steel'],
    base: {
      HP: 25,
      Attack: 35,
      Defense: 70,
      SpAttack: 95,
      SpDefense: 55,
      Speed: 45,
    },
  },
  {
    id: 82,
    name: 'Magneton',
    type: ['Electric', 'Steel'],
    base: {
      HP: 50,
      Attack: 60,
      Defense: 95,
      SpAttack: 120,
      SpDefense: 70,
      Speed: 70,
    },
  },
  {
    id: 83,
    name: "Farfetch'd",
    type: ['Normal', 'Flying'],
    base: {
      HP: 52,
      Attack: 90,
      Defense: 55,
      SpAttack: 58,
      SpDefense: 62,
      Speed: 60,
    },
  },
  {
    id: 84,
    name: 'Doduo',
    type: ['Normal', 'Flying'],
    base: {
      HP: 35,
      Attack: 85,
      Defense: 45,
      SpAttack: 35,
      SpDefense: 35,
      Speed: 75,
    },
  },
  {
    id: 85,
    name: 'Dodrio',
    type: ['Normal', 'Flying'],
    base: {
      HP: 60,
      Attack: 110,
      Defense: 70,
      SpAttack: 60,
      SpDefense: 60,
      Speed: 110,
    },
  },
  {
    id: 86,
    name: 'Seel',
    type: ['Water'],
    base: {
      HP: 65,
      Attack: 45,
      Defense: 55,
      SpAttack: 45,
      SpDefense: 70,
      Speed: 45,
    },
  },
  {
    id: 87,
    name: 'Dewgong',
    type: ['Water', 'Ice'],
    base: {
      HP: 90,
      Attack: 70,
      Defense: 80,
      SpAttack: 70,
      SpDefense: 95,
      Speed: 70,
    },
  },
  {
    id: 88,
    name: 'Grimer',
    type: ['Poison'],
    base: {
      HP: 80,
      Attack: 80,
      Defense: 50,
      SpAttack: 40,
      SpDefense: 50,
      Speed: 25,
    },
  },
  {
    id: 89,
    name: 'Muk',
    type: ['Poison'],
    base: {
      HP: 105,
      Attack: 105,
      Defense: 75,
      SpAttack: 65,
      SpDefense: 100,
      Speed: 50,
    },
  },
  {
    id: 90,
    name: 'Shellder',
    type: ['Water'],
    base: {
      HP: 30,
      Attack: 65,
      Defense: 100,
      SpAttack: 45,
      SpDefense: 25,
      Speed: 40,
    },
  },
  {
    id: 91,
    name: 'Cloyster',
    type: ['Water', 'Ice'],
    base: {
      HP: 50,
      Attack: 95,
      Defense: 180,
      SpAttack: 85,
      SpDefense: 45,
      Speed: 70,
    },
  },
  {
    id: 92,
    name: 'Gastly',
    type: ['Ghost', 'Poison'],
    base: {
      HP: 30,
      Attack: 35,
      Defense: 30,
      SpAttack: 100,
      SpDefense: 35,
      Speed: 80,
    },
  },
  {
    id: 93,
    name: 'Haunter',
    type: ['Ghost', 'Poison'],
    base: {
      HP: 45,
      Attack: 50,
      Defense: 45,
      SpAttack: 115,
      SpDefense: 55,
      Speed: 95,
    },
  },
  {
    id: 94,
    name: 'Gengar',
    type: ['Ghost', 'Poison'],
    base: {
      HP: 60,
      Attack: 65,
      Defense: 60,
      SpAttack: 130,
      SpDefense: 75,
      Speed: 110,
    },
  },
  {
    id: 95,
    name: 'Onix',
    type: ['Rock', 'Ground'],
    base: {
      HP: 35,
      Attack: 45,
      Defense: 160,
      SpAttack: 30,
      SpDefense: 45,
      Speed: 70,
    },
  },
  {
    id: 96,
    name: 'Drowzee',
    type: ['Psychic'],
    base: {
      HP: 60,
      Attack: 48,
      Defense: 45,
      SpAttack: 43,
      SpDefense: 90,
      Speed: 42,
    },
  },
  {
    id: 97,
    name: 'Hypno',
    type: ['Psychic'],
    base: {
      HP: 85,
      Attack: 73,
      Defense: 70,
      SpAttack: 73,
      SpDefense: 115,
      Speed: 67,
    },
  },
  {
    id: 98,
    name: 'Krabby',
    type: ['Water'],
    base: {
      HP: 30,
      Attack: 105,
      Defense: 90,
      SpAttack: 25,
      SpDefense: 25,
      Speed: 50,
    },
  },
  {
    id: 99,
    name: 'Kingler',
    type: ['Water'],
    base: {
      HP: 55,
      Attack: 130,
      Defense: 115,
      SpAttack: 50,
      SpDefense: 50,
      Speed: 75,
    },
  },
  {
    id: 100,
    name: 'Voltorb',
    type: ['Electric'],
    base: {
      HP: 40,
      Attack: 30,
      Defense: 50,
      SpAttack: 55,
      SpDefense: 55,
      Speed: 100,
    },
  },
  {
    id: 101,
    name: 'Electrode',
    type: ['Electric'],
    base: {
      HP: 60,
      Attack: 50,
      Defense: 70,
      SpAttack: 80,
      SpDefense: 80,
      Speed: 150,
    },
  },
  {
    id: 102,
    name: 'Exeggcute',
    type: ['Grass', 'Psychic'],
    base: {
      HP: 60,
      Attack: 40,
      Defense: 80,
      SpAttack: 60,
      SpDefense: 45,
      Speed: 40,
    },
  },
  {
    id: 103,
    name: 'Exeggutor',
    type: ['Grass', 'Psychic'],
    base: {
      HP: 95,
      Attack: 95,
      Defense: 85,
      SpAttack: 125,
      SpDefense: 75,
      Speed: 55,
    },
  },
  {
    id: 104,
    name: 'Cubone',
    type: ['Ground'],
    base: {
      HP: 50,
      Attack: 50,
      Defense: 95,
      SpAttack: 40,
      SpDefense: 50,
      Speed: 35,
    },
  },
  {
    id: 105,
    name: 'Marowak',
    type: ['Ground'],
    base: {
      HP: 60,
      Attack: 80,
      Defense: 110,
      SpAttack: 50,
      SpDefense: 80,
      Speed: 45,
    },
  },
  {
    id: 106,
    name: 'Hitmonlee',
    type: ['Fighting'],
    base: {
      HP: 50,
      Attack: 120,
      Defense: 53,
      SpAttack: 35,
      SpDefense: 110,
      Speed: 87,
    },
  },
  {
    id: 107,
    name: 'Hitmonchan',
    type: ['Fighting'],
    base: {
      HP: 50,
      Attack: 105,
      Defense: 79,
      SpAttack: 35,
      SpDefense: 110,
      Speed: 76,
    },
  },
  {
    id: 108,
    name: 'Lickitung',
    type: ['Normal'],
    base: {
      HP: 90,
      Attack: 55,
      Defense: 75,
      SpAttack: 60,
      SpDefense: 75,
      Speed: 30,
    },
  },
  {
    id: 109,
    name: 'Koffing',
    type: ['Poison'],
    base: {
      HP: 40,
      Attack: 65,
      Defense: 95,
      SpAttack: 60,
      SpDefense: 45,
      Speed: 35,
    },
  },
  {
    id: 110,
    name: 'Weezing',
    type: ['Poison'],
    base: {
      HP: 65,
      Attack: 90,
      Defense: 120,
      SpAttack: 85,
      SpDefense: 70,
      Speed: 60,
    },
  },
  {
    id: 111,
    name: 'Rhyhorn',
    type: ['Ground', 'Rock'],
    base: {
      HP: 80,
      Attack: 85,
      Defense: 95,
      SpAttack: 30,
      SpDefense: 30,
      Speed: 25,
    },
  },
  {
    id: 112,
    name: 'Rhydon',
    type: ['Ground', 'Rock'],
    base: {
      HP: 105,
      Attack: 130,
      Defense: 120,
      SpAttack: 45,
      SpDefense: 45,
      Speed: 40,
    },
  },
  {
    id: 113,
    name: 'Chansey',
    type: ['Normal'],
    base: {
      HP: 250,
      Attack: 5,
      Defense: 5,
      SpAttack: 35,
      SpDefense: 105,
      Speed: 50,
    },
  },
  {
    id: 114,
    name: 'Tangela',
    type: ['Grass'],
    base: {
      HP: 65,
      Attack: 55,
      Defense: 115,
      SpAttack: 100,
      SpDefense: 40,
      Speed: 60,
    },
  },
  {
    id: 115,
    name: 'Kangaskhan',
    type: ['Normal'],
    base: {
      HP: 105,
      Attack: 95,
      Defense: 80,
      SpAttack: 40,
      SpDefense: 80,
      Speed: 90,
    },
  },
  {
    id: 116,
    name: 'Horsea',
    type: ['Water'],
    base: {
      HP: 30,
      Attack: 40,
      Defense: 70,
      SpAttack: 70,
      SpDefense: 25,
      Speed: 60,
    },
  },
  {
    id: 117,
    name: 'Seadra',
    type: ['Water'],
    base: {
      HP: 55,
      Attack: 65,
      Defense: 95,
      SpAttack: 95,
      SpDefense: 45,
      Speed: 85,
    },
  },
  {
    id: 118,
    name: 'Goldeen',
    type: ['Water'],
    base: {
      HP: 45,
      Attack: 67,
      Defense: 60,
      SpAttack: 35,
      SpDefense: 50,
      Speed: 63,
    },
  },
  {
    id: 119,
    name: 'Seaking',
    type: ['Water'],
    base: {
      HP: 80,
      Attack: 92,
      Defense: 65,
      SpAttack: 65,
      SpDefense: 80,
      Speed: 68,
    },
  },
  {
    id: 120,
    name: 'Staryu',
    type: ['Water'],
    base: {
      HP: 30,
      Attack: 45,
      Defense: 55,
      SpAttack: 70,
      SpDefense: 55,
      Speed: 85,
    },
  },
  {
    id: 121,
    name: 'Starmie',
    type: ['Water', 'Psychic'],
    base: {
      HP: 60,
      Attack: 75,
      Defense: 85,
      SpAttack: 100,
      SpDefense: 85,
      Speed: 115,
    },
  },
  {
    id: 122,
    name: 'Mr. Mime',
    type: ['Psychic', 'Fairy'],
    base: {
      HP: 40,
      Attack: 45,
      Defense: 65,
      SpAttack: 100,
      SpDefense: 120,
      Speed: 90,
    },
  },
  {
    id: 123,
    name: 'Scyther',
    type: ['Bug', 'Flying'],
    base: {
      HP: 70,
      Attack: 110,
      Defense: 80,
      SpAttack: 55,
      SpDefense: 80,
      Speed: 105,
    },
  },
  {
    id: 124,
    name: 'Jynx',
    type: ['Ice', 'Psychic'],
    base: {
      HP: 65,
      Attack: 50,
      Defense: 35,
      SpAttack: 115,
      SpDefense: 95,
      Speed: 95,
    },
  },
  {
    id: 125,
    name: 'Electabuzz',
    type: ['Electric'],
    base: {
      HP: 65,
      Attack: 83,
      Defense: 57,
      SpAttack: 95,
      SpDefense: 85,
      Speed: 105,
    },
  },
  {
    id: 126,
    name: 'Magmar',
    type: ['Fire'],
    base: {
      HP: 65,
      Attack: 95,
      Defense: 57,
      SpAttack: 100,
      SpDefense: 85,
      Speed: 93,
    },
  },
  {
    id: 127,
    name: 'Pinsir',
    type: ['Bug'],
    base: {
      HP: 65,
      Attack: 125,
      Defense: 100,
      SpAttack: 55,
      SpDefense: 70,
      Speed: 85,
    },
  },
  {
    id: 128,
    name: 'Tauros',
    type: ['Normal'],
    base: {
      HP: 75,
      Attack: 100,
      Defense: 95,
      SpAttack: 40,
      SpDefense: 70,
      Speed: 110,
    },
  },
  {
    id: 129,
    name: 'Magikarp',
    type: ['Water'],
    base: {
      HP: 20,
      Attack: 10,
      Defense: 55,
      SpAttack: 15,
      SpDefense: 20,
      Speed: 80,
    },
  },
  {
    id: 130,
    name: 'Gyarados',
    type: ['Water', 'Flying'],
    base: {
      HP: 95,
      Attack: 125,
      Defense: 79,
      SpAttack: 60,
      SpDefense: 100,
      Speed: 81,
    },
  },
  {
    id: 131,
    name: 'Lapras',
    type: ['Water', 'Ice'],
    base: {
      HP: 130,
      Attack: 85,
      Defense: 80,
      SpAttack: 85,
      SpDefense: 95,
      Speed: 60,
    },
  },
  {
    id: 132,
    name: 'Ditto',
    type: ['Normal'],
    base: {
      HP: 48,
      Attack: 48,
      Defense: 48,
      SpAttack: 48,
      SpDefense: 48,
      Speed: 48,
    },
  },
  {
    id: 133,
    name: 'Eevee',
    type: ['Normal'],
    base: {
      HP: 55,
      Attack: 55,
      Defense: 50,
      SpAttack: 45,
      SpDefense: 65,
      Speed: 55,
    },
  },
  {
    id: 134,
    name: 'Vaporeon',
    type: ['Water'],
    base: {
      HP: 130,
      Attack: 65,
      Defense: 60,
      SpAttack: 110,
      SpDefense: 95,
      Speed: 65,
    },
  },
  {
    id: 135,
    name: 'Jolteon',
    type: ['Electric'],
    base: {
      HP: 65,
      Attack: 65,
      Defense: 60,
      SpAttack: 110,
      SpDefense: 95,
      Speed: 130,
    },
  },
  {
    id: 136,
    name: 'Flareon',
    type: ['Fire'],
    base: {
      HP: 65,
      Attack: 130,
      Defense: 60,
      SpAttack: 95,
      SpDefense: 110,
      Speed: 65,
    },
  },
  {
    id: 137,
    name: 'Porygon',
    type: ['Normal'],
    base: {
      HP: 65,
      Attack: 60,
      Defense: 70,
      SpAttack: 85,
      SpDefense: 75,
      Speed: 40,
    },
  },
  {
    id: 138,
    name: 'Omanyte',
    type: ['Rock', 'Water'],
    base: {
      HP: 35,
      Attack: 40,
      Defense: 100,
      SpAttack: 90,
      SpDefense: 55,
      Speed: 35,
    },
  },
  {
    id: 139,
    name: 'Omastar',
    type: ['Rock', 'Water'],
    base: {
      HP: 70,
      Attack: 60,
      Defense: 125,
      SpAttack: 115,
      SpDefense: 70,
      Speed: 55,
    },
  },
  {
    id: 140,
    name: 'Kabuto',
    type: ['Rock', 'Water'],
    base: {
      HP: 30,
      Attack: 80,
      Defense: 90,
      SpAttack: 55,
      SpDefense: 45,
      Speed: 55,
    },
  },
  {
    id: 141,
    name: 'Kabutops',
    type: ['Rock', 'Water'],
    base: {
      HP: 60,
      Attack: 115,
      Defense: 105,
      SpAttack: 65,
      SpDefense: 70,
      Speed: 80,
    },
  },
  {
    id: 142,
    name: 'Aerodactyl',
    type: ['Rock', 'Flying'],
    base: {
      HP: 80,
      Attack: 105,
      Defense: 65,
      SpAttack: 60,
      SpDefense: 75,
      Speed: 130,
    },
  },
  {
    id: 143,
    name: 'Snorlax',
    type: ['Normal'],
    base: {
      HP: 160,
      Attack: 110,
      Defense: 65,
      SpAttack: 65,
      SpDefense: 110,
      Speed: 30,
    },
  },
  {
    id: 144,
    name: 'Articuno',
    type: ['Ice', 'Flying'],
    base: {
      HP: 90,
      Attack: 85,
      Defense: 100,
      SpAttack: 95,
      SpDefense: 125,
      Speed: 85,
    },
  },
  {
    id: 145,
    name: 'Zapdos',
    type: ['Electric', 'Flying'],
    base: {
      HP: 90,
      Attack: 90,
      Defense: 85,
      SpAttack: 125,
      SpDefense: 90,
      Speed: 100,
    },
  },
  {
    id: 146,
    name: 'Moltres',
    type: ['Fire', 'Flying'],
    base: {
      HP: 90,
      Attack: 100,
      Defense: 90,
      SpAttack: 125,
      SpDefense: 85,
      Speed: 90,
    },
  },
  {
    id: 147,
    name: 'Dratini',
    type: ['Dragon'],
    base: {
      HP: 41,
      Attack: 64,
      Defense: 45,
      SpAttack: 50,
      SpDefense: 50,
      Speed: 50,
    },
  },
  {
    id: 148,
    name: 'Dragonair',
    type: ['Dragon'],
    base: {
      HP: 61,
      Attack: 84,
      Defense: 65,
      SpAttack: 70,
      SpDefense: 70,
      Speed: 70,
    },
  },
  {
    id: 149,
    name: 'Dragonite',
    type: ['Dragon', 'Flying'],
    base: {
      HP: 91,
      Attack: 134,
      Defense: 95,
      SpAttack: 100,
      SpDefense: 100,
      Speed: 80,
    },
  },
  {
    id: 150,
    name: 'Mewtwo',
    type: ['Psychic'],
    base: {
      HP: 106,
      Attack: 110,
      Defense: 90,
      SpAttack: 154,
      SpDefense: 90,
      Speed: 130,
    },
  },
  {
    id: 151,
    name: 'Mew',
    type: ['Psychic'],
    base: {
      HP: 100,
      Attack: 100,
      Defense: 100,
      SpAttack: 100,
      SpDefense: 100,
      Speed: 100,
    },
  },
]
