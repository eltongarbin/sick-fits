import { useEffect, useState } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const initialValues = Object.values(initial).join('');

  useEffect(() => {
    setInputs(initial);
  }, [initial, initialValues]);

  function handleChange(e) {
    const { value, name, type } = e.target;
    let newValue = value;

    if (type === 'number') {
      newValue = parseInt(value);
    }

    if (type === 'file') {
      [newValue] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: newValue,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );

    setInputs(blankState);
  }

  return { inputs, handleChange, resetForm, clearForm };
}
