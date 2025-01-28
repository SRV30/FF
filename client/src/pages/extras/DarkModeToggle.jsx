import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '@/store/extra/darkModeSlice';

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={handleToggle}
      className="p-2 bg-blue-500 text-white rounded dark:bg-blue-800"
    >
      Toggle Dark Mode
    </button>
  );
};

export default DarkModeToggle;
