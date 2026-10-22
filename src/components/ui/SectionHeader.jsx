import Icon from './Icon.jsx';

export default function SectionHeader({ title, actionLabel, onAction, id }) {
  return (
    <div className="section-head">
      <h2 className="section-head__title" id={id}>{title}</h2>
      {actionLabel && (
        <button type="button" className="link-arrow" onClick={onAction}>
          <span>{actionLabel}</span>
          <Icon name="arrow" size={14} stroke={1.8} />
        </button>
      )}
    </div>
  );
}
