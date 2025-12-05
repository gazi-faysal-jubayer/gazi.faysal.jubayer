"use client";

import { useState, useEffect, useRef } from "react";
import { Play, Pause, BookOpen, Loader2 } from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";

interface Surah {
  number: number;
  name: string;
  englishName: string;
  numberOfAyahs: number;
}

interface Ayah {
  number: number;
  text: string;
  numberInSurah: number;
}

interface MultiEditionAyah {
  number: number;
  arabic: string;
  bengali: string;
  english: string;
  numberInSurah: number;
}

interface SurahDetail {
  number: number;
  name: string;
  englishName: string;
  ayahs: MultiEditionAyah[];
}

const RECITERS = [
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary" },
  { id: "ar.minshawi", name: "Mohamed Siddiq El-Minshawi" },
];

export default function QuranApp() {
  const { isDarkMode } = useOSStore();
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [selectedSurah, setSelectedSurah] = useState<SurahDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Translation toggles
  const [showBengali, setShowBengali] = useState(true);
  const [showEnglish, setShowEnglish] = useState(true);
  
  // Audio state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAyah, setCurrentAyah] = useState<number | null>(null);
  const [selectedReciter, setSelectedReciter] = useState(RECITERS[0].id);
  

  // Load list of Surahs on mount
  useEffect(() => {
    fetch("https://api.alquran.cloud/v1/surah")
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setSurahs(data.data);
        }
      })
      .catch((err) => {
        console.error("Failed to load Surahs:", err);
        setError("Failed to load Quran data");
      });
  }, []);

  const loadSurah = async (surahNumber: number) => {
    setLoading(true);
    setError(null);
    setIsPlaying(false);
    setCurrentAyah(null);
    
    try {
      // Fetch multiple editions at once
      const response = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,bn.bengali,en.sahih`
      );
      const data = await response.json();

      if (data.code === 200 && data.data.length === 3) {
        const [arabicData, bengaliData, englishData] = data.data;
        
        // Combine all editions into MultiEditionAyah format
        const combinedAyahs: MultiEditionAyah[] = arabicData.ayahs.map((ayah: Ayah, index: number) => ({
          number: ayah.number,
          arabic: ayah.text,
          bengali: bengaliData.ayahs[index]?.text || "",
          english: englishData.ayahs[index]?.text || "",
          numberInSurah: ayah.numberInSurah,
        }));

        setSelectedSurah({
          number: arabicData.number,
          name: arabicData.name,
          englishName: arabicData.englishName,
          ayahs: combinedAyahs,
        });
      } else {
        setError("Failed to load Surah");
      }
    } catch (err) {
      console.error("Error loading Surah:", err);
      setError("Failed to load Surah");
    } finally {
      setLoading(false);
    }
  };

  const handleSurahClick = (surahNumber: number) => {
    loadSurah(surahNumber);
  };

  const playAyah = (ayahNumber: number) => {
    if (audioRef.current && selectedSurah) {
      const audioUrl = `https://cdn.islamic.network/quran/audio/128/${selectedReciter}/${ayahNumber}.mp3`;
      audioRef.current.src = audioUrl;
      audioRef.current.play();
      setIsPlaying(true);
      setCurrentAyah(ayahNumber);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setCurrentAyah(null);
    }
  };

  const toggleAyahAudio = (ayahNumber: number) => {
    if (currentAyah === ayahNumber && isPlaying) {
      stopAudio();
    } else {
      playAyah(ayahNumber);
    }
  };

  const handleAudioEnded = () => {
    if (selectedSurah && currentAyah) {
      const currentIndex = selectedSurah.ayahs.findIndex(a => a.number === currentAyah);
      if (currentIndex < selectedSurah.ayahs.length - 1) {
        // Play next ayah
        playAyah(selectedSurah.ayahs[currentIndex + 1].number);
      } else {
        stopAudio();
      }
    }
  };


  return (
    <div
      className={cn(
        "flex h-full",
        isDarkMode ? "bg-gradient-to-br from-teal-950 to-gray-900" : "bg-gradient-to-br from-teal-50 to-amber-50"
      )}
    >
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        onEnded={handleAudioEnded}
        onError={() => setIsPlaying(false)}
      />

      {/* Sidebar - List of Surahs */}
      <div
        className={cn(
          "w-72 border-r overflow-y-auto",
          isDarkMode
            ? "bg-black/20 backdrop-blur-sm border-white/10"
            : "bg-white/60 backdrop-blur-sm border-teal-200"
        )}
      >
        <div className="p-4 border-b border-current/10 sticky top-0 backdrop-blur-md z-10">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen
              size={24}
              className={isDarkMode ? "text-teal-400" : "text-teal-600"}
            />
            <h2
              className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-teal-300" : "text-teal-800"
              )}
            >
              Al-Quran
            </h2>
          </div>
          <p
            className={cn(
              "text-xs",
              isDarkMode ? "text-white/60" : "text-teal-700/70"
            )}
          >
            114 Surahs
          </p>
        </div>

        <div className="p-2">
          {surahs.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2
                className={cn(
                  "animate-spin",
                  isDarkMode ? "text-teal-400" : "text-teal-600"
                )}
                size={24}
              />
            </div>
          ) : (
            <div className="space-y-1">
              {surahs.map((surah) => (
                <button
                  key={surah.number}
                  onClick={() => handleSurahClick(surah.number)}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-all group",
                    selectedSurah?.number === surah.number
                      ? isDarkMode
                        ? "bg-teal-600/30 border border-teal-500/50"
                        : "bg-teal-100 border border-teal-300"
                      : isDarkMode
                      ? "hover:bg-white/5"
                      : "hover:bg-white/50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={cn(
                        "w-8 h-8 rounded flex items-center justify-center flex-shrink-0 text-xs font-bold",
                        selectedSurah?.number === surah.number
                          ? isDarkMode
                            ? "bg-teal-500 text-white"
                            : "bg-teal-600 text-white"
                          : isDarkMode
                          ? "bg-white/10 text-teal-400"
                          : "bg-teal-100 text-teal-700"
                      )}
                    >
                      {surah.number}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}
                      >
                        {surah.englishName}
                      </p>
                      <p
                        className={cn(
                          "text-lg font-arabic mt-0.5",
                          isDarkMode ? "text-teal-300" : "text-teal-700"
                        )}
                        dir="rtl"
                      >
                        {surah.name}
                      </p>
                      <p
                        className={cn(
                          "text-xs mt-1",
                          isDarkMode ? "text-white/50" : "text-gray-600"
                        )}
                      >
                        {surah.numberOfAyahs} Ayahs
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content - Surah Text */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2
              className={cn(
                "animate-spin",
                isDarkMode ? "text-teal-400" : "text-teal-600"
              )}
              size={32}
            />
          </div>
        ) : error ? (
          <div className="flex-1 flex items-center justify-center">
            <p className={cn("text-sm", isDarkMode ? "text-red-400" : "text-red-600")}>
              {error}
            </p>
          </div>
        ) : selectedSurah ? (
          <>
            {/* Header with controls */}
            <div
              className={cn(
                "p-6 border-b",
                isDarkMode
                  ? "bg-black/20 backdrop-blur-sm border-white/10"
                  : "bg-white/60 backdrop-blur-sm border-teal-200"
              )}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3
                    className={cn(
                      "text-2xl font-semibold",
                      isDarkMode ? "text-white" : "text-gray-900"
                    )}
                  >
                    {selectedSurah.englishName}
                  </h3>
                  <p
                    className={cn(
                      "text-3xl font-arabic mt-1",
                      isDarkMode ? "text-teal-300" : "text-teal-700"
                    )}
                    dir="rtl"
                  >
                    {selectedSurah.name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedReciter}
                    onChange={(e) => setSelectedReciter(e.target.value)}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm border outline-none",
                      isDarkMode
                        ? "bg-white/10 border-white/20 text-white"
                        : "bg-white border-teal-200 text-gray-900"
                    )}
                  >
                    {RECITERS.map((reciter) => (
                      <option key={reciter.id} value={reciter.id}>
                        {reciter.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Translation toggles */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showBengali}
                    onChange={(e) => setShowBengali(e.target.checked)}
                    className="rounded"
                  />
                  <span className={isDarkMode ? "text-white/80" : "text-gray-700"}>
                    Show Bengali
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEnglish}
                    onChange={(e) => setShowEnglish(e.target.checked)}
                    className="rounded"
                  />
                  <span className={isDarkMode ? "text-white/80" : "text-gray-700"}>
                    Show English
                  </span>
                </label>
                <span className={cn("text-xs", isDarkMode ? "text-white/60" : "text-gray-600")}>
                  {selectedSurah.ayahs.length} Ayahs
                </span>
              </div>
            </div>

            {/* Ayahs */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                {selectedSurah.ayahs.map((ayah) => (
                  <div
                    key={ayah.number}
                    className={cn(
                      "p-6 rounded-lg transition-all",
                      isDarkMode
                        ? "bg-white/5 hover:bg-white/10"
                        : "bg-white/70 hover:bg-white/90 shadow-sm",
                      currentAyah === ayah.number && "ring-2 ring-teal-500"
                    )}
                  >
                    {/* Arabic Text */}
                    <div className="mb-4">
                      <p
                        className={cn(
                          "text-2xl leading-loose text-right font-arabic",
                          isDarkMode ? "text-white" : "text-gray-900"
                        )}
                        dir="rtl"
                      >
                        {ayah.arabic}
                      </p>
                    </div>

                    {/* Bengali Translation */}
                    {showBengali && (
                      <div className="mb-3">
                        <p
                          className={cn(
                            "text-base leading-relaxed",
                            isDarkMode ? "text-teal-200" : "text-teal-800"
                          )}
                        >
                          <span className="font-semibold">বাংলা: </span>
                          {ayah.bengali}
                        </p>
                      </div>
                    )}

                    {/* English Translation */}
                    {showEnglish && (
                      <div className="mb-3">
                        <p
                          className={cn(
                            "text-base leading-relaxed",
                            isDarkMode ? "text-blue-200" : "text-blue-800"
                          )}
                        >
                          <span className="font-semibold">English: </span>
                          {ayah.english}
                        </p>
                      </div>
                    )}

                    {/* Ayah Controls */}
                    <div className="flex items-center justify-between pt-3 border-t border-current/10">
                      <div className="flex items-center gap-2">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium",
                            isDarkMode
                              ? "bg-teal-600/30 text-teal-300"
                              : "bg-teal-100 text-teal-700"
                          )}
                        >
                          {ayah.numberInSurah}
                        </span>
                        <button
                          onClick={() => toggleAyahAudio(ayah.number)}
                          className={cn(
                            "p-2 rounded-full transition-colors",
                            currentAyah === ayah.number && isPlaying
                              ? isDarkMode
                                ? "bg-teal-600 text-white"
                                : "bg-teal-500 text-white"
                              : isDarkMode
                              ? "bg-white/10 hover:bg-white/20 text-teal-400"
                              : "bg-teal-100 hover:bg-teal-200 text-teal-700"
                          )}
                          title="Play Ayah"
                        >
                          {currentAyah === ayah.number && isPlaying ? (
                            <Pause size={16} />
                          ) : (
                            <Play size={16} className="ml-0.5" />
                          )}
                        </button>
                      </div>
                      <span
                        className={cn(
                          "text-xs",
                          isDarkMode ? "text-white/40" : "text-gray-500"
                        )}
                      >
                        Ayah {ayah.number}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <BookOpen
                size={64}
                className={cn(
                  "mx-auto mb-4",
                  isDarkMode ? "text-teal-400/30" : "text-teal-600/30"
                )}
              />
              <p
                className={cn(
                  "text-lg font-medium",
                  isDarkMode ? "text-white/70" : "text-gray-700"
                )}
              >
                Select a Surah to begin
              </p>
              <p
                className={cn(
                  "text-sm mt-2",
                  isDarkMode ? "text-white/50" : "text-gray-600"
                )}
              >
                Choose from 114 Surahs
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
