import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import detail from "../../data/detail.json";
import { marked } from "marked";
import { getLenis } from "../../helper/SmoothScroll";

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

  useEffect(() => {
    if (!loading && article) {
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [loading, article]);
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

  const truncateAuthor = (author, maxLength = 60) => {
    if (!author) return "";
    return author.length > maxLength
      ? author.slice(0, maxLength) + "..."
      : author;
  };

  return (
    <div className="article-page">
      <Navbar />
      <div className="content">
        <div className="article-meta">
          <span className="publish-date">Published {article.publishDate}</span>
          <div className="author-wrapper">
            <span className="author-label">By</span>
            <span
              className="author-list"
              title={article.author || "Unknown author"}
            >
              {truncateAuthor(article.author)}
            </span>
          </div>
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
                __html: marked.parse(section.content.replace(/^•/gm, "-")),
              }}
            />
            {section.quote && (
              <blockquote className="article-quote">
                “{section.quote}”
              </blockquote>
            )}
          </section>
        ))}

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
