import { Verse, Chapter } from '@/types'; // Add Chapter type import

// Add mock getAllChapters function
export function getAllChapters(): Chapter[] {
  console.warn("getAllChapters is using mock data.");
  // Return a sample array of chapter objects. Adjust structure based on the actual Chapter type.
  return [
    { chapter_number: 1, name_translated: "Arjuna Vishada Yoga", verse_count: 47, slug: "1" },
    { chapter_number: 2, name_translated: "Sankhya Yoga", verse_count: 72, slug: "2" },
    { chapter_number: 3, name_translated: "Karma Yoga", verse_count: 43, slug: "3" },
    { chapter_number: 4, name_translated: "Jnana Karma Sanyasa Yoga", verse_count: 42, slug: "4" },
    { chapter_number: 5, name_translated: "Karma Sanyasa Yoga", verse_count: 29, slug: "5" },
    { chapter_number: 6, name_translated: "Dhyana Yoga", verse_count: 47, slug: "6" },
    // Add more mock chapters if needed for testing UI
  ];
}

// Get all topics (remains mock)
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
  ];
}

// Get all commentators (remains mock)
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
  ];
}

// Get curated playlists (remains mock)
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
  ];
}

// Add mock getDailyVerse function
export function getDailyVerse(mood?: string): Verse {
  console.warn("getDailyVerse is using mock data. Mood:", mood);
  // Return a sample verse object. Adjust structure based on the actual Verse type if needed.
  return {
    id: 101, // Example ID
    verse_number: 1,
    chapter_number: 1,
    text: "dhṛtarāṣṭra uvāca | dharmakṣetre kurukṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||1||",
    transliteration: "dhṛtarāṣṭra uvāca | dharmakṣetre kurukṣetre samavetā yuyutsavaḥ | māmakāḥ pāṇḍavāścaiva kimakurvata sañjaya ||1||",
    word_meanings: "dhṛtarāṣṭraḥ uvāca—King Dhṛtarāṣṭra said; dharma-kṣetre—in the place of pilgrimage; kuru-kṣetre—in the place named Kurukṣetra; samavetāḥ—assembled; yuyutsavaḥ—desiring to fight; māmakāḥ—my party (sons); pāṇḍavāḥ—the sons of Pāṇḍu; ca—and; eva—certainly; kim—what; akurvata—did they do; sañjaya—O Sañjaya.",
    translation: "Dhṛtarāṣṭra said: O Sañjaya, after my sons and the sons of Pāṇḍu assembled in the place of pilgrimage at Kurukṣetra, desiring to fight, what did they do?",
    commentary: "Bhagavad-gītā is the widely read theistic science summarized in the Gītā-māhātmya (Glorification of the Gītā). There it says that one should read Bhagavad-gītā very scrutinizingly with the help of a person who is a devotee of Śrī Kṛṣṇa and try to understand it without personally motivated interpretations.",
    slug: "1.1"
  };
}

// Ask Krishna AI query (mock implementation)
export function askKrishnaQuery(query: string) {
  console.warn("askKrishnaQuery is using mock data.");
  // In a real app, this would call an AI service
  return {
    answer:
      "The answers you seek are within you. Look inward with a peaceful mind, and practice karma yoga - action without attachment to results. Remember that I am always with you, guiding your path when you open your heart to divine wisdom.",
    relatedVerses: [
      { chapter: 2, verse: 47, title: "The Path of Selfless Action" }, // Title might need fetching or be removed
      { chapter: 6, verse: 10, title: "The Practice of Meditation" },
      { chapter: 4, verse: 42, title: "The Sword of Knowledge" },
    ],
  };
}
