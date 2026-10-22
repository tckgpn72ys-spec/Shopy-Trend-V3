export default function Logo({ as: Tag = 'a', ...rest }) {
  const props = Tag === 'a' ? { href: '#accueil', 'aria-label': 'Shopy Trend — accueil' } : {};
  return (
    <Tag className="logo" {...props} {...rest}>
      <span className="logo__mark" aria-hidden="true">ST</span>
      <span className="logo__word">SHOPY TREND</span>
    </Tag>
  );
}
