import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import detail from "../../data/detail.json";

function Article() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const intId = parseInt(id) || 1;

  useEffect(() => {
    const found = detail.find((item) => item.id === intId);
    setArticle(found || null);
    setLoading(false);
  }, [intId]);

  if (loading) {
    return (
      <div className="article-page">
        <Navbar />
        <div className="content">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page">
        <Navbar />
        <div className="content">
          <h1>Article Not Found</h1>
          <p>The article you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="article-page">
      <Navbar />
      <div className="content">
        <div className="article-meta">
          <span className="publish-date">Published {article.publishDate}</span>
          <span className="author">By {article.author}</span>
        </div>

        <h1 className="article-title">{article.title}</h1>

        <div className="featured-image-wrapper">
          <img
            src={article.image}
            alt={article.title}
            className="featured-image"
          />
        </div>

        {article.sections.map((section, index) => (
          <section key={index} className="article-section">
            <h2>{section.heading}</h2>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: section.content
                  .replace(/\n{2,}/g, "</p><p>")
                  .replace(/(?:•\s[^\n]+\n?)+/g, (match) => {
                    const items = match
                      .trim()
                      .split("\n")
                      .filter((line) => line.trim().startsWith("•"))
                      .map((line) => `<li>${line.replace(/^•\s*/, "")}</li>`)
                      .join("");
                    return `<ul>${items}</ul>`;
                  })
                  .replace(/^/, "<p>")
                  .replace(/$/, "</p>"),
              }}
            />
            {section.quote && (
              <blockquote className="article-quote">
                "{section.quote}"
              </blockquote>
            )}
          </section>
        ))}

        {/* Footer Scholar Link (Optional) */}
        {article.scholarLink && (
          <div className="article-footer">
            <a
              href={article.scholarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="scholar-footer-link"
            >
              📚 View full citation on Google Scholar
            </a>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Article;
