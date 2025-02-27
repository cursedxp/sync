import Link from "next/link"
import TextField from "@/app/components/common/TextField"
export default function RegisterPage() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className="max-w-xl w-full">
                <h1 className="text-4xl font-bold my-4">Register</h1>
                <div className="mb-4">
                    <p>Already have an account? <Link href="/auth/login" className="font-semibold underline">Log in</Link></p>
                </div>
                <form>
                    <TextField label="Email address" name="email" type="email" placeholder="you@example.com" value=""  />
                    <TextField label="Password" name="password" type="password" placeholder="" value=""  />
                </form>
            </div>
        </div>
    )
}