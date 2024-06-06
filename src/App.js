import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, TextField, Typography } from "@mui/material";
import Pagination from "@mui/lab/Pagination";
import Header from "./Header";
import CommentList from "./CommentList";
import "./styles.css";

function App() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 20;
  const scrollableContainerRef = useRef(null);

  useEffect(() => {
    // Fetch comments from the API when the component mounts
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        // Set the fetched comments in the state
        setComments(response.data);
        // Scroll to the top of the container when comments are fetched
        scrollableContainerRef.current.scrollTop = 0;
      })
      .catch((error) => {
        // Handle errors if fetching comments fails
        console.error("There was an error fetching the comments!", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, on component mount

  // Filter the fetched comments based on the search query
  const filteredComments = comments.filter(
    (comment) =>
      comment.name.toLowerCase().includes(search.toLowerCase()) ||
      comment.body.toLowerCase().includes(search.toLowerCase()) ||
      comment.email.toLowerCase().includes(search.toLowerCase())
  );

  // for storing the current comments for pagination
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  // for handling page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      {/* Header Component */}
      <Header />
      {/* Title */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        style={{ marginTop: "20px" }}
      >
        Comments from JSONPlaceholder
      </Typography>
      {/* Search Input */}
      <TextField
        label="Search Comments by email, content or title"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Scrollable Container for Comments */}
      <div className="scrollable-container" ref={scrollableContainerRef}>
        {/* Adjust maxHeight as needed */}
        {filteredComments.length > 0 ? (
          // If there are filtered comments, render CommentList and Pagination
          <>
            {/* List of Comments */}
            <CommentList comments={currentComments} />
            {/* Pagination */}
            <Pagination
              count={Math.ceil(filteredComments.length / commentsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            />
          </>
        ) : (
          // If no comments match the query, display a message
          <Typography
            variant=""
            component="p"
            style={{ marginTop: "20px", textAlign: "center", color: "gray" }}
          >
            No comments matching the query was found
          </Typography>
        )}
      </div>
    </Container>
  );
}

export default App;
