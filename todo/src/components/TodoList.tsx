import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, useRecoilState } from 'recoil';

// # Old Stuff
// function ToDoList() {
//   const [toDo, setValue] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setValue(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write Todo" />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// }

// # React-hooks-form
const toDoState = atom<IToDo[]>({
  key: 'toDo',
  default: [],
});

interface IForm {
  toDo: string;
}

interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

function ToDoList() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((prev) => [{ text: toDo, id: Date.now(), category: 'TO_DO' }, ...prev]);
    setValue('toDo', '');
  };

  return (
    <div>
      <h1>Todos</h1>
      <hr />
      <form onSubmit={handleSubmit(handleValid)}>
        <input
          {...register('toDo', {
            required: true,
          })}
          placeholder="Write Todo"
        />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
