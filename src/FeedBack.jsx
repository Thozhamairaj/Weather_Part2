// ...existing code...
import React, { useState } from "react";
import feedImg from "./feed.jpeg";

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${feedImg})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    padding: "16px",
  },
  container: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    maxWidth: "420px",
    width: "100%",
  },
  h1: { fontSize: "1.6rem", color: "#1d4ed8", textAlign: "center", marginBottom: "12px" },
  label: { display: "block", marginBottom: "6px", color: "#374151" },
  input: { width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #cbd5e1" },
  textarea: { width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #cbd5e1", resize: "vertical" },
  select: { width: "100%", padding: "10px", marginBottom: "12px", borderRadius: "4px", border: "1px solid #cbd5e1" },
  btnPrimary: { backgroundColor: "#2563eb", color: "#fff", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer" },
  btnSecondary: { backgroundColor: "#e5e7eb", color: "#111827", padding: "10px", border: "none", borderRadius: "4px", cursor: "pointer", marginLeft: "8px" },
  footer: { textAlign: "center", marginTop: "10px", color: "#6b7280" },
  message: { textAlign: "center", marginTop: "8px" },
};

export default function FeedBack() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState({ text: "", isError: false });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ text: "", isError: false });

    if (!name || !email || !rating || !comments) {
      setStatus({ text: "Please fill in all fields.", isError: true });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/submit-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, rating, comments }),
      });

      let json = {};
      try {
        json = await res.json();
      } catch (_) {
        json = {};
      }

      if (res.ok) {
        setStatus({ text: "Feedback submitted successfully!", isError: false });
        setName(""); setEmail(""); setRating(""); setComments("");
      } else {
        setStatus({ text: json.error || "Failed to submit feedback.", isError: true });
      }
    } catch (err) {
      console.error(err);
      setStatus({ text: "An error occurred. Please try again.", isError: true });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container} aria-live="polite">
        <h1 style={styles.h1}>Leave Your Feedback</h1>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="name" style={styles.label}>Your Name:</label>
          <input id="name" style={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" required aria-label="Your Name" />

          <label htmlFor="email" style={styles.label}>Your Email:</label>
          <input id="email" type="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required aria-label="Your Email" />

          <label htmlFor="rating" style={styles.label}>Rate Your Experience:</label>
          <select id="rating" style={styles.select} value={rating} onChange={(e) => setRating(e.target.value)} required aria-label="Rate Your Experience">
            <option value="">Select a rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>

          <label htmlFor="comments" style={styles.label}>Your Comments:</label>
          <textarea id="comments" rows={4} style={styles.textarea} value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Write your feedback here..." required aria-label="Your Comments" />

          <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <button type="submit" style={styles.btnPrimary} disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <button type="button" style={styles.btnSecondary} onClick={() => window.history.back()}>
              Back
            </button>
          </div>
        </form>

        {status.text && (
          <div style={{ ...styles.message, color: status.isError ? "red" : "green" }}>{status.text}</div>
        )}

        <div style={styles.footer}>
          <p>Thank you for helping us improve!</p>
        </div>
      </div>
    </div>
  );
}