import { IconPencil } from "@tabler/icons-react";

const MyProfilePage = () => {
  const userInfo = {
    firstName: "William",
    lastName: "Chung",
    email: "william@eposting.com",
    title: "Project Manager",
    signUpMethod: "Google",
    signUpDate: "2/22/2025",
    accessLevel: "admin",
    accountStatus: "active",
    emailAuthenticated: true,
  };
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              First Name:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.firstName}</p>
          </div>
          <div>
            <IconPencil />
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Last Name:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.lastName}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">Email: </p>
            <p className="text-lg ml-3">{userInfo.email}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">Title: </p>
            <p className="text-lg ml-3">{userInfo.title}</p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">
              (Job Title from profile)
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Sign-up Method:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.signUpMethod}</p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">
              (local, google, linkedin)
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Sign-up Date:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.signUpDate}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Access Level:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.accessLevel}</p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">
              (role: general, editor, admin)
            </p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Account Status:{" "}
            </p>
            <p className="text-lg ml-3">{userInfo.accountStatus}</p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">(inactive or active)</p>
          </div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Email Authenticated:{" "}
            </p>
            <p className="text-lg ml-3">
              {userInfo.emailAuthenticated.toString().toUpperCase()}
            </p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">
              (false = not authenticated, true = authenticated)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;
