import { useState, useEffect } from "react";
import Story from "./story";
import "./story.css";
import { data as initialData } from "constants/data";
import StoryModal from "./story-modal";

function Stories() {
  const [storyModal, setStoryModal] = useState(false);
  const [storyData, setStoryData] = useState({ stories: [] });
  const [data, setData] = useState(initialData);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const onStoryClick = (userId) => {
    setStoryModal(true);
    const current = data.find((item) => item.userId === userId);
    setStoryData(current);
  };

  const handleNextUser = () => {
    const currentIndex = data.findIndex(
      (item) => item.userId === storyData.userId
    );
    if (currentIndex < data.length - 1) {
      const nextUser = data
        .slice(currentIndex + 1)
        .find((item) => item.stories.some((story) => !story.viewed));
      if (nextUser) {
        setStoryData(nextUser);
        setStoryModal(true);
      } else {
        setStoryModal(false);
      }
    } else {
      setStoryModal(false);
    }
  };

  const handleClose = () => {
    setStoryModal(false);
    const sortedData = [...data].sort((a, b) => {
      const aUnviewedCount = a.stories.filter((story) => !story.viewed).length;
      const bUnviewedCount = b.stories.filter((story) => !story.viewed).length;
      if (aUnviewedCount === 0 && bUnviewedCount === 0) {
        return b.timestamp - a.timestamp;
      }
      return bUnviewedCount - aUnviewedCount;
    });
    setData(sortedData);
  };

  useEffect(() => {
    if (!storyModal) {
      handleClose();
    }
  }, [storyModal]);

  return (
    <div className="container">
      <div className="story-container">
        {data.map((item, index) => (
          <Story item={item} key={index} onClick={onStoryClick} />
        ))}
      </div>
      <StoryModal
        open={storyModal}
        onClose={handleClose}
        data={storyData}
        onNextUser={handleNextUser}
        setCurrentStoryIndex={setCurrentStoryIndex}
        currentStoryIndex={currentStoryIndex}
      />
    </div>
  );
}

export default Stories;
