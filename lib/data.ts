// Mock data for the Bhagavad Gita app

// Chapters data
export function getAllChapters() {
  return [
    {
      chapter_number: 1,
      name: "अर्जुनविषादयोग",
      name_transliterated: "Arjuna-Viṣāda-Yoga",
      name_translated: "Arjuna's Dilemma",
      verse_count: 47,
      summary: "Arjuna sees friends and relatives on the opposing army and loses his will to fight.",
    },
    {
      chapter_number: 2,
      name: "सांख्ययोग",
      name_transliterated: "Sāṅkhya-Yoga",
      name_translated: "Transcendental Knowledge",
      verse_count: 72,
      summary: "Krishna explains the difference between the temporary body and the eternal soul.",
    },
    {
      chapter_number: 3,
      name: "कर्मयोग",
      name_transliterated: "Karma-Yoga",
      name_translated: "Path of Selfless Service",
      verse_count: 43,
      summary: "Krishna explains the importance of doing one's duty without attachment to results.",
    },
    {
      chapter_number: 4,
      name: "ज्ञानकर्मसंन्यासयोग",
      name_transliterated: "Jñāna-Karma-Sanyāsa-Yoga",
      name_translated: "Path of Knowledge and Self-Realization",
      verse_count: 42,
      summary: "Krishna reveals the science of yoga and the transcendental nature of his appearance.",
    },
    {
      chapter_number: 5,
      name: "कर्मसंन्यासयोग",
      name_transliterated: "Karma-Sanyāsa-Yoga",
      name_translated: "Path of Renunciation",
      verse_count: 29,
      summary: "Krishna explains how renunciation in action leads to liberation.",
    },
    {
      chapter_number: 6,
      name: "आत्मसंयमयोग",
      name_transliterated: "Dhyāna-Yoga",
      name_translated: "Path of Meditation",
      verse_count: 47,
      summary: "Krishna explains the process of meditation and how to control the mind.",
    },
    {
      chapter_number: 7,
      name: "ज्ञानविज्ञानयोग",
      name_transliterated: "Jñāna-Vijñāna-Yoga",
      name_translated: "Knowledge and Realization",
      verse_count: 30,
      summary: "Krishna reveals his complete nature and how to know him fully.",
    },
    {
      chapter_number: 8,
      name: "अक्षरब्रह्मयोग",
      name_transliterated: "Akṣara-Brahma-Yoga",
      name_translated: "Path to the Eternal Brahman",
      verse_count: 28,
      summary: "Krishna explains how one can reach him at the time of death.",
    },
    {
      chapter_number: 9,
      name: "राजविद्याराजगुह्ययोग",
      name_transliterated: "Rāja-Vidyā-Rāja-Guhya-Yoga",
      name_translated: "Confidential Knowledge",
      verse_count: 34,
      summary: "Krishna reveals the most confidential knowledge about devotional service.",
    },
    {
      chapter_number: 10,
      name: "विभूतियोग",
      name_transliterated: "Vibhūti-Yoga",
      name_translated: "Divine Glories",
      verse_count: 42,
      summary: "Krishna describes his divine manifestations in the material world.",
    },
    {
      chapter_number: 11,
      name: "विश्वरूपदर्शनयोग",
      name_transliterated: "Viśvarūpa-Darśana-Yoga",
      name_translated: "Universal Form",
      verse_count: 55,
      summary: "Krishna reveals his universal form to Arjuna.",
    },
    {
      chapter_number: 12,
      name: "भक्तियोग",
      name_transliterated: "Bhakti-Yoga",
      name_translated: "Path of Devotion",
      verse_count: 20,
      summary: "Krishna explains the superiority of devotional service.",
    },
    {
      chapter_number: 13,
      name: "क्षेत्रक्षेत्रज्ञविभागयोग",
      name_transliterated: "Kṣetra-Kṣetrajña-Vibhāga-Yoga",
      name_translated: "Nature, Enjoyer, and Consciousness",
      verse_count: 35,
      summary: "Krishna explains the difference between the body and the knower of the body.",
    },
    {
      chapter_number: 14,
      name: "गुणत्रयविभागयोग",
      name_transliterated: "Guṇa-Traya-Vibhāga-Yoga",
      name_translated: "Three Modes of Material Nature",
      verse_count: 27,
      summary: "Krishna explains how the three modes of material nature affect the living entity.",
    },
    {
      chapter_number: 15,
      name: "पुरुषोत्तमयोग",
      name_transliterated: "Puruṣottama-Yoga",
      name_translated: "Supreme Person",
      verse_count: 20,
      summary: "Krishna explains his position as the supreme person above all else.",
    },
    {
      chapter_number: 16,
      name: "दैवासुरसम्पद्विभागयोग",
      name_transliterated: "Daivāsura-Sampad-Vibhāga-Yoga",
      name_translated: "Divine and Demonic Natures",
      verse_count: 24,
      summary: "Krishna explains the divine and demonic qualities in human beings.",
    },
    {
      chapter_number: 17,
      name: "श्रद्धात्रयविभागयोग",
      name_transliterated: "Śraddhā-Traya-Vibhāga-Yoga",
      name_translated: "Three Types of Faith",
      verse_count: 28,
      summary: "Krishna explains how faith determines the quality of one's actions.",
    },
    {
      chapter_number: 18,
      name: "मोक्षसंन्यासयोग",
      name_transliterated: "Mokṣa-Sanyāsa-Yoga",
      name_translated: "Final Liberation",
      verse_count: 78,
      summary: "Krishna summarizes the entire Gita and gives his final instructions to Arjuna.",
    },
  ]
}

// Get a specific chapter by ID
export function getChapterById(chapterId: number) {
  return getAllChapters().find((chapter) => chapter.chapter_number === chapterId)
}

// Mock verse data
export function getVerseById(chapterId: number, verseId: number) {
  // In a real app, this would fetch from your local JSON files
  return {
    id: `${chapterId}.${verseId}`,
    chapter: chapterId,
    verse: verseId,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन। मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    transliteration: "karmaṇy-evādhikāras te mā phaleṣhu kadāchana mā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi",
    translation:
      "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
    title: "The Path of Selfless Action",
    commentaries: {
      wisdom: [
        {
          author: "Adi Shankaracharya",
          text: "One should perform actions without attachment to results. This leads to liberation from the cycle of birth and death.",
        },
        {
          author: "Ramanuja",
          text: "The soul is eternal and distinct from the body. One should act according to one's duty without desire for fruits.",
        },
      ],
      bhakti: [
        {
          author: "Chaitanya Mahaprabhu",
          text: "All actions should be performed as an offering to Krishna with love and devotion.",
        },
      ],
      life: [
        {
          author: "Swami Vivekananda",
          text: "Work for work's sake, not for the reward. This is the highest form of action that leads to spiritual growth.",
        },
      ],
      work: [
        {
          author: "Modern Leadership",
          text: "Focus on the process, not the outcome. This principle leads to excellence in leadership and management.",
        },
      ],
    },
  }
}

// Get daily verse based on mood
export function getDailyVerse(mood: string) {
  // In a real app, this would select a verse based on the mood and user's reading history
  const moodVerses = {
    "🤔": { chapter: 2, verse: 47 }, // Confused - Karma Yoga verse
    "💪": { chapter: 3, verse: 30 }, // Motivated - Action verse
    "🧘": { chapter: 6, verse: 10 }, // Peaceful - Meditation verse
    "🧠": { chapter: 4, verse: 42 }, // Wisdom - Knowledge verse
  }

  const defaultVerse = { chapter: 2, verse: 47 }
  const selectedVerse = mood in moodVerses ? moodVerses[mood as keyof typeof moodVerses] : defaultVerse

  return {
    ...getVerseById(selectedVerse.chapter, selectedVerse.verse),
    chapter: selectedVerse.chapter,
    verse: selectedVerse.verse,
  }
}

// Get all topics
export function getAllTopics() {
  return [
    { id: "duty", name: "Duty", emoji: "⚖️" },
    { id: "knowledge", name: "Knowledge", emoji: "📚" },
    { id: "devotion", name: "Devotion", emoji: "🙏" },
    { id: "meditation", name: "Meditation", emoji: "🧘" },
    { id: "action", name: "Action", emoji: "⚡" },
    { id: "renunciation", name: "Renunciation", emoji: "🌱" },
    { id: "self", name: "Self", emoji: "🔍" },
    { id: "nature", name: "Nature", emoji: "🌿" },
    { id: "liberation", name: "Liberation", emoji: "✨" },
    { id: "work", name: "Work", emoji: "💼" },
  ]
}

// Get all commentators
export function getAllCommentators() {
  return [
    { id: "adi-shankara", name: "Adi Shankaracharya" },
    { id: "ramanuja", name: "Ramanuja" },
    { id: "madhva", name: "Madhva" },
    { id: "bhaktivedanta", name: "A.C. Bhaktivedanta Swami Prabhupada" },
    { id: "chinmayananda", name: "Swami Chinmayananda" },
    { id: "yogananda", name: "Paramahansa Yogananda" },
    { id: "aurobindo", name: "Sri Aurobindo" },
    { id: "vivekananda", name: "Swami Vivekananda" },
  ]
}

// Get curated playlists
export function getCuratedPlaylists() {
  return [
    {
      id: "morning-meditation",
      title: "Morning Meditation",
      description: "Start your day with these peaceful verses",
      trackCount: 7,
      duration: 15,
      premium: false,
    },
    {
      id: "karma-yoga",
      title: "Karma Yoga Essentials",
      description: "Key verses on the path of action",
      trackCount: 12,
      duration: 25,
      premium: false,
    },
    {
      id: "leadership-wisdom",
      title: "Leadership Wisdom",
      description: "Verses for modern leaders",
      trackCount: 9,
      duration: 20,
      premium: true,
    },
    {
      id: "bhakti-path",
      title: "Path of Devotion",
      description: "Essential verses on devotional service",
      trackCount: 10,
      duration: 22,
      premium: true,
    },
    {
      id: "self-knowledge",
      title: "Journey to Self-Knowledge",
      description: "Verses on understanding the true self",
      trackCount: 14,
      duration: 30,
      premium: true,
    },
  ]
}

// Search verses (mock implementation)
export function searchVerses(query: string, filters: any) {
  // In a real app, this would search through your local JSON files
  return [getVerseById(2, 47), getVerseById(3, 30), getVerseById(6, 10), getVerseById(4, 42)]
}

// Ask Krishna AI query (mock implementation)
export function askKrishnaQuery(query: string) {
  // In a real app, this would call an AI service
  return {
    answer:
      "The answers you seek are within you. Look inward with a peaceful mind, and practice karma yoga - action without attachment to results. Remember that I am always with you, guiding your path when you open your heart to divine wisdom.",
    relatedVerses: [
      { chapter: 2, verse: 47, title: "The Path of Selfless Action" },
      { chapter: 6, verse: 10, title: "The Practice of Meditation" },
      { chapter: 4, verse: 42, title: "The Sword of Knowledge" },
    ],
  }
}

export function getAllVerses() {
  const chapters = getAllChapters()
  const verses = []

  for (const chapter of chapters) {
    for (let i = 1; i <= chapter.verse_count; i++) {
      verses.push(getVerseById(chapter.chapter_number, i))
    }
  }

  return verses
}
