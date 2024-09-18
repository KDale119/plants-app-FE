import {
    Button,
    Modal,
    ModalContent, ModalHeader, Input, ModalBody
} from "@nextui-org/react";
import {ChangeEventHandler, useEffect, useState} from "react";
import {User} from "@/models/user.model";
import {updateUser} from "@/state/user.reducer";
import {useRouter} from "next/router";
import {useAppDispatch} from "@/state/store";
import {EyeFilledIcon, EyeSlashFilledIcon} from "@nextui-org/shared-icons";

export type UpdateProfileModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    currentUser: User;
}

export default function UpdatePasswordModal(props: UpdateProfileModalProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const togglePasswordVisibility = () => setIsVisible(!isVisible);

    const [form, setForm] = useState<any>({
        password: '',
        confirmPassword: ''
    });

    const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

    const onFieldChange = (event:  any | undefined) => {
        setForm({...form, [event?.target.id]: event?.target.value})
    }

    useEffect(() => {
        if(!props.open){
            setForm({
                password: '',
                confirmPassword: ''
            });
        }
    }, [props.open])

    async function updatePassword() {
        let response = null;
        setUpdateProfileLoading(true);
        try {

            response = await dispatch(updateUser({...props.currentUser, userPassword: form.confirmPassword}));
            if(response.payload?.status === 200){
                props.setOpen(false);
                await router.push('/profile');
            }
        } catch (e){
            console.log(e);
        } finally {
            setUpdateProfileLoading(false);
        }
    }

    return (
        <>
            <Modal isOpen={props.open} onClose={() => props.setOpen(false)}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 text-black">Update Password</ModalHeader>
                    <ModalBody>
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
                            className="max-w-[400px] my-4 text-black"
                            id={'password'}
                            onChange={onFieldChange}
                            value={form.password}
                        />
                        <Input
                            label="Confirm Password"
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
                            className="max-w-[400px] my-4 text-black"
                            id={'confirmPassword'}
                            onChange={onFieldChange}
                            value={form.confirmPassword}
                        />
                        <Button color="primary" isDisabled={form.password !== form.confirmPassword} onPress={updatePassword} isLoading={updateProfileLoading}>
                            Update Password
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}