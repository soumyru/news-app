import React from "react";

const NewsItem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source } = props; //obtaining the LHS as props from News component
  return (
    <>
      <div className="card" style={{ width: "18rem"}}>
      {/* <img
          src="https://www.axios.com/2024/05/07/charted-bird-flu-transmission"
          className="card-img-top"
          alt="..."
        /> */} 

        {/*Instead of hard coding src link for each and every news card, we will send the image url in a variable names imageUrl
        Like below...*/}

        <img
          src={
            !imageUrl
              ? "https://static.vecteezy.com/system/resources/thumbnails/006/299/370/original/world-breaking-news-digital-earth-hud-rotating-globe-rotating-free-video.jpg"
              : imageUrl
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <span
            className="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
            style={{ left: "9%", zIndex: "1" }}
          >
            {source}
            <span className="visually-hidden">unread messages</span>
          </span>
          <p className="card-text">{description}...</p>
          <p className="card-text">
            <small className="text-muted">
              By {!author ? "unknown" : author} on{" "}
              {new Date(date).toGMTString()}
            </small>
          </p>
          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </>
  );
};

export default NewsItem;
