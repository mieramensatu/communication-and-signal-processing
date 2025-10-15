// Activities.jsx — versi dengan tombol "Show More"

import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import activities from "../../data/activities.json";
import { isSamePerson } from "../../helper/nameMatcher";

function Activities({ activeResearcher = "all" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date"); // 'date' or 'title'
  const [visibleCount, setVisibleCount] = useState(9); // awal tampilkan 9 item

  // Filter & sort logic
  const filteredAndSortedActivities = useCallback(() => {
    let filtered = activities.filter((act) => {
      if (activeResearcher !== "all") {
        if (!Array.isArray(act.author) || act.author.length === 0) return false;
        return act.author.some((author) =>
          isSamePerson(author, activeResearcher)
        );
      }
      return true;
    });

    // Search
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (act) =>
          act.title.toLowerCase().includes(lowerSearch) ||
          (act.desc && act.desc.toLowerCase().includes(lowerSearch))
      );
    }

    // Sort
    if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "date") {
      filtered.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
    }

    return filtered;
  }, [activeResearcher, searchTerm, sortBy]);

  const allFiltered = filteredAndSortedActivities();
  const visibleActivities = allFiltered.slice(0, visibleCount);
  const hasMore = visibleCount < allFiltered.length;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 9); // tambah 9 item tiap klik
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) return truncated.slice(0, lastSpace) + "...";
    return truncated + "...";
  };

  return (
    <section className="activities" id="activities">
      <div className="container">
        <div className="text">
          <h4>Key Activities Include</h4>
          <h2>Explore Our Research Activities</h2>
          <p>
            Gain insights into our cutting-edge research, focused on advancing
            communication and signal processing technologies to shape the future
            of modern systems.
          </p>
        </div>

        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="clear-btn">
                ×
              </button>
            )}
          </div>

          <div className="sort-controls">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Sort by Date (Newest)</option>
              <option value="title">Sort by Title (A-Z)</option>
            </select>
          </div>
        </div>

        <div className="grid-container">
          {visibleActivities.length === 0 ? (
            <div className="no-results">
              <p>No research found for this filter.</p>
            </div>
          ) : (
            visibleActivities.map((item) => (
              <div key={item.id} className="card">
                <div className="card-img">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p>
                    {item.desc
                      ? truncateText(item.desc, 80)
                      : "No description available."}
                  </p>
                  <Link to={`/article/${item.id}`} className="detail-link">
                    More detail →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        {hasMore && (
          <div className="show-more-button">
            <button onClick={handleShowMore} className="btn-show-more">
              Show More Activities
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
