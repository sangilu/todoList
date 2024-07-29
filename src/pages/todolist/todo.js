import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Todo() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("메뉴");
  const [todo, setTodo] = useState(""); // 새로운 상태: 입력된 todo 텍스트
  const [todos, setTodos] = useState([]); // 새로운 상태: todo 리스트
  const [user, setUser] = useState({});

  /* router 객체 바뀔때마다 사용자번호 셋팅 */
  const [no, setNo] = useState(router.query?.no); //undefined
  useEffect(() => {
    setNo(router.query?.no);
  }, [router.query]); //{} -> {no:2}

  //입력변경핸들러
  const handleInputChange = (e) => {
    setTodo(e.target.value);
  };

  //Todo추가핸들러
  const handleAddTodo = () => {
    if (todo.trim() !== "") {
      setTodos([...todos, todo]);
      setTodo(""); // 입력 필드 초기화
    }
  };

  //사용자정보조회
  const getUserInfo = async () => {
    console.log("????");
    const response = await axios.get(`/api/users/user?no=${no}`);
    console.log("=>", response.data.info);

    if (response.data.success) {
      setUser(response.data.info);
    }
  };

  useEffect(() => {
    //no기준으로 사용자정보 조회
    if (no) {
      getUserInfo();
    }
  }, [no]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-96 text-center">
        <div className="w-full h-20 mt-2 px-4 sm:px-6">
          <div className="flex items-center h-16 justify-between">
            <div>
              <img className="h-8 w-8 w-full" alt="Your Company" />
            </div>

            <div className="font-bold text-white bg-red-200 border rounded p-3 pl-10 pr-10 text-3xl">
              TODOLIST
            </div>

            <div className="flex items-center">
              {/* 사용자 프로필 */}
              <div className="flex items-center mr-10">
                <img
                  className="h-10 w-10 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User"
                />
                <div className="ml-3 text-white">
                  <div className="text-base font-medium">{user.user_name}</div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.user_id}
                  </div>
                </div>
              </div>
            </div>

            {/* 드롭다운 버튼 */}
            <div>
              <button onClick={toggleDropdown} className="text-white">
                {selectedOption}
              </button>
              {isOpen && (
                <ul className="absolute right-0 mt-2 w-36 rounded-md bg-gray-900 text-white text-center">
                  <li
                    onClick={() => handleOptionClick("회원정보수정")}
                    className="cursor-pointer px-4 py-2 text-sm font-bold"
                  >
                    회원정보수정
                  </li>
                  <li
                    onClick={() => handleOptionClick("로그아웃")}
                    className="cursor-pointer px-4 py-2 text-sm font-medium"
                  >
                    로그아웃
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="flex-col items-center space-y-1 px-2 pb-3 pt-2">
          <input
            className="todoInput"
            type="text"
            spellCheck="false"
            placeholder="할 일을 입력해주세요!"
            value={todo}
            onChange={handleInputChange}
          />
          <button
            className="items-center block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white "
            onClick={handleAddTodo}
          >
            일정 추가
          </button>
          <br />
          <div className="w-5 bg-red-200">
            <ul className="text-left text-white">
              {todos.map((item, index) => (
                <li key={index} className="py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
