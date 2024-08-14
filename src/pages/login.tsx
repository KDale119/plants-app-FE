import {Button, Input, Link} from "@nextui-org/react";
import {useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";

export default function Login() {

    const [isVisible, setIsVisible] = useState(false);
    const togglePasswordVisibility = () => setIsVisible(!isVisible);

    return (
        <div className="place-items-center grid w-full h-full">
            <Input type="email" label="Email" placeholder="Enter your email" className="max-w-[400px] my-4" isRequired/>
            <Input
                label="Password"
                variant="bordered"
                placeholder="Enter your password"
                isRequired
                endContent={
                    <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility}
                            aria-label="toggle password visibility">
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                        ) : (
                            <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none"/>
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-[400px] my-4"
            />
            <Button color="primary">
                Sign in
            </Button>
            <p className="my-4">New user? Click <Link href="/sign-up">here</Link> to create a new account</p>
        </div>
    );
}