import React, { useEffect, useState, useRef } from "react";
import { Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box, LinearProgress } from "@mui/material";

export default function StoryModal({
  open,
  onClose,
  data,
  onNextUser,
  onPrevUser,
  setCurrentStoryIndex,
  currentStoryIndex,
}) {
  const [progress, setProgress] = useState(0);
  const { stories } = data;
  const timerRef = useRef(null);

  const clearTimer = () => {
    clearInterval(timerRef.current);
  };

  const startTimer = () => {
    clearTimer();
    setProgress(0);
    timerRef.current = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = 100 / stories[currentStoryIndex].duration;
        const newProgress = Math.min(oldProgress + diff, 100);
        if (newProgress === 100) {
          clearTimer();
        }
        return newProgress;
      });
    }, 1000);
  };

  useEffect(() => {
    if (open) {
      startTimer();
    } else {
      clearTimer();
      setProgress(0);
      setCurrentStoryIndex(0);
    }
    return () => clearTimer();
  }, [open, currentStoryIndex]);

  useEffect(() => {
    if (progress === 100) {
      setProgress(0);
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex((prevIndex) => prevIndex + 1);
      } else {
        setCurrentStoryIndex(0);
        onNextUser();
      }
    }
  }, [progress, currentStoryIndex, stories.length, onNextUser]);

  const handleNext = () => {
    setProgress(0);
    if (currentStoryIndex < stories.length - 1) {
      setCurrentStoryIndex((prevIndex) => prevIndex + 1);
    } else {
      setCurrentStoryIndex(0);
      onNextUser();
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevIndex) => prevIndex - 1);
    }
    if (currentStoryIndex === 0) {
      setCurrentStoryIndex(0);
      onPrevUser();
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "100vw",
          height: "100vh",
          maxWidth: "100%",
          maxHeight: "100%",
          margin: "0",
          borderRadius: "0",
          background: "white",
        },
      }}
    >
      <Box position="absolute" top="0" right="0" onClick={onClose}>
        <CloseIcon
          sx={{
            cursor: "pointer",
          }}
        />
      </Box>
      <Box display="flex" gap={"2px"}>
        {stories.map((_, index) => (
          <LinearProgress
            sx={{
              width: "100%",
              borderRadius: 16,
            }}
            key={index}
            variant="determinate"
            value={
              index === currentStoryIndex
                ? progress
                : index < currentStoryIndex
                ? 100
                : 0
            }
          />
        ))}
      </Box>
      <Box
        height="inherit"
        display="flex"
        onClick={(e) => {
          const clickX = e.clientX;
          const width = e.currentTarget.clientWidth;
          if (clickX > width / 2) {
            handleNext();
          } else {
            handlePrev();
          }
        }}
      >
        <img
          src={stories[currentStoryIndex]?.img}
          alt="story"
          height="100%"
          width="100%"
          style={{ cursor: "pointer" }}
        />
      </Box>
    </Dialog>
  );
}
