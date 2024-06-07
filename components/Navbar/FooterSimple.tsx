import { Container, Group, Anchor } from '@mantine/core';
import classes from './FooterSimple.module.css';

const links = [
  { link: '/', label: 'Home' },
  { link: '/privacypolicy', label: 'Privacy' },
];

export function FooterSimple() {
  const items = links.map((link) => (
    <Anchor<'a'>
      c="dimmed"
      key={link.label}
      href={link.link}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </div>
  );
}
