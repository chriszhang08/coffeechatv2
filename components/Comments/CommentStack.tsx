import React, { useState } from 'react';
import { Button, Center, Group, Rating, SimpleGrid, Stack, Text, Textarea, Title } from '@mantine/core';
import { CommentHtml } from '@/components/Comments/CommentHtml';
import classes from './CommentStack.module.css';
import { useCoachCommentData } from '@/hooks/useCoachData';

interface CommentStackProps {
  coachId: string;
}

export const CommentStack: React.FC<CommentStackProps> = ({ coachId }) => {
  const [visibleComments, setVisibleComments] = useState(2); // Initial number of visible comments
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false)

  // Fetch comment data
  // TODO test this, it might be broken - what if all the comments don't load onComponentDidMount?
  const comments = useCoachCommentData(coachId);

  const totalComments = comments ? comments.length : 0;

  const commentDivs = comments?.slice(0, visibleComments).map((commentObj, id) => (
    <CommentHtml key={id} comment={commentObj} />
  ));
  if (commentDivs !== undefined && !commentsLoaded){
    setCommentsLoaded(true)
  }

  const loadMoreComments = () => {
    setVisibleComments(comments ? comments.length : 0); // Load all the comments
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setVisibleComments(2);
  };

  return (
    <div>
      <h2 style={{ marginRight: 'auto' }}>Reviews</h2>
      {commentsLoaded ? (
      <>
        <Stack>
          <Rating fractions={5} value={4.2} readOnly />
          <Title order={1}>4.2</Title>
          <Text size="sm">{totalComments} reviews</Text>
        </Stack>
        <SimpleGrid className={classes.comment} cols={2}>
          {commentDivs}
        </SimpleGrid>
      </>
    ) : (
      <div>Loading...</div>
    )}
      {visibleComments < totalComments && (
        <Center>
          <Button onClick={loadMoreComments} style={{ margin: 'auto', marginTop: '30px', marginBottom: '20px' }}>
            Load more comments
          </Button>
        </Center>
      )}
      {visibleComments > 2 && (
        <Center>
          <Button onClick={toggleCollapse} style={{ margin: 'auto', marginTop: '10px' }}>
            {isCollapsed ? 'Expand comments' : 'Collapse comments'}
          </Button>
        </Center>
      )}
      {/*<Textarea*/}
      {/*  mt="md"*/}
      {/*  label="Leave a Review"*/}
      {/*  placeholder="Your message"*/}
      {/*  maxRows={10}*/}
      {/*  minRows={5}*/}
      {/*  autosize*/}
      {/*  name="message"*/}
      {/*  variant="filled"*/}
      {/*/>*/}
    </div>
  );
};
