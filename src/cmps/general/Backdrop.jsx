export function Backdrop({ isBackdrop, onClick, children }) {
  
  return (
    <div className={isBackdrop ? "modal-backdrop" : ""} onClick={onClick}>
      {children}
    </div>
  )
}