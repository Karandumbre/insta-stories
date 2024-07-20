import React from "react";

function Story({ item, onClick }) {
  const isAllStoriesViewed = item.stories.every((story) => story.viewed);
  return (
    <>
      <div className="content" onClick={() => onClick(item.userId)}>
        <div
          className={`img-container  ${
            isAllStoriesViewed ? "viewed-story" : ""
          }`}
        >
          <img src={item.img} alt="story" />
        </div>
        <div className="text-container">{item.name}</div>
      </div>
    </>
  );
}

export default Story;
