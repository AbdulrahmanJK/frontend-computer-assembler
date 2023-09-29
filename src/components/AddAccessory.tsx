import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAccessories } from '../features/AccessoriesSlice';
import axios from 'axios';
import { fetchCategory } from '../features/CategorySlice';

interface AddAccessoryProps {
  onClose: () => void;
}

const AddAccessory: React.FC<AddAccessoryProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const category = useSelector((state: any) => state.categorySlice.category);
  const [imageURL, setImageURL] = useState<string>('');
  const [accessoryData, setAccessoryData] = useState({
    image: '',  // Убедитесь, что здесь image начинается с пустой строки
    title: '',
    price: 0,
    attributes: '',
    category: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await axios.post('http://localhost:4000/upload/img', formData);

        // Обновляем URL изображения после успешной загрузки
        setImageURL(`http://localhost:4000${data.url}`);

        // Обновляем accessoryData, чтобы сохранить ссылку на изображение
        setAccessoryData((prevData) => ({
          ...prevData,
          image: `http://localhost:4000${data.url}`,
        }));
      } catch (error) {
        setError('Произошла ошибка при загрузке изображения.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Теперь мы отправляем только ссылку на изображение, а не объект файла
      await dispatch(createAccessories(accessoryData));
      onClose();
    } catch (error) {
      setError('Произошла ошибка при создании аксессуара.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAccessoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    // При монтировании компонента, загрузите категории с сервера
    dispatch(fetchCategory());
  }, [dispatch]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white w-96 rounded-lg shadow-xl">
        <div className="p-4">
          <div className='mb-4 text-right'>
            <button
              className=" text-gray-500 hover:text-gray-700 text-right"
              onClick={onClose}
            >
              &#10006;
            </button>
          </div>
          <h3 className="text-2xl font-semibold mb-4">Добавить комплектующие</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Изображение:
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Название:
              </label>
              <input
                type="text"
                name="title"
                value={accessoryData.title}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Цена:
              </label>
              <input
                type="number"
                name="price"
                value={accessoryData.price}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Атрибуты:
              </label>
              <textarea
                name="attributes"
                value={accessoryData.attributes}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Категория:
              </label>
              <select
                name="category"
                value={accessoryData.category}
                onChange={handleChange}
                className="w-full rounded border border-gray-300 py-2 px-3 focus:outline-none focus:border-blue-500"
              >
                <option value="">Выберите категорию</option>
                {category.map((item: any) => (
                  <option key={item._id} value={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full"
            >
              Добавить
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAccessory;
