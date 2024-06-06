import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

// CommentList component renders a list of comments
const CommentList = ({ comments }) => {
  return (
    // Render a Material-UI List component to display comments
    <List>
      {/* Map through the comments array to render each comment */}
      {comments.map((comment) => (
        // ListItem for each comment, key is set to comment id for React optimization
        <ListItem key={comment.id} alignItems="flex-start">
          {/* ListItemAvatar to display avatar/icon */}
          <ListItemAvatar>
            {/* Avatar displaying CommentIcon */}
            <Avatar>
              <CommentIcon color="primary" />
            </Avatar>
          </ListItemAvatar>
          {/* ListItemText to display comment details */}
          <ListItemText
            // Primary content displays email in bold and small font above the title
            primary={
              <>
                <Typography variant="body2" color="green" component="div">
                  {/* Email displayed in bold */}
                  <strong>{comment.email}</strong>
                </Typography>
                {/* Title of the comment */}
                <Typography variant="body1">{comment.name}</Typography>
              </>
            }
            // Secondary content displays the comment body
            secondary={comment.body}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CommentList;
