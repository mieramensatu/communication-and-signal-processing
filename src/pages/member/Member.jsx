import React from "react";
import membersData from "../../data/member.json";

function Member({ category }) {
  const data = membersData.member || {};

  const selectedCategory = category || "researcher";
  const selectedMembers =
    selectedCategory === "all"
      ? Object.values(data).flat()
      : data[selectedCategory] || [];

  return (
    <section className="member" id="member">
      <div className="container">
        <h4 className="title">Our Team</h4>
        <p className="description">
          {selectedCategory === "all" ? "All Members" : selectedCategory}
        </p>
        <p className="details">Our Team Member</p>

        <div className="grid">
          {selectedMembers.length > 0 ? (
            selectedMembers.map((member, idx) => (
              <div key={idx} className="card">
                <div className="image">
                  <img src={member.img} alt={member.name} />
                </div>
                <div className="info">
                  <h3>{member.name}</h3>
                  {member.scholar && (
                    <div className="socials">
                      <a href={member.scholar} target="_blank" rel="noreferrer">
                        Google Scholar
                      </a>
                    </div>
                  )}
                  {member.univ && <p className="univ">{member.univ}</p>}
                  {member.role && <p className="role">{member.role}</p>}
                </div>
              </div>
            ))
          ) : (
            <p>No members available.</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Member;
