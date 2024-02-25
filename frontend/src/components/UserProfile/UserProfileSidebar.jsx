// Sidebar 컴포넌트
const UserProfileSidebar = () => (
    <aside className="fixed inset-y-0 left-0 bg-white shadow-md max-h-screen w-60">
      <div className="flex flex-col justify-between h-full">
        <div className="flex-grow">
          <div className="px-4 py-6 text-center border-b">
            <h1 className="text-xl font-bold leading-none"><span className="text-yellow-700">Task Manager</span> App</h1>
          </div>
          <div className="p-4">
            <ul className="space-y-1">
              <li>
                <a href="javascript:void(0)" className="flex items-center bg-yellow-200 rounded-xl font-bold text-sm text-yellow-900 py-3 px-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="text-lg mr-4" viewBox="0 0 16 16">
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-3.5-7h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5z"/>
                  </svg>Plan
                </a>
              </li>
              {/* ... (다른 리스트 항목들) ... */}
            </ul>
          </div>
        </div>
        <div className="p-4">
          <button type="button" className="inline-flex items-center justify-center h-9 px-4 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" className="" viewBox="0 0 16 16">
              <path d="M12 1a1 1 0 0 1 1 1v13h1.5a.5.5 0 0 1 0 1h-13a.5.5 0 0 1 0-1H3V2a1 1 0 0 1 1-1h8zm-2 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
          </button> <span className="font-bold text-sm ml-2">Logout</span>
        </div>
      </div>
    </aside>
  );
  

  export default UserProfileSidebar;