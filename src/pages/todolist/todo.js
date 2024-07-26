import { useState } from "react";

export default function Todo() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("메뉴");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center h-80">
      <div className="bg-gray-800 h-50 text-center ">
        <div className="mx-auto max-w-7xl h-20 mt-2 px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
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
                  <div className="text-base font-medium">Tom Cook</div>
                  <div className="text-sm font-medium text-gray-400">
                    tom@example.com
                  </div>
                </div>
              </div>

              {/* 드롭다운 버튼 */}
              <div className="relative">
                <button onClick={toggleDropdown} className="text-white">
                  {selectedOption}
                </button>
                {isOpen && (
                  <ul className="absolute right-0 mt-2 w-36 rounded-md bg-gray-900 text-white text-center">
                    <li
                      onClick={() => handleOptionClick("메뉴")}
                      className="cursor-pointer px-4 py-2 text-sm font-bold"
                    >
                      회원정보수정
                    </li>
                    <li
                      onClick={() => handleOptionClick("메뉴")}
                      className="cursor-pointer px-4 py-2 text-sm font-medium"
                    >
                      로그아웃
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-1 px-2 pb-3 pt-2">
          <input
            class="todo__input"
            type="text"
            spellcheck="false"
            placeholder="할 일을 입력해주세요!"
          />
          <button className="flex-col items-center,block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white">
            일정 추가
          </button>
          <br />
        </div>
      </div>
    </div>
  );
}
