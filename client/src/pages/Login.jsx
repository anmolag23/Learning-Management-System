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
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input type="email" 
                name = "name"
                value = {signupInput.name}
                placeholder="Eg. gupta"
                onChange={(e)=> changeInputHandler(e,"signup")} 
                required={true} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input type="email"
                 name = "email"
                 value = {signupInput.email}
                 placeholder="Eg. gupta@gmail.com" 
                 onChange={(e)=> changeInputHandler(e,"signup")} 
                 required={true} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input type="password" 
                name = "password"
                value = {signupInput.password}
                placeholder="Eg. xyz@345"
                onChange={(e)=> changeInputHandler(e,"signup")} 
                required={true} />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={registerIsLoading} onClick={() => handleRegistration("signup")}>
                {
                  registerIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
                    </>
                  ) : "Signup"
                }
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login your password here. After signup, you'll be logged in.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input type="email"
                 name="email"
                 value={loginInput.email}
                 placeholder="Eg. gupta@gmail.com" 
                 onChange={(e)=> changeInputHandler(e,"login")} 
                 required={true} />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Password</Label>
                <Input type="password"
                 name="password"
                 value={loginInput.password}
                 placeholder="Eg. xyz@345"
                 onChange={(e)=>changeInputHandler(e,"login")} 
                 required={true} />

              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={loginIsLoading} onClick={() => handleRegistration("login")}>
                {
                  loginIsLoading ? (
                    <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait
                    </>
                  ) : "Login"
                }
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

      
    
  )
}

export default Login;
