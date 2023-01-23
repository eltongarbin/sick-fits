import { ChangeEvent, useState } from 'react';

export const useForm = (initial = {}) => {
  const [inputs, setInputs] = useState(initial);
  // const initialValues = useMemo(
  //   () => Object.values(initial).join(''),
  //   [initial]
  // );

  // useEffect(() => {
  //   setInputs(initial);
  // }, [initialValues]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name, type } = e.target;
    let newValue;

    if (type === 'number') {
      newValue = parseInt(value);
    } else if (type === 'file') {
      newValue = e.target.files?.item(0);
    } else {
      newValue = value;
    }

    setInputs({
      ...inputs,
      [name]: newValue,
    });
  };

  const resetForm = () => {
    setInputs(initial);
  };

  const clearForm = () => {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );

    setInputs(blankState);
  };

  return { inputs, handleChange, resetForm, clearForm };
};
