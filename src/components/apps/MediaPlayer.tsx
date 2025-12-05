"use client";

import { useState, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Image as ImageIcon,
} from "lucide-react";
import { useOSStore } from "@/store/useOSStore";
import { cn } from "@/lib/utils";
import { PROJECTS } from "@/lib/constants";

interface MediaItem {
  id: string;
  title: string;
  type: "video" | "image";
  url: string;
  thumbnail?: string;
}

// Sample media playlist from projects
const MEDIA_PLAYLIST: MediaItem[] = [
  {
    id: "1",
    title: "Portfolio Demo",
    type: "image",
    url: "/demo-placeholder.jpg",
    thumbnail: "/demo-placeholder.jpg",
  },
  {
    id: "2",
    title: "Project Showcase",
    type: "image",
    url: "/project-placeholder.jpg",
    thumbnail: "/project-placeholder.jpg",
  },
  ...PROJECTS.slice(0, 3).map((project, idx) => ({
    id: `project-${idx}`,
    title: project.title,
    type: "image" as const,
    url: "/portfolio-preview.jpg",
    thumbnail: "/portfolio-preview.jpg",
  })),
];

export default function MediaPlayer() {
  const { isDarkMode } = useOSStore();
  const [currentMedia, setCurrentMedia] = useState<MediaItem>(MEDIA_PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (currentMedia.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handlePrevious = () => {
    const currentIndex = MEDIA_PLAYLIST.findIndex((m) => m.id === currentMedia.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : MEDIA_PLAYLIST.length - 1;
    setCurrentMedia(MEDIA_PLAYLIST[prevIndex]);
    setIsPlaying(false);
  };

  const handleNext = () => {
    const currentIndex = MEDIA_PLAYLIST.findIndex((m) => m.id === currentMedia.id);
    const nextIndex = currentIndex < MEDIA_PLAYLIST.length - 1 ? currentIndex + 1 : 0;
    setCurrentMedia(MEDIA_PLAYLIST[nextIndex]);
    setIsPlaying(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    if (videoRef.current) {
      videoRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div
      className={cn(
        "flex h-full",
        isDarkMode ? "bg-[#1a1a1a]" : "bg-gray-900"
      )}
    >
      {/* Playlist Sidebar */}
      <div
        className={cn(
          "w-64 border-r overflow-y-auto",
          isDarkMode ? "bg-[#121212] border-white/10" : "bg-gray-800 border-gray-700"
        )}
      >
        <div className="p-4">
          <h2
            className={cn(
              "text-lg font-semibold mb-4",
              isDarkMode ? "text-white" : "text-gray-100"
            )}
          >
            Playlist
          </h2>
          <div className="space-y-2">
            {MEDIA_PLAYLIST.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentMedia(item);
                  setIsPlaying(false);
                }}
                className={cn(
                  "w-full p-3 rounded-lg text-left transition-all group",
                  currentMedia.id === item.id
                    ? isDarkMode
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white"
                    : isDarkMode
                    ? "bg-white/5 hover:bg-white/10 text-white/80"
                    : "bg-gray-700 hover:bg-gray-600 text-gray-200"
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 rounded flex items-center justify-center flex-shrink-0",
                      currentMedia.id === item.id
                        ? "bg-white/20"
                        : isDarkMode
                        ? "bg-white/10"
                        : "bg-gray-600"
                    )}
                  >
                    {item.type === "video" ? (
                      <Play size={16} className="ml-0.5" />
                    ) : (
                      <ImageIcon size={16} />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p
                      className={cn(
                        "text-xs capitalize",
                        currentMedia.id === item.id
                          ? "text-white/70"
                          : isDarkMode
                          ? "text-white/50"
                          : "text-gray-400"
                      )}
                    >
                      {item.type}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Player */}
      <div className="flex-1 flex flex-col">
        {/* Media Display */}
        <div className="flex-1 flex items-center justify-center bg-black relative group">
          {currentMedia.type === "video" ? (
            <video
              ref={videoRef}
              src={currentMedia.url}
              className="max-w-full max-h-full"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="relative max-w-full max-h-full flex items-center justify-center">
              <div className="text-center">
                <ImageIcon size={64} className="mx-auto mb-4 text-white/30" />
                <p className="text-white/70 text-lg mb-2">{currentMedia.title}</p>
                <p className="text-white/50 text-sm">Image preview placeholder</p>
                <p className="text-white/40 text-xs mt-2">Add images to /public folder</p>
              </div>
            </div>
          )}

          {/* Glassmorphism overlay on hover */}
          <div
            className={cn(
              "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity",
              "bg-gradient-to-t from-black/60 via-transparent to-transparent",
              "pointer-events-none"
            )}
          />
        </div>

        {/* Controls */}
        <div
          className={cn(
            "p-4 border-t",
            isDarkMode ? "bg-[#202020] border-white/10" : "bg-gray-800 border-gray-700"
          )}
        >
          {/* Title */}
          <div className="mb-4">
            <h3
              className={cn(
                "text-lg font-semibold",
                isDarkMode ? "text-white" : "text-gray-100"
              )}
            >
              {currentMedia.title}
            </h3>
            <p
              className={cn(
                "text-sm capitalize",
                isDarkMode ? "text-white/50" : "text-gray-400"
              )}
            >
              {currentMedia.type}
            </p>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevious}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDarkMode
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-700 text-gray-100"
                )}
                aria-label="Previous"
              >
                <SkipBack size={20} />
              </button>

              {currentMedia.type === "video" && (
                <button
                  onClick={handlePlayPause}
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  )}
                  aria-label={isPlaying ? "Pause" : "Play"}
                >
                  {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-0.5" />}
                </button>
              )}

              <button
                onClick={handleNext}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDarkMode
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-700 text-gray-100"
                )}
                aria-label="Next"
              >
                <SkipForward size={20} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleMute}
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDarkMode
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-700 text-gray-100"
                )}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>

              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={cn(
                  "w-24 h-1 rounded-full appearance-none cursor-pointer",
                  isDarkMode ? "bg-white/20" : "bg-gray-600",
                  "[&::-webkit-slider-thumb]:appearance-none",
                  "[&::-webkit-slider-thumb]:w-3",
                  "[&::-webkit-slider-thumb]:h-3",
                  "[&::-webkit-slider-thumb]:rounded-full",
                  "[&::-webkit-slider-thumb]:bg-white",
                  "[&::-webkit-slider-thumb]:cursor-pointer"
                )}
              />

              <button
                className={cn(
                  "p-2 rounded-full transition-colors",
                  isDarkMode
                    ? "hover:bg-white/10 text-white"
                    : "hover:bg-gray-700 text-gray-100"
                )}
                aria-label="Fullscreen"
              >
                <Maximize2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


