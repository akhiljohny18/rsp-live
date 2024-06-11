"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { FaUser, FaIdBadge, FaEnvelope, FaBriefcase, FaBuilding, FaCalendarAlt, FaPhone, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { useAuth } from '../../_providers/Auth';
import { fetchUsers } from '../../_api/fetchUser';
import { Pagination } from '../Pagination';
import { useSearchParams } from 'next/navigation';

const Employee: React.FC = () => {
  const { user } = useAuth(); // Get the authenticated user
  const [filteredUsers, setFilteredUsers] = useState([]); // State for filtered users
  const [page, setPage] = useState(1); // State for current page
  const [itemsPerPage, setItemsPerPage] = useState(1); // State for items per page
  const [totalPages, setTotalPages] = useState(1); // State for total pages
  const [error, setError] = useState(null); // State for error handling
  const [showUsers, setShowUsers] = useState(false); // State for toggling user section on mobile screens
  const searchParams = useSearchParams(); // Hook for accessing URL search parameters

  // Extract user information
  const userInfo = {
    nsinternalid: (user as any)?.ns_internal_id || "N/A",
    name: user?.name || "N/A",
    email: user?.email || "N/A",
    isSupervisor: (user as any)?.isSupervisor === "yes",
    department: (user as any)?.department || "N/A",
    title: (user as any)?.title || "N/A",
    supervisorName: (user as any)?.supervisor || "N/A",
    birthDate: (user as any)?.birth_date || "N/A",
    mobileNumber: (user as any)?.mobilenumber || "N/A",
  };

  // Format birth date
  const formattedBirthDate = userInfo.birthDate !== "N/A" ? new Date(userInfo.birthDate).toLocaleDateString('en-GB') : "N/A";

  // Fetch users when component mounts or itemsPerPage changes
  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await fetchUsers(); // Fetch users from API
        console.log("Fetched users:", users);

        const matchingUsers = users.filter((fetchedUser) => fetchedUser.supervisor === userInfo.nsinternalid); // Filter users by supervisor
        setFilteredUsers(matchingUsers); // Set filtered users
        setTotalPages(Math.ceil(matchingUsers.length / itemsPerPage)); // Calculate total pages
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users."); // Handle error
      }
    };

    if (userInfo.isSupervisor) {
      getUsers(); // Fetch users if the user is a supervisor
    }
  }, [userInfo.isSupervisor, itemsPerPage]);

  // Set the current page based on URL parameters
  useEffect(() => {
    const pageParam = parseInt(searchParams.get('page'));
    if (!isNaN(pageParam)) {
      setPage(pageParam);
    }
  }, [searchParams]);

  // Update the URL whenever the page changes, only if the page is greater than 1
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (page > 1) {
      params.set('page', page.toString());
      window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    } else {
      params.delete('page');
      const newUrl = params.toString() ? `${window.location.pathname}?${params}` : window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, [page]);

  // Paginate users based on current page and items per page
  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  }, [filteredUsers, page, itemsPerPage]);

  return (
    <>
      <div className="container mx-auto px-4 lg:py-10 md:py-8 sm:py-6 py-6">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="lg:pl-20 md:pl-16 px-6 py-12">
            <div className="text-center mb-10 lg:mb-14">
              <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">Employee Details</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
              {/* User Information Display */}
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">Name</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.name}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaIdBadge className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">User ID</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.nsinternalid}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaEnvelope className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">Email</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.email}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaBriefcase className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">Post</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.title}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaBuilding className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">Department</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.department}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaUser className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">Supervisor Name</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.supervisorName}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">DOB</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{formattedBirthDate}</p>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center space-x-2">
                  <FaPhone className="text-gray-600" />
                  <label className="text-xs md:text-sm font-semibold text-gray-600">Mobile Number</label>
                </div>
                <p className="text-base md:text-lg text-gray-900">{userInfo.mobileNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {error ? (
        <div className="container mx-auto p-6 text-center text-red-500">{error}</div>
      ) : (
        userInfo.isSupervisor && filteredUsers.length > 0 && (
          <div className="container mx-auto px-4 lg:py-10 md:py-8 sm:py-6 py-6">
            <div className="max-w-6xl mx-auto bg-gray-200 rounded-lg shadow-lg md:overflow-hidden">
              <div className="p-6 overflow-x-auto">
                <div
                  className="flex justify-between items-center cursor-pointer md:mb-0"
                  onClick={() => setShowUsers(!showUsers)}
                >
                  <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 md:mb-2 lg:mb-4">Users</h1>
                  <div className="md:hidden">
                    {showUsers ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>
                <div className={`${showUsers ? "block" : "hidden"} md:block`}>
                  <div className="py-4">
                    <div className="hidden md:block">
                      {/* Table View for Desktop */}
                      <table className="w-full text-md bg-white shadow-md rounded mb-4">
                        <tbody>
                          <tr className="border-b">
                            <th className="text-left p-3 px-5">ID</th>
                            <th className="text-left p-3 px-5">Name</th>
                            <th className="text-left p-3 px-5">Email</th>
                            <th className="text-left p-3 px-5">Post</th>
                          </tr>
                          {paginatedUsers.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-orange-100 bg-gray-100">
                              <td className="p-3 px-5">{user.id}</td>
                              <td className="p-3 px-5">{user.name}</td>
                              <td className="p-3 px-5">{user.email}</td>
                              <td className="p-3 px-5">{user.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="block md:hidden">
                      {/* Card View for Mobile */}
                      {paginatedUsers.map((user) => (
                        <div key={user.id} className="bg-white hover:bg-orange-100 shadow-lg rounded-lg mb-4 p-6 border border-gray-200">
                          <div className="flex items-center space-x-2 mb-2">
                            <FaIdBadge className="text-gray-600" />
                            <p className="font-semibold text-gray-700">ID:</p>
                            <p className="text-gray-900">{user.id}</p>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FaUser className="text-gray-600" />
                            <p className="font-semibold text-gray-700">Name:</p>
                            <p className="text-gray-900">{user.name}</p>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FaEnvelope className="text-gray-600" />
                            <p className="font-semibold text-gray-700">Email:</p>
                            <p className="text-gray-900">{user.email}</p>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <FaBriefcase className="text-gray-600" />
                            <p className="font-semibold text-gray-700">Post:</p>
                            <p className="text-gray-900">{user.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <Pagination
                        page={page}
                        totalPages={totalPages}
                        onClick={setPage}
                        className="my-4 float-end"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default Employee;
