import PropTypes from "prop-types";
export function SearchPickerWrapper({ type, children }) {
  return (
    <section className={`search-picker-wrapper ${type}`}>{children}</section>
  );
}

SearchPickerWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
