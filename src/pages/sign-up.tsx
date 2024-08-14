import {Button, Input} from "@nextui-org/react";
import {ChangeEventHandler, useState} from "react";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";
import {User} from "@/models/user.model";
import {useAppDispatch} from "@/state/store";
import {createUser} from "@/state/user.reducer";
import {useRouter} from "next/router";

export default function SignUp() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<User>({userEmail: '', userName: '', firstName: '', lastName: '', userPassword: ''})
    const [isVisible, setIsVisible] = useState(false);
    const togglePasswordVisibility = () => setIsVisible(!isVisible);

    const onFieldChange = (event:  ChangeEventHandler<HTMLInputElement> | undefined) => {
        setForm({...form, [event?.target.id]: event?.target.value})
    }

    async function createUserOnClick () {
        let response = null;
        try {
            response = await dispatch(createUser(form));
            if(response.payload?.status === 200){
                await router.push('/');
            }
        } catch (e){
            console.log(e);
        }
    }

    return (
        <div className="place-items-center grid w-full h-full">
            <Input type="email" label="Email" placeholder="Enter your email" className="max-w-[400px] my-4" isRequired  id={'userEmail'} onChange={onFieldChange} value={form.userEmail}/>
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
                id={'userPassword'}
                onChange={onFieldChange}
                value={form.userPassword}
            />
            <Input type="text" label="First Name" className="max-w-[400px] my-4" isRequired id={'firstName'} onChange={onFieldChange} value={form.firstName}/>
            <Input type="text" label="Last Name" className="max-w-[400px] my-4" isRequired id={'lastName'} onChange={onFieldChange} value={form.lastName}/>
            <Input type="text" label="Username" className="max-w-[400px] my-4" isRequired id={'userName'} onChange={onFieldChange} value={form.userName}/>
            <Button color="primary" onPress={createUserOnClick}>
                Create Account
            </Button>
        </div>
    );
}