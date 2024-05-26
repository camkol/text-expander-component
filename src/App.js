import { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div>
      <TextExpander>
        Space travel is the ultimate adventure! Imagine soaring past the stars
        and exploring new worlds. It's the stuff of dreams and science fiction,
        but believe it or not, space travel is a real thing. Humans and robots
        are constantly venturing out into the cosmos to uncover its secrets and
        push the boundaries of what's possible.
      </TextExpander>

      <TextExpander
        collapsedNumWords={20}
        expandButtonText="Show text"
        collapseButtonText="Collapse text"
        buttonColor="#ff6622"
      >
        Space travel requires some seriously amazing technology and
        collaboration between countries, private companies, and international
        space organizations. And while it's not always easy (or cheap), the
        results are out of this world. Think about the first time humans stepped
        foot on the moon or when rovers were sent to roam around on Mars.
      </TextExpander>

      <TextExpander expanded={true} className="box">
        Space missions have given us incredible insights into our universe and
        have inspired future generations to keep reaching for the stars. Space
        travel is a pretty cool thing to think about. Who knows what we'll
        discover next!
      </TextExpander>
    </div>
  );
}

function TextExpander({
  expanded = false,
  className = "",
  collapsedNumWords = 10,
  expandButtonText = "Show More",
  collapseButtonText = "Show Less",
  buttonColor = "blue",
  children,
}) {
  const [isExpanded, setIsExpanded] = useState(expanded);

  function handleClick() {
    setIsExpanded(!isExpanded);
  }

  function getTextFromChildren(children) {
    if (typeof children === "string") {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map((child) => getTextFromChildren(child)).join("");
    }
    if (typeof children === "object" && children.props) {
      return getTextFromChildren(children.props.children);
    }
    return "";
  }

  const fullText = getTextFromChildren(children);
  const textDisplay = () => {
    const words = fullText.split(" ");
    if (isExpanded || words.length <= collapsedNumWords) {
      return fullText;
    } else {
      return words.slice(0, collapsedNumWords).join(" ") + "...";
    }
  };

  const buttonStyle = {
    color: buttonColor,
  };

  return (
    <div className={className}>
      <span>{textDisplay()} </span>

      {fullText.split(" ").length > collapsedNumWords && (
        <span style={buttonStyle} onClick={handleClick}>
          {isExpanded ? collapseButtonText : expandButtonText}
        </span>
      )}
    </div>
  );
}
