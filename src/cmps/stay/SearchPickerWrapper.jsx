import PropTypes from "prop-types";
import { RemoveScroll } from "react-remove-scroll";

export function SearchPickerWrapper({ type, children }) {
  return (
    // <RemoveScroll forwardProps allowPinchZoom removeScrollBar={false}>
    <section className={`search-picker-wrapper ${type}`}>{children}</section>
    // </RemoveScroll>
  );
}

SearchPickerWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
