import { IconPencil } from "@tabler/icons-react";
import { useEffect } from "react";
import { ResponseWrapper } from "../app-provider/providerType";
import userService from "../services/user.service";
import { useAppProviderCtx } from "../app-provider/AppProvider";

const MyProfilePage = () => {
  const {
    data: { userProfile, user },
    func: { updateUserProfile },
  } = useAppProviderCtx();

  useEffect(() => {
    userService.getProfile().then((res: ResponseWrapper) => {
      if (res.result) updateUserProfile(res.result);
    });
  }, []);

  if (!userProfile || !user) return <></>;
  return (
    <div className="w-full flex justify-center items-center mt-10">
      <div className="w-full px-16">
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              First Name:{" "}
            </p>
            <p className="text-lg ml-3">{userProfile!.firstName}</p>
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
            <p className="text-lg ml-3">{userProfile!.lastName}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">Email: </p>
            <p className="text-lg ml-3">{user!.email}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">Title: </p>
            <p className="text-lg ml-3">{userProfile!.title}</p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">
              (Job Title from profile)
            </p>
          </div>
        </div>
        {/* <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Sign-up Method:{" "}
            </p>
            <p className="text-lg ml-3">{user.signUpMethod}</p>
          </div>
          <div>
            <p className="text-lg ml-3 text-gray-400">
              (local, google, linkedin)
            </p>
          </div>
        </div> */}
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Sign-up Date:{" "}
            </p>
            <p className="text-lg ml-3">{user!.signupDate.toString()}</p>
          </div>
          <div>{/* <IconPencil /> */}</div>
        </div>
        <div className="flex w-full justify-between items-center my-6">
          <div className="flex">
            <p className="font-bold text-lg text-right w-[200px]">
              Access Level:{" "}
            </p>
            <p className="text-lg ml-3">{user!.accountType}</p>
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
            <p className="text-lg ml-3">{user!.accountStatus}</p>
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
              {user!.isEmailAuthenticated.toString().toUpperCase()}
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
