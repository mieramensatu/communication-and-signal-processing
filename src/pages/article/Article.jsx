import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer"; 
import articleData from "../../data/detail.json";

function Article() {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id")) || 1;

  useEffect(() => {
    const found = articleData.find((item) => item.id === id);
    if (found) {
      setArticle(found);
    } else {
      setArticle(null);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="article-page">
        <Navbar />
        <div className="content text-center py-10">Loading...</div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="article-page">
        <Navbar />
        <div className="content text-center py-10">
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
      <div className="content max-w-4xl mx-auto px-4 py-8">
        {/* Meta Info */}
        <div className="article-meta flex flex-wrap gap-4 text-gray-600 mb-4">
          <span className="publish-date">Published {article.publishDate}</span>
          <span className="author">By {article.author}</span>
        </div>

        <h1 className="article-title text-3xl font-bold mb-6">{article.title}</h1>

        {/* Tags */}
        <div className="tags flex flex-wrap gap-2 mb-8">
          {article.tags.map((tag, index) => (
            <span
              key={index}
              className={`tag px-3 py-1 rounded-full text-sm font-medium ${
                tag.type === "disease"
                  ? "bg-red-100 text-red-800"
                  : tag.type === "variable"
                  ? "bg-blue-100 text-blue-800"
                  : tag.type === "field"
                  ? "bg-green-100 text-green-800"
                  : tag.type === "algorithm"
                  ? "bg-purple-100 text-purple-800"
                  : tag.type === "goal"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {tag.text}
            </span>
          ))}
        </div>

        {/* Featured Image */}
        <div className="featured-image-wrapper mb-8">
          <img
            src={article.image}
            alt="Article illustration"
            className="featured-image w-full h-auto rounded-lg shadow-md"
          />
        </div>

        {/* Sections */}
        {article.sections.map((section, index) => (
          <section key={index} className="article-section mb-8">
            <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
            <p className="mb-4">{section.content}</p>
            {section.list && (
              <ul className="list-disc pl-6 space-y-1">
                {section.list.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {section.quote && (
              <blockquote className="article-quote border-l-4 border-blue-500 pl-4 italic text-gray-700 my-4">
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