import React from "react";
import { Link } from "react-router";

// TypeScript functional component
const NotFound: React.FC = () => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>404</h1>
        <p style={styles.message}>
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to="/" style={styles.link}>
          Go Back Home
        </Link>
      </div>
      <div style={styles.backgroundCircles}></div>
    </div>
  );
};

// Updated styles with smoother animation
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f0f8ff",
    fontFamily: "Arial, sans-serif",
    color: "#333",
    overflow: "hidden",
  },
  content: {
    zIndex: 2,
    opacity: 0,
    animation: "fadeIn 1s forwards",
  },
  title: {
    fontSize: "120px",
    margin: "0",
    color: "#007bff",
    textShadow: "0px 4px 8px rgba(0, 123, 255, 0.4)",
    animation: "slideInFromLeft 1s ease-out forwards",
  },
  message: {
    fontSize: "24px",
    margin: "16px 0",
    color: "#555",
    animation: "fadeIn 1s 0.5s forwards",
  },
  link: {
    fontSize: "18px",
    color: "#fff",
    backgroundColor: "#007bff",
    textDecoration: "none",
    padding: "12px 24px",
    borderRadius: "24px",
    boxShadow: "0px 4px 8px rgba(0, 123, 255, 0.4)",
    transition: "transform 0.3s, background-color 0.3s",
    display: "inline-block",
    animation: "fadeIn 1s 1s forwards",
  },
  backgroundCircles: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
    pointerEvents: "none",
    display: "block",
  },
};

// Adding CSS animations globally
export default NotFound;
