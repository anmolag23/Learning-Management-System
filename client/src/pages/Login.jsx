import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginUserMutation, useRegisterUserMutation } from "@/features/api/authApi"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"

const Login = () => {
  const [signupInput, setSignupInput] = useState({name:"", email:"",password:""});
  const[loginInput, setLoginInput] = useState({email:"",password:""});

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e,type) => {
    const {name, value} = e.target;
    if (type === "signup"){
      setSignupInput({...signupInput, [name]: value});
    } else{
      setLoginInput({...loginInput, [name]: value});
    }
  };
   const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
   };

   useEffect(() => {
      if(registerIsSuccess && registerData){
        toast.success(registerData.message || "Signup successful.")
      }
      if(registerError){
        toast.error(registerError?.data?.message || "Signup Failed");
      }
       if(loginIsSuccess && loginData){
        toast.success(loginData.message || "login successful.");
        navigate("/");
      }
      if(loginError){
        toast.error(loginError?.data?.message || "login Failed");
      }
    }, [
      loginIsLoading,
      registerIsLoading,
      loginIsSuccess,
      registerIsSuccess,
      loginData,
      registerData,
      loginError,
      registerError,
      navigate,
   ]);

  

  return (
  <div className="flex items-center w-full justify-center mt-20">
  <Tabs defaultValue="login" className="w-[400px]">
    <TabsList className="grid w-full grid-cols-2 bg-blue-100 dark:bg-slate-800 rounded-xl">
      <TabsTrigger
        value="signup"
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-700 data-[state=active]:to-teal-600 data-[state=active]:text-white"
      >
        Sign Up
      </TabsTrigger>
      <TabsTrigger
        value="login"
        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-700 data-[state=active]:to-teal-600 data-[state=active]:text-white"
      >
        Login
      </TabsTrigger>
    </TabsList>

    {/* SIGNUP */}
    <TabsContent value="signup">
      <Card className="shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md transition hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-teal-400">Create Account</CardTitle>
          <CardDescription>
            Join us to start learning. Just fill in the details below.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="tabs-demo-name">Full Name</Label>
            <Input
              type="text"
              name="name"
              value={signupInput.name}
              placeholder="e.g. Anmol Gupta"
              onChange={(e) => changeInputHandler(e, "signup")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tabs-demo-email">Email</Label>
            <Input
              type="email"
              name="email"
              value={signupInput.email}
              placeholder="e.g. anmol@gmail.com"
              onChange={(e) => changeInputHandler(e, "signup")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tabs-demo-password">Password</Label>
            <Input
              type="password"
              name="password"
              value={signupInput.password}
              placeholder="••••••••"
              onChange={(e) => changeInputHandler(e, "signup")}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:brightness-110 text-white"
            disabled={registerIsLoading}
            onClick={() => handleRegistration("signup")}
          >
            {registerIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>

    {/* LOGIN */}
    <TabsContent value="login">
      <Card className="shadow-xl bg-white/70 dark:bg-slate-900/60 backdrop-blur-md transition hover:shadow-2xl">
        <CardHeader>
          <CardTitle className="text-blue-700 dark:text-teal-400">Welcome Back!</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="tabs-demo-login-email">Email</Label>
            <Input
              type="email"
              name="email"
              value={loginInput.email}
              placeholder="e.g. anmol@gmail.com"
              onChange={(e) => changeInputHandler(e, "login")}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="tabs-demo-login-password">Password</Label>
            <Input
              type="password"
              name="password"
              value={loginInput.password}
              placeholder="••••••••"
              onChange={(e) => changeInputHandler(e, "login")}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:brightness-110 text-white"
            disabled={loginIsLoading}
            onClick={() => handleRegistration("login")}
          >
            {loginIsLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Login"
            )}
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</div>


      
    
  )
}

export default Login;
