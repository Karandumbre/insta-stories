import React from "react";

function Story({ item, onClick }) {
  return (
    <>
      <div className="content" onClick={() => onClick(item.userId)}>
        <div className="img-container">
          <img src={item.img} alt="story" />
        </div>
        <div className="text-container">{item.name}</div>
      </div>
    </>
  );
}

export default Story;
