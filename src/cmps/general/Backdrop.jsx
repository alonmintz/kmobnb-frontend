export function Backdrop({ isBackdrop, onClick, children }) {
  return (
    <section className={isBackdrop ? "backdrop" : ""} onClick={onClick}>
      {children}
    </section>
  )
}