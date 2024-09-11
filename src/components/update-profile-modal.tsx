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

export type UpdateProfileModalProps = {
    open: boolean;
    setOpen: (boolean) => void;
    currentUser: User;
}

export default function UpdateProfileModal(props: UpdateProfileModalProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const [form, setForm] = useState<User>({
        userEmail: props.currentUser.userEmail,
        userName: props.currentUser.userName,
        firstName: props.currentUser.firstName,
        lastName: props.currentUser.lastName,
        userPassword: props.currentUser.userPassword
    });
    const [updateProfileLoading, setUpdateProfileLoading] = useState(false);

    const onFieldChange = (event:  ChangeEventHandler<HTMLInputElement> | undefined) => {
        setForm({...form, [event?.target.id]: event?.target.value})
    }

    useEffect(() => {
        if(!props.open){
            setForm({
                userEmail: props.currentUser.userEmail,
                userName: props.currentUser.userName,
                firstName: props.currentUser.firstName,
                lastName: props.currentUser.lastName,
                userPassword: props.currentUser.userPassword
            });
        }
    }, [props.open])

    async function updateUserOnClick() {
        let response = null;
        setUpdateProfileLoading(true);
        try {
            response = await dispatch(updateUser(form));
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
                    <ModalHeader className="flex flex-col gap-1 text-black">Update Profile</ModalHeader>
                    <ModalBody>
                        <Input type="email" label="Email" placeholder="Enter your email" className="max-w-[400px] my-4" isRequired  id={'userEmail'} onChange={onFieldChange} isDisabled={true} value={form.userEmail}/>
                        <Input type="text" label="First Name" className="max-w-[400px] my-4" isRequired id={'firstName'} onChange={onFieldChange} value={form.firstName}/>
                        <Input type="text" label="Last Name" className="max-w-[400px] my-4" isRequired id={'lastName'} onChange={onFieldChange} value={form.lastName}/>
                        <Input type="text" label="Username" className="max-w-[400px] my-4" isRequired id={'userName'} onChange={onFieldChange} value={form.userName}/>
                        <Button color="primary" onPress={updateUserOnClick} isLoading={updateProfileLoading}>
                            Update Account
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}