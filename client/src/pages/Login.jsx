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

const Login = () => {
  return (

    <div className="flex items-center w-full justify-center">
        <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
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
                <Input type="email" placeholder="Eg. gupta" required="true" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input type="email" placeholder="Eg. gupta@gmail.com" required="true" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input type="password" placeholder="Eg. xyz@345" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Signup</Button>
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
                <Input type="email" placeholder="Eg. gupta@gmail.com" required="true" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Password</Label>
                <Input type="password" placeholder="Eg. xyz@345" required="true" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>

      
    
  )
}
export default Login;
