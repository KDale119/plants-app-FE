import {Button, Input, Link} from "@nextui-org/react";
import {ChangeEventHandler, useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {User} from "@/models/user.model";
import {loginUser} from "@/state/user.reducer";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/state/store";

export default function Login() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<Pick<User, "userEmail" | "userPassword">>({userEmail: '', userPassword: ''})
    const [isVisible, setIsVisible] = useState(false);
    const togglePasswordVisibility = () => setIsVisible(!isVisible);

    const onFieldChange = (event:  ChangeEventHandler<HTMLInputElement> | undefined) => {
        setForm({...form, [event?.target.id]: event?.target.value})
    }

    async function loginClick () {
        let response = null;
        try {
            response = await dispatch(loginUser(form));
            if(response.payload?.status === 200){
                await router.push('/');
            }
        } catch (e){
            console.log(e);
        }
    }

    return (
        <div className="place-items-center grid w-full h-full">
            <Input type="email" label="Email" placeholder="Enter your email" className="max-w-[400px] my-4" isRequired id={'userEmail'} onChange={onFieldChange} value={form.userEmail}/>
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
                id={'userPassword'}
                onChange={onFieldChange}
                value={form.userPassword}
            />
            <Button color="primary" onPress={loginClick}>
                Sign in
            </Button>
            <p className="my-4">New user? Click <Link href="/sign-up">here</Link> to create a new account</p>
        </div>
    );
}