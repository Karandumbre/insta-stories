import Stories from "./components/stories";

function App() {
  return (
    <>
      <div className="app stories-wrapper">
        <Stories />
      </div>
      <div className="desktop-story-message-wrapper">
        Please note that stories are visible only on mobile devices.
      </div>
    </>
  );
}

export default App;
