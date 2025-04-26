// Define types for the app

// Updated Chapter interface based on JSON schema
export interface Chapter {
  chapter_number: number;
  verses_count: number;
  name: string; // Sanskrit name
  translation: string; // English translation of the name
  transliteration: string; // Transliteration of the name
  meaning: {
    en: string; // English meaning
    hi: string; // Hindi meaning
    [key: string]: string; // Allow other languages
  };
  summary: {
    en: string; // English summary
    hi: string; // Hindi summary
    [key: string]: string; // Allow other languages
  };
}

// Updated Verse interface based on JSON schema
export interface Verse {
  _id: string; // "chapter.verse" format
  chapter: number;
  verse: number;
  slok: string; // Original Sanskrit verse
  transliteration: string; // Transliteration of the Sanskrit verse
  // Commentaries - making them optional as not all might be present in every file
  tej?: { author: string; ht: string };
  siva?: { author: string; et: string; ec?: string }; // ec might be optional
  purohit?: { author: string; et: string };
  chinmay?: { author: string; hc: string };
  san?: { author: string; et: string };
  adi?: { author: string; et: string };
  gambir?: { author: string; et: string };
  madhav?: { author: string; sc: string };
  anand?: { author: string; sc: string };
  rams?: { author: string; ht: string; hc: string };
  raman?: { author: string; sc: string; et?: string }; // et might be optional
  abhinav?: { author: string; sc: string; et?: string }; // et might be optional
  sankar?: { author: string; ht?: string; sc?: string; et?: string }; // ht, sc, et might be optional
  jaya?: { author: string; sc: string };
  vallabh?: { author: string; sc: string };
  ms?: { author: string; sc: string };
  srid?: { author: string; sc: string };
  dhan?: { author: string; sc: string };
  venkat?: { author: string; sc: string };
  puru?: { author: string; sc: string };
  neel?: { author: string; sc: string };
  prabhu?: { author: string; et: string; ec: string };
}

export interface Topic {
  id: string
  name: string
  emoji: string
}

export interface Commentator {
  id: string
  name: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  trackCount: number
  duration: number
  premium: boolean
}
