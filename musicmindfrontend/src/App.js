import "./App.css";
import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/search_song/?query=${encodeURIComponent(searchQuery)}`
      );
      const data = await response.json();
      console.log("API returned:", data);
      setSongs(Array.isArray(data.songs) ? data.songs : []);
    } catch (error) {
      console.error("Error fetching songs:", error);
      setSongs([]);
    }
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo"><strong>MusicMind</strong></div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Search</a>
          <a href="#">Favourites</a>
          <input type="text" placeholder="Search in site" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h2>Discover Songs & Share Your Reviews</h2>
          <p>Search for songs and share your thoughts with the community</p>
          <input
            type="text"
            placeholder="Search for a song or artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <div className="hero-image"></div>
      </section>

      {/* Recommended Songs */}
      <section className="recommended">
        <h2>Recommended Songs</h2>
        <div className="song-list">
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <div key={index} className="song-card">
                <img
                  src={song.image || "https://via.placeholder.com/100"}
                  alt={song.track_name}
                />
                <h4>{song.track_name}</h4>
                <p>{song.artist}</p>
                <strong>{song.album}</strong>
              </div>
            ))
          ) : (
            [1, 2, 3].map((n) => (
              <div key={n} className="song-card">
                <img src="https://via.placeholder.com/100" alt="Music" />
                <h4>Song Title</h4>
                <p>Artist</p>
                <strong>Album</strong>
              </div>
            ))
          )}
        </div>
      </section>

      {/* User Section */}
      <section className="user-section">
        <div className="user-info">
          <div className="user-circle"></div>
          <div>
            <h4>Username</h4>
            <small>Music Enthusiast</small>
            <p>Sign up or log in to save your favorite music.</p>
          </div>
        </div>
        <div className="auth-buttons">
          <button>Log In</button>
          <button className="signup">Sign Up</button>
        </div>
      </section>

      {/* Footer */}
      <footer>© 2025 MusicMind. All Rights Reserved</footer>
    </div>
  );
}

export default App;
