import SearchUser from "@/components/allUser/searchFilter";
import Header from "@/components/common/Header/header";
import SideNav from "@/components/common/SideBar/sidebar";
import { departments, getAllUsers } from "@/utils/publicApi";
import { DepartmentModel, UserParam } from "@/utils/types";
import Image from "next/image";
import getUser from "@/utils/getUserServerSide";
import Footer from "@/components/common/Footer/footer";
const AllUsers = async ({ searchParams }: any) => {
  let users: any;
  let token: any;
  let departmentData: DepartmentModel[] = [];
  token = getUser();
  let departmentID: string =
    searchParams.departmentId === "null" ||
    searchParams.departmentId === "" ||
    searchParams.departmentId === undefined ||
    searchParams.departmentId === "undefined"
      ? ""
      : searchParams.departmentId;

  let searchQuery = searchParams?.search ?? "";
  let data: UserParam = {
    searchValue: searchQuery,
    departmentId:
      token.role === "Admin" || token.role === "HR"
        ? departmentID
        : token?.departmentId,
    pageNumber: 0,
    pageSize: 0,
  };

  try {
    users = await getAllUsers(data);
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  try {
    departmentData = await departments();
  } catch (error) {}

  const calculateCombinedExperience = (
    joiningDate: string,
    experienceOnJoining: number | null
  ): string => {
    const joining = new Date(joiningDate);
    const today = new Date();

    // Calculate the time passed since the joining date
    const yearsElapsed = today.getFullYear() - joining.getFullYear();
    const monthsElapsed = today.getMonth() - joining.getMonth();

    let totalMonths = yearsElapsed * 12 + monthsElapsed;

    // Add experienceOnJoining if available
    if (experienceOnJoining !== null) {
      totalMonths += experienceOnJoining;
    }

    // Calculate years and remaining months
    const totalYears = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    return `${totalYears}.${remainingMonths} years`;
  };

  return (
    <div className="app sidebar-mini ltr light-mode">
      <div className="page">
        <div className="page-main">
          <Header departmentData={departmentData} />
          <SideNav />
          <div className="main-content app-content mt-0">
            <div className="side-app">
              <div className="main-container container-fluid">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card custom-card mt-4">
                      <div className="card-body">
                        <div className="contact-header">
                          <div className="d-sm-flex d-block align-items-center justify-content-between">
                            <div className="h5 fw-semibold mb-0">All Users</div>
                            <div className="search_box">
                              <i className="ri-search-line" />
                              <SearchUser />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  {users?.results.map((user: any) => {
                    const badgeCounts: { [key: string]: number } = {};

                    // Calculate badge counts for the current user
                    user.awards?.forEach((badge: any) => {
                      const key = badge.badgeImage;
                      badgeCounts[key] = (badgeCounts[key] || 0) + 1;
                    });

                    return (
                      <div
                        key={user.id}
                        className="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                      >
                        <div className="card custom-card all_userCard">
                          <div className="card-body contact-action">
                            <div className="contact-overlay"></div>
                            <div className="d-flex align-items-top">
                              <div className="d-flex flex-fill flex-wrap gap-3">
                                <div className="avatar avatar-2xl avatar-rounded">
                                  {user.profileImage ? (
                                    <Image
                                      src={`https://3t-api.csdevhub.com/images/${user.profileImage}`}
                                      alt="Profile Image"
                                      height={50}
                                      width={50}
                                    />
                                  ) : (
                                    <div className="initials">
                                      {user.name
                                        .split(" ")
                                        .map((part: any) =>
                                          part[0].toUpperCase()
                                        )
                                        .join("")}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <div className="mb-0 fw-semibold">
                                    {token.role !== "Employee" ? (
                                      <a href={`/employees/${user.id}`}>
                                        {user.name}
                                      </a>
                                    ) : (
                                      <span>{user.name}</span> // Display plain text if the role is 'Employee'
                                    )}
                                  </div>
                                  <p className="mb-1 text-muted contact-mail text-truncate fs-13">
                                    {user.designation}
                                  </p>
                                  <p className="mb-1 text-muted contact-mail text-truncate fs-13">
                                    Experience:{" "}
                                    {user.joiningDate &&
                                    user.experienceOnJoining !== null
                                      ? calculateCombinedExperience(
                                          user.joiningDate,
                                          parseInt(user.experienceOnJoining) ||
                                            0
                                        )
                                      : user.joiningDate
                                      ? calculateCombinedExperience(
                                          user.joiningDate,
                                          null
                                        )
                                      : "N/A"}
                                  </p>
                                  <p className="mb-1 text-muted contact-mail text-truncate">
                                    {user.email}
                                  </p>
                                  &nbsp;
                                  <div className="d-flex mb-0 profile-awards assign-awards">
                                    {Object.keys(badgeCounts).map(
                                      (badgeImage) => (
                                        <div
                                          key={badgeImage}
                                          className="mr-3 relative"
                                        >
                                          <Image
                                            src={`data:image/jpeg;base64,${badgeImage}`}
                                            width={50}
                                            height={50}
                                            alt={`award_${badgeImage}`}
                                          />
                                          {badgeCounts[badgeImage] > 1 && (
                                            <div className="absolute top-[-8px] right-[-6px] bg-red-600 text-white text-xs px-1 py-0.9 rounded">
                                              {badgeCounts[badgeImage]}
                                            </div>
                                          )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllUsers;
