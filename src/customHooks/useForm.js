import { useState } from "react";

export const useForm = (initialState) => {
  const [fields, setFields] = useState(initialState);

  function handleChange({ target }) {
    let { value, name: field, type, checked } = target;
    switch (type) {
      case "number":
      case "range":
        value = +value;
        break;
      case "checkbox":
        value = checked;
        break;
      default:
        break;
    }
    setFields((prevFields) => ({ ...prevFields, [field]: value }));
  }

  return [fields, setFields, handleChange];
};
