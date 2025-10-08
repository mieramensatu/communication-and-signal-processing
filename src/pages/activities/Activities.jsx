// src/components/Activities.jsx
import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import activities from "../../data/activities.json";
import membersData from "../../data/member.json";

function Activities({ activeResearcher = "all", onFilterChange = () => {} }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (activeResearcher && activeResearcher !== "all" && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeResearcher]);

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text;
    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");
    if (lastSpace > 0) {
      return truncated.slice(0, lastSpace) + "...";
    }
    return truncated + "...";
  };

  const filteredActivities = activities.filter((act) => {
    if (activeResearcher === "all") return true;
    if (!act.author || typeof act.author !== "string") return false;
    return act.author.toLowerCase().includes(activeResearcher.toLowerCase());
  });

  return (
    <section className="activities" id="activities" ref={sectionRef}>
      <div className="container">
        <div className="text">
          <div className="title">
            <h4>Key Activities Include</h4>
          </div>
          <div className="description">
            <p>Explore Our Research Activities</p>
          </div>
          <div className="details">
            <p>
              Gain insights into our cutting-edge research, focused on advancing
              communication and signal processing technologies to shape the
              future of modern systems.
            </p>
          </div>
        </div>

        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="list"
        >
          {filteredActivities.length > 0 ? (
            filteredActivities.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="card">
                  <div className="card-img">
                    <img src={item.img} alt={item.title} />
                  </div>
                  <div className="card-body">
                    <h5>{item.title}</h5>
                    <p>
                      {item.desc
                        ? truncateText(item.desc, 80)
                        : "No description available."}
                    </p>
                  </div>
                  <div className="overlay-content">
                    <h5>{item.title}</h5>
                    <p>{item.desc || "No detailed content available."}</p>
                    <Link to={`/article/${item.id}`} className="detail-link">
                      More detail
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div style={{ textAlign: "center", padding: "50px" }}>
                <p>No research found for this filter.</p>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default Activities;
