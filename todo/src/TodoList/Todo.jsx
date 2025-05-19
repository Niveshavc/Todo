import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser, deleteuser } from './slice';

const Todo = () => {
  const [input, setInput] = useState({ Todo: '' });
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onDo = () => {
    if (input.Todo.trim() !== '') {
      dispatch(adduser({ id: Date.now(), text: input.Todo }));
      setInput({ Todo: '' });
      setSelectAll(false);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([]);
    } else {
      const allIds = todos.map((todo) => todo.id);
      setSelectedIds(allIds);
    }
    setSelectAll(!selectAll);
  };

  const handleSingleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const deleteSelected = () => {
    selectedIds.map((id) => dispatch(deleteuser(id)));
    setSelectedIds([]);
    setSelectAll(false);
  };

  return (
    <div className='min-h-screen flex flex-wrap justify-center items-center bg-gradient-to-bl from-blue-50 via-blue-300 to-blue-600 px-2'>
      <div className='w-full flex flex-wrap max-w-[700px] bg-white shadow-2xl shadow-gray-600 rounded-lg p-4 flex-col items-center text-black'>

        <h1 className='text-2xl font-semibold mb-4'>Todo List</h1>

        <div className='flex flex-wrap gap-2 justify-center items-center w-full mb-4'>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
            className='w-4 h-4'
            title="Select All"
          />
          <input
            type="text"
            name='Todo'
            value={input.Todo}
            onChange={handleChange}
            placeholder='Enter task'
            className='border border-black px-2 py-1 min-w-[100px] max-w-[200px]'
          />
          <button
            onClick={onDo}
            className='px-4 py-1 bg-green-500 hover:bg-green-600 text-white rounded'
          >
            Add
          </button>
          <button
            onClick={deleteSelected}
            className='px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded'
          >
            Delete
          </button>
        </div>

        <ul className='bg-gray-200 rounded w-full max-h-[400px] overflow-y-auto px-4 py-2 '>
          {todos.map((todo) => (
            <li key={todo.id} className="flex justify-between items-start mb-2">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(todo.id)}
                  onChange={() => handleSingleSelect(todo.id)}
                  className='w-4 h-4 mt-1'
                />
                <span className='ml-2 text-lg text-teal-900 font-medium break-words'>{todo.text}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
