"use client";

import { useState } from "react"; // Added this for saving data
import UrlInput from "@/componets/UrlInput"; // Import the URL input component
import { fetchAndSaveTranscript } from "@/services/api"; 
import { VideoData } from "@/types/video"; // Import your type interface

export default function Home() {
  // 1. Setup the "State" (The memory of your app)
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFetchVideo = async (url: string) => {
    setLoading(true);
    try {
      console.log("Fetching video for:", url);
      
      const videoId = url.split('v=')[1]?.split('&')[0];
      
      if (!videoId) {
        alert("Please enter a valid YouTube URL");
        return;
      }

      // 2. Call backend and SAVE the result to state
      const data = await fetchAndSaveTranscript(videoId);
      
      setVideoData(data); // This "saves" it so we can use it below
      console.log("Saved to state:", data);
      
    } catch (error) {
      console.error("Error fetching video:", error);
      alert("Failed to fetch video. Is your backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-slate-900 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-400">
          Seeker: Video Transcript Search
        </h1>
        
        <div className="flex justify-center w-full">
          <UrlInput onFetch={handleFetchVideo} />
        </div>

        {/* 3. Conditional Rendering: Show status or video info */}
        <div className="mt-10 text-center">
          {loading && <p className="text-yellow-400 animate-pulse">Analyzing Video... Please wait.</p>}
          
          {videoData && (
            <div className="p-6 bg-slate-800 rounded-xl border border-blue-500/30">
              <h2 className="text-xl font-bold text-white">Ready to Search: {videoData.title}</h2>
              <p className="text-green-400 text-sm mt-2">✅ Transcript Loaded ({videoData.transcript.length} lines)</p>
            </div>
          )}

          {!videoData && !loading && (
            <p className="text-slate-500">Paste a link to start searching through timestamps.</p>
          )}
        </div>
      </div>
    </main>
  );
}