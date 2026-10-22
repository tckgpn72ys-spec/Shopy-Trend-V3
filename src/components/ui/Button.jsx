import { motion } from 'framer-motion';
import Icon from './Icon.jsx';

// variant : primary (bordeaux) | light (argent) | ghost | ghost-on-color
export default function Button({ variant = 'primary', icon, iconLeft, children, href, className = '', ...rest }) {
  const Comp = href ? motion.a : motion.button;
  const extra = href ? { href } : { type: rest.type || 'button' };
  return (
    <Comp className={`btn btn--${variant} ${className}`} whileTap={{ scale: 0.97 }} transition={{ duration: 0.12 }} {...extra} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={18} />}
      <span>{children}</span>
      {icon && <Icon name={icon} size={18} stroke={1.8} />}
    </Comp>
  );
}
