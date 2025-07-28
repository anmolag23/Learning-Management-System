import React, { useEffect } from 'react'
import { GraduationCap, Menu, School} from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import DarkMode from '@/DarkMode';
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Separator } from '@/components/ui/separator';
import { Link, useNavigate } from 'react-router-dom';
import { useLogoutUserMutation } from '@/features/api/authApi';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

const Navbar = () => {
   
    const {user} = useSelector(store=>store.auth);
    const [logoutUser, {data, isSuccess}] = useLogoutUserMutation();
    const navigate = useNavigate();
    const logoutHandler = async () => {
      await logoutUser();
    }
    console.log(user);

    useEffect(()=>{
      if(isSuccess){
        toast.success(data.message || "user log out");
        navigate("/login");
      }
    },[isSuccess])
  return (
    // <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
    <div className="h-16 bg-white/80 dark:bg-[#020817] backdrop-blur-md shadow-sm border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 z-10 transition-all duration-300">
       {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex items-center gap-2">
  <GraduationCap size={28} />
  <Link to="/">
    <h1 className="hidden md:block font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600">
       Learnix
    </h1>
  </Link>
</div>


        {/* User icons and dark mode icon  */}
        <div className="flex items-center gap-8">
          {user ? (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border-2 border-blue-500 hover:scale-105 transition-all duration-300">
          <AvatarImage
            src={user?.photoUrl || "https://github.com/shadcn.png"}
            alt="User"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 rounded-xl shadow-md bg-white dark:bg-[#0f172a] border dark:border-gray-700 p-1">
        <DropdownMenuLabel className="font-semibold text-sm text-gray-800 dark:text-white px-3 py-2 border-b dark:border-b-gray-700">
          My Account
        </DropdownMenuLabel>

        <DropdownMenuGroup className="text-sm text-gray-700 dark:text-gray-300">
          <DropdownMenuItem asChild>
            <Link
              to="my-learning"
              className="w-full px-3 py-2 hover:bg-blue-100 dark:hover:bg-white/10 rounded-md transition-all"
            >
              My learning
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link
              to="profile"
              className="w-full px-3 py-2 hover:bg-blue-100 dark:hover:bg-white/10 rounded-md transition-all"
            >
              Edit Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={logoutHandler}
            className="w-full px-3 py-2 hover:bg-blue-100 dark:hover:bg-white/10 rounded-md transition-all"
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>

        {user?.role === "instructor" && (
          <>
            <DropdownMenuSeparator className="my-1 dark:border-gray-700" />
            <DropdownMenuItem asChild>
              <Link
                to="/admin/dashboard"
                className="w-full px-3 py-2 hover:bg-blue-100 dark:hover:bg-white/10 rounded-md transition-all"
              >
                Dashboard
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
  <Button
    variant="outline"
    className="border-blue-700 text-blue-700 hover:bg-blue-100 dark:hover:bg-slate-800 transition"
    onClick={() => navigate("/login")}
  >
    Login
  </Button>

  <Button
    className="bg-gradient-to-r from-blue-700 via-indigo-700 to-teal-600 text-white hover:brightness-110 transition"
    onClick={() => navigate("/login")}
  >
    Sign Up
  </Button>
</div>

          )}
          <DarkMode/>

    </div>
    </div>
    {/*Mobile device*/}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <h1 className="font-extrabold text-2xl">E-learning</h1>
        <MobileNavbar user={user} />
      </div>
    </div>
  )
}
export default Navbar;

const MobileNavbar = ({ user }) => {
  const navigate = useNavigate();
   const [logoutUser,{data, isSuccess}] = useLogoutUserMutation();
    const logoutHandler = async () => {
      await logoutUser();
    }

    useEffect(()=>{
      if(isSuccess){
        toast.success(data.message || "user log out");
        navigate("/login");
      }
    },[isSuccess])
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="rounded-full hover:bg-gray-200"
          variant="outline"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full p-6">
        <div>
          <SheetHeader className="flex flex-row items-center justify-between mt-2 mb-4">
            <SheetTitle  className="text-xl font-extrabold">
              <Link to="/">E-Learning</Link>
            </SheetTitle>
            <DarkMode />
          </SheetHeader>
          <Separator className="mr-2 mb-4" />
          <nav className="flex flex-col space-y-4 text-base">
            <Link to="/my-learning">My Learning</Link>
            <Link to="/profile">Edit Profile</Link>
            <Link onClick={logoutHandler}>Log Out</Link>
          </nav>
        </div>

        {user?.role === "instructor" && (
          <SheetFooter className=" mt-12">
            <SheetClose asChild>
              <Button
                type="submit"
                onClick={() => navigate("/admin/dashboard")}
                className= "bg-gray-900 text-white hover:bg-gray-700 w-full font-medium rounded-md "
              >
                Dashboard
              </Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
