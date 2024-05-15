import { Avatar, Group, Rating, Text, TypographyStylesProvider } from '@mantine/core';
import classes from '@/components/Comments/CommentStack.module.css';

export function CommentHtml({ comment }: { comment: { html: string } }) {
  return (
    <div style={{ paddingTop: 20 }}>
      <Group>
        <Avatar
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png"
          alt="Jacob Warnhalter"
          radius="xl"
        />
        <div>
          <Text fz="sm">Jacob Warnhalter</Text>
          <Text fz="xs" c="dimmed">
            10 minutes ago
          </Text>
        </div>
        <Rating fractions={5} value={4.2} readOnly style={{ justifySelf: 'flex-end' }} />
      </Group>
      <TypographyStylesProvider className={classes.body}>
        <div
          className={classes.content}
          dangerouslySetInnerHTML={{
            __html:
            comment.html,
          }}
        />
      </TypographyStylesProvider>
    </div>
  );
}
