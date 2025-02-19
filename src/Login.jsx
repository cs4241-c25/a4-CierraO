import './App.css'
import { 
  Button,
  Typography,
  Card,
} from "@material-tailwind/react";

export function Login() {
  return (
    <>
      <Card className="mt-20 mx-120 p-8">
        <Typography variant="h1" className="mb-5 text-center">Log In</Typography>
          <Button><a href="/auth/github">Log in with GitHub</a></Button>
      </Card>
    </>
  )
}