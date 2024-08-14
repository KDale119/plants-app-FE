import {Button, Input, Link} from "@nextui-org/react";
import {useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";

export default function SignUp() {

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
                    <button className="focus:outline-none" type="button" onClick={togglePasswordVisibility} aria-label="toggle password visibility">
                        {isVisible ? (
                            <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                            <EyeFilledIcon  className="text-2xl text-default-400 pointer-events-none" />
                        )}
                    </button>
                }
                type={isVisible ? "text" : "password"}
                className="max-w-[400px] my-4"
            />
            <Input type="text" label="First Name" className="max-w-[400px] my-4" isRequired/>
            <Input type="text" label="Last Name" className="max-w-[400px] my-4" isRequired/>
            <Input type="text" label="Username" className="max-w-[400px] my-4" isRequired/>
            <Button color="primary">
                Create Account
            </Button>
        </div>
    );
}