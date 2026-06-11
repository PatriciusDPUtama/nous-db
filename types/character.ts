import { Element } from "./element";
import { Path } from "./path";

export type Character = {
  id: string;
  name: string;
  rarity: number;
  element: Element;
  path: Path;
  image: string;
  splashart: string;
  icon: string;
  energy: number;
  promotion: CharacterPromotion;
  skills: CharacterSkill[];
};

export type CharacterStatValue = {
  base: number;
  step: number;
};

export type CharacterStats = {
  hp: CharacterStatValue;
  atk: CharacterStatValue;
  def: CharacterStatValue;
  spd: CharacterStatValue;
  taunt: CharacterStatValue;
  crit_rate: CharacterStatValue;
  crit_dmg: CharacterStatValue;
};

export type CharacterMaterial = {
  id: string;
  num: number;
};

export type CharacterPromotion = {
  character_id: string;
  values: CharacterStats[];
  materials: CharacterMaterial[][];
};

export type CharacterSkill = {
  id: string;
  name: string;
  max_level: number;
  type: string;
  type_text: string;
  effect: string;
  effect_text: string;
  simple_desc: string;
  desc: string;
  params: number[][];
  icon: string;
};

//Character Lore and Descrition
export const CharacterLore: Record<
  string,
  {
    name: string;
    description: string;
    story: string;
  }
> = {
  //Astral Express
  "1001": {
    name: "March 7th",
    description:
      "A girl who once slumbered in eternal ice and knows nothing about her past. To find out the truth about her origins, she decided to travel with the Astral Express. As of right now, she has prepared about 67 different versions of her life story for herself.",
    story: "",
  },
  "1002": {
    name: "Dan Heng",
    description: "",
    story: "",
  },
  "1003": {
    name: "Himeko",
    description: "",
    story: "",
  },
  "1004": {
    name: "Welt",
    description: "",
    story: "",
  },
  "1213": {
    name: "Dan Heng • Imbibitor Lunae",
    description: "",
    story: "",
  },
  "1224": {
    name: "March 7th",
    description: "",
    story: "",
  },
  "1413": {
    name: "Evernight",
    description: "",
    story: "",
  },
  "1414": {
    name: "Dan Heng • Permansor Terrae",
    description: "",
    story: "",
  },

  //Herta Space Station
  "1008": { name: "Arlan", description: "", story: "" },
  "1009": { name: "Asta", description: "", story: "" },
  "1013": { name: "Herta", description: "", story: "" },

  //Genius Society
  "1303": { name: "Ruan Mei", description: "", story: "" },
  "1305": { name: "Dr. Ratio", description: "", story: "" },
  "1401": { name: "The Herta", description: "", story: "" },

  //Fate Collab
  "1014": { name: "Saber", description: "", story: "" },
  "1015": { name: "Archer", description: "", story: "" },

  //Belobog
  "1101": { name: "Bronya", description: "", story: "" },
  "1102": { name: "Seele", description: "", story: "" },
  "1103": { name: "Serval", description: "", story: "" },
  "1104": { name: "Gepard", description: "", story: "" },
  "1105": { name: "Natasha", description: "", story: "" },
  "1106": { name: "Pela", description: "", story: "" },
  "1107": { name: "Clara", description: "", story: "" },
  "1108": { name: "Sampo", description: "", story: "" },
  "1109": { name: "Hook", description: "", story: "" },
  "1110": { name: "Lynx", description: "", story: "" },
  "1111": { name: "Luka", description: "", story: "" },

  //Knights of Beuty
  "1302": { name: "Argenti", description: "", story: "" },

  //Galaxy Hunters
  "1315": { name: "Boothill", description: "", story: "" },
  "1317": { name: "Rappa", description: "", story: "" },

  //IPC
  "1112": { name: "Topaz & Numby", description: "", story: "" },
  "1304": { name: "Aventurine", description: "", story: "" },
  "1314": { name: "Jade", description: "", story: "" },

  //Xianzhou Luofu
  "1201": { name: "Qingque", description: "", story: "" },
  "1202": { name: "Tingyun", description: "", story: "" },
  "1203": { name: "Luocha", description: "", story: "" },
  "1204": { name: "Jing Yuan", description: "", story: "" },
  "1206": { name: "Sushang", description: "", story: "" },
  "1207": { name: "Yukong", description: "", story: "" },
  "1208": { name: "Fu Xuan", description: "", story: "" },
  "1209": { name: "Yanqing", description: "", story: "" },
  "1210": { name: "Guinaifen", description: "", story: "" },
  "1211": { name: "Bailu", description: "", story: "" },
  "1212": { name: "Jingliu", description: "", story: "" },
  "1214": { name: "Xueyi", description: "", story: "" },
  "1215": { name: "Hanya", description: "", story: "" },
  "1217": { name: "Huohuo", description: "", story: "" },
  "1218": { name: "Jiaoqiu", description: "", story: "" },
  "1220": { name: "Feixiao", description: "", story: "" },
  "1221": { name: "Yunli", description: "", story: "" },
  "1222": { name: "Lingsha", description: "", story: "" },
  "1223": { name: "Moze", description: "", story: "" },
  "1225": { name: "Fugue", description: "", story: "" },

  //Penacony
  "1301": { name: "Gallagher", description: "", story: "" },
  "1306": { name: "Sparkle", description: "", story: "" },
  "1307": { name: "Black Swan", description: "", story: "" },
  "1308": { name: "Acheron", description: "", story: "" },
  "1309": { name: "Robin", description: "", story: "" },
  "1312": { name: "Misha", description: "", story: "" },
  "1313": { name: "Sunday", description: "", story: "" },

  //Annihilation Gang
  "1321": { name: "The Dahlia", description: "", story: "" },

  //Amphoreus
  "1402": { name: "Aglaea", description: "", story: "" },
  "1403": { name: "Tribbie", description: "", story: "" },
  "1404": { name: "Mydei", description: "", story: "" },
  "1405": { name: "Anaxa", description: "", story: "" },
  "1406": { name: "Cipher", description: "", story: "" },
  "1407": { name: "Castorice", description: "", story: "" },
  "1408": { name: "Phainon", description: "", story: "" },
  "1409": { name: "Hyacine", description: "", story: "" },
  "1410": { name: "Hysilens", description: "", story: "" },
  "1412": { name: "Cerydra", description: "", story: "" },
  "1415": { name: "Cyrene", description: "", story: "" },

  //Stellaron Hunter
  "1005": { name: "Kafka", description: "", story: "" },
  "1006": { name: "Silver Wolf", description: "", story: "" },
  "1205": { name: "Blade", description: "", story: "" },
  "1310": { name: "Firefly", description: "", story: "" },
  "1506": { name: "Silver Wolf LV.999", description: "", story: "" },
  "1507": { name: "Mortenax Blade", description: "", story: "" },

  //Planarcardia
  "1501": { name: "Sparxie", description: "", story: "" },
  "1502": { name: "Yao Guang", description: "", story: "" },
  "1504": { name: "Ashveil", description: "", story: "" },
  "1505": { name: "Evanescia", description: "", story: "" },

  //Trailblazer
  "8001": { name: "{NICKNAME} Destruction", description: "", story: "" },
  "8002": { name: "{NICKNAME} Destruciton", description: "", story: "" },
  "8003": { name: "{NICKNAME} Preservation", description: "", story: "" },
  "8004": { name: "{NICKNAME} Preservation", description: "", story: "" },
  "8005": { name: "{NICKNAME} Harmony", description: "", story: "" },
  "8006": { name: "{NICKNAME} Harmony", description: "", story: "" },
  "8007": { name: "{NICKNAME} Remembrance", description: "", story: "" },
  "8008": { name: "{NICKNAME} Remembrance", description: "", story: "" },
  "8009": { name: "{NICKNAME} Elation", description: "", story: "" },
  "8010": { name: "{NICKNAME} Elation", description: "", story: "" },
};
