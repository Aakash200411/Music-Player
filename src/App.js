import React, { useState, useRef, useEffect, useCallback } from "react";
import "./App.css"; 

const songsList = [
  { 
    name: "Channa Mereya", 
    artist: "Arijit Singh", 
    url: "/music/Channa Mereya - Lyric Video _ Ae Dil Hai Mushkil _ Karan Johar _ Ranbir _ Anushka _ Pritam _ Arijit.mp3", 
    image: "https://tse1.mm.bing.net/th?id=OIP.EE8ke3YkyzlkbjgarjNtbgHaHa&pid=Api&P=0&h=180"  
  },
  { 
    name: "Kajra Re", 
    artist: "Shankar-Ehsaan-Loy", 
    url: "/music/Kajra Re _ Full Song _ Bunty Aur Babli _ Aishwarya, Abhishek, Amitabh Bachchan _ Shankar-Ehsaan-Loy.mp3", 
    image: "https://tse1.mm.bing.net/th?id=OIP.DPKGR8kMTiskG9PBA3GFxAHaEU&pid=Api&P=0&h=180"
  },
  { 
    name: "ScoopWhoop 60 Years Of Bollywood", 
    artist: "ScoopWhoop", 
    url: "/music/ScoopWhoop  60 Years Of Bollywood.mp3", 
    image: "https://tse4.mm.bing.net/th?id=OIP.ICOBeg-mlEfDnOtiQFpi5AHaD4&pid=Api&P=0&h=180"
  },
  { 
    name: "Kuchh Toh Log Kahenge", 
    artist: "Kishore Kumar", 
    url: "/music/Kuchh Toh Log Kahenge Song _ 4K Ultra HD _ Rajesh Khanna _ Kishore Kumar _ Sharmila Tagore.mp3", 
    image: "https://tse4.mm.bing.net/th?id=OIP.5CcAHv2GxEdn6EGK29k7ewHaEK&pid=Api&P=0&h=180"
  },
  { 
    name: "Galliyan", 
    artist: "Ankit Tiwari", 
    url: "/music/Lyrical_ Galliyan Full Song with Lyrics _ Ek Villain _ Ankit Tiwari _ Sidharth Malhotra.mp3", 
    image: "https://tse3.mm.bing.net/th?id=OIP.8BLdP-nxgzGw0IXL8wClqgHaEK&pid=Api&P=0&h=180"
  },
  { 
    name: "Mere Samne Wali Khidki Mein", 
    artist: "Kishore Kumar", 
    url: "/music/Mere Samne Wali Khidki Mein - Padosan - Saira Banu, Sunil Dutt & Kishore Kumar - Old Hindi Songs.mp3", 
    image: "https://tse1.mm.bing.net/th?id=OIP._CLHzI5sc0oVFfrTt__r1wHaEK&pid=Api&P=0&h=180"
  },
];

function App() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const audioRef = useRef(null);

  const togglePlayPause = useCallback(() => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  const nextSong = () => {
    if (shuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * songsList.length));
    } else {
      setCurrentSongIndex((prev) => (prev + 1) % songsList.length);
    }
  };

  const prevSong = () => {
    if (shuffle) {
      setCurrentSongIndex(Math.floor(Math.random() * songsList.length));
    } else {
      setCurrentSongIndex((prev) => (prev - 1 + songsList.length) % songsList.length);
    }
  };

  const onTimeUpdate = () => {
    const current = audioRef.current.currentTime;
    const total = audioRef.current.duration;
    setCurrentTime(current);
    setDuration(total);
    setProgress((current / total) * 100);
  };

  const handleProgressChange = (e) => {
    const value = e.target.value;
    const total = audioRef.current.duration;
    audioRef.current.currentTime = (value / 100) * total;
    setProgress(value);
  };

  const selectSong = (index) => {
    setCurrentSongIndex(index);
  };

  const toggleShuffle = () => {
    setShuffle((prev) => !prev);
  };

  const toggleRepeat = () => {
    setRepeat((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const onSongEnd = () => {
    if (repeat) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      nextSong();
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = songsList[currentSongIndex].url;
    link.download = songsList[currentSongIndex].name + ".mp3";
    link.click();
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentSongIndex]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayPause]);

  const filteredSongs = songsList.filter((song) =>
    song.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-white to-blue-100 text-gray-900"} min-h-screen flex`}>
      
      {/* Sidebar */}
      <div className="w-1/4 p-6 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">🎶 Playlist</h2>
        <input
          type="text"
          placeholder="Search songs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <ul className="space-y-2">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song, index) => (
              <li
                key={index}
                onClick={() => selectSong(songsList.indexOf(song))}
                className={`p-2 rounded-md cursor-pointer ${songsList.indexOf(song) === currentSongIndex ? "bg-blue-500 text-white" : "hover:bg-blue-100 dark:hover:bg-gray-300"}`}
              >
                {song.name}
                <div className="text-sm text-gray-500 dark:text-gray-400">{song.artist}</div>
              </li>
            ))
          ) : (
            <li>No songs found!</li>
          )}
        </ul>
      </div>

      {/* Player Section */}
      <div className="w-3/4 flex flex-col justify-between relative">
        
        {/* Dark Mode Toggle */}
        <div className="absolute top-4 right-6">
          <button onClick={toggleDarkMode} className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* Song Details */}
        <div className="flex flex-col items-center justify-center mt-20">
          <img 
            src={songsList[currentSongIndex].image} 
            alt={songsList[currentSongIndex].name} 
            className="mb-10 w-80 h-80 rounded-full object-cover" 
          />
          <h1 className="text-4xl font-bold mb-2">{songsList[currentSongIndex].name}</h1>
          <h3 className="text-xl text-gray-600 dark:text-gray-300">{songsList[currentSongIndex].artist}</h3>

          <audio
            ref={audioRef}
            src={songsList[currentSongIndex].url}
            onTimeUpdate={onTimeUpdate}
            onEnded={onSongEnd}
          />
        </div>

        {/* Progress & Controls */}
        <div className="px-10 py-6">
          {/* Progress Bar */}
          <div className="flex items-center mb-4">
            <span className="text-sm">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={handleProgressChange}
              className="mx-4 w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer dark:bg-gray-600"
            />
            <span className="text-sm">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-6">
            <button onClick={() => audioRef.current.currentTime -= 5} className="control-btn">⏪ 5s</button>
            <button onClick={prevSong} className="control-btn">⏮ Prev</button>
            <button onClick={togglePlayPause} className="control-btn">
              {isPlaying ? "⏸ Pause" : "▶️ Play"}
            </button>
            <button onClick={nextSong} className="control-btn">Next ⏭</button>
            <button onClick={() => audioRef.current.currentTime += 5} className="control-btn">5s ⏩</button>
            <button onClick={toggleShuffle} className="control-btn">
              {shuffle ? "🔀 On" : "🔀 Off"}
            </button>
            <button onClick={toggleRepeat} className="control-btn">
              {repeat ? "🔂 On" : "🔂 Off"}
            </button>
            {/* Download Button */}
            <button onClick={handleDownload} className="control-btn">
              ⬇️ Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
