import React from "react";
import membersData from "../../data/member.json";

function Member({ category, onShowResearch }) {
  const data = membersData.member || {};

  const selectedCategory = category || "Researcher";
  const selectedMembers =
    selectedCategory === "all"
      ? Object.values(data).flat()
      : data[selectedCategory] || [];

  const handleShowResearch = (name) => {
    onShowResearch(name);
  };

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
                <div className="photo">
                  <img src={member.img} alt={member.name} />
                </div>

                <h3 className="name">{member.name}</h3>

                {member.role && <p className="role">{member.role}</p>}

                {member.scholar && (
                  <a
                    href={member.scholar.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="scholar"
                  >
                    Google Scholar
                  </a>
                )}

                <button
                  onClick={() => handleShowResearch(member.name)}
                  className="button"
                >
                  Show Research
                </button>
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
