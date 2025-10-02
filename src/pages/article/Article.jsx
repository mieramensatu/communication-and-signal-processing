// src/pages/Article.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import detail from "../../data/detail.json";

function Article() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id")) || 1;

  useEffect(() => {
    const found = detail.find((item) => item.id === id);
    setArticle(found || null);
    setLoading(false);
  }, [id]);

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

        <div className="tags">
          {article.tags.map((tag, index) => (
            <span key={index} className={`tag ${tag.type}`}>
              {tag.text}
            </span>
          ))}
        </div>

        <div className="featured-image-wrapper">
          <img src={article.image} alt={article.title} className="featured-image" />
        </div>

        {/* Sections */}
        {article.sections.map((section, index) => (
          <section key={index} className="article-section">
            <h2>{section.heading}</h2>
            <div
              className="article-content"
              dangerouslySetInnerHTML={{
                __html: section.content
                  .replace(/\n\n/g, "</p><p>")
                  .replace(/\n/g, "<br />")
                  .replace(/•\s(.+?)(?=\n|$)/g, "<li>$1</li>")
                  .replace(/(<li>.+?<\/li>)/gs, "<ul>$1</ul>")
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
      </div>
      <Footer />
    </div>
  );
}

export default Article;