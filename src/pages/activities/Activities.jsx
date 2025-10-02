import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import activities from "../../data/activities.json";
import detail from "../../data/detail.json";

function Activities() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenDetail = (id) => {
    const itemDetail = detail.find((d) => d.id === id);
    setSelectedItem(itemDetail || null);
  };

  return (
    <section className="activities" id="activities">
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
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={3}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="list"
        >
          {activities.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="card">
                <div className="card-img">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="card-body">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
                <div className="overlay-content">
                  <h5>{item.title}</h5>
                  <p>{item.desc}</p>
                  <Link to={`/article/${item.id}`} className="detail-link">
                    More detail
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default Activities;
