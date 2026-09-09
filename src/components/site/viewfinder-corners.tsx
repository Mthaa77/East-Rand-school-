/**
 * Gold camera-viewfinder corner brackets that draw in when the parent
 * `group` is hovered or keyboard-focused. A quiet nod to the theme —
 * the work behind the spotlight is always in frame.
 */
export function ViewfinderCorners({ className }: { className?: string }) {
  const base =
    "absolute size-5 border-gold-300/90 opacity-0 scale-150 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:opacity-100 group-hover:scale-100 group-focus-visible:opacity-100 group-focus-visible:scale-100 motion-reduce:transition-none";
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-3 z-10 ${className ?? ""}`}
    >
      <span className={`${base} left-0 top-0 rounded-tl-[5px] border-l-2 border-t-2 origin-top-left`} />
      <span className={`${base} right-0 top-0 rounded-tr-[5px] border-r-2 border-t-2 origin-top-right`} />
      <span className={`${base} bottom-0 left-0 rounded-bl-[5px] border-b-2 border-l-2 origin-bottom-left`} />
      <span className={`${base} bottom-0 right-0 rounded-br-[5px] border-b-2 border-r-2 origin-bottom-right`} />
    </span>
  );
}
