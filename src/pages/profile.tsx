import {useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import {Button, Link} from "@nextui-org/react";
import UpdateProfileModal from "@/componenets/update-profile-modal";
import {useState} from "react";
import UpdatePasswordModal from "@/componenets/update-password-modal";
import {useRouter} from "next/router";

export default function Profile() {
    const router = useRouter();

    const currentUser = useAppSelector(selectCurrentUser);
    const [openUpdateProfile, setOpenUpdateProfile] = useState(false);
    const [openUpdatePassword, setOpenUpdatePassword] = useState(false);

    const passingEmail = (d: any) => {
        router.push({
            pathname: "/wishlist",
            query: {
                userEmail: d.userEmail
            },
        });
    };
    return (
        <>
            <UpdateProfileModal  currentUser={currentUser} open={openUpdateProfile} setOpen={setOpenUpdateProfile}/>
            <UpdatePasswordModal open={openUpdatePassword} setOpen={setOpenUpdatePassword} currentUser={currentUser} />

            <h1 className="m-2 ms-8">Profile for: {currentUser.firstName} {currentUser.lastName}</h1>
            <h1 className="m-2 ms-8">Email: {currentUser.userEmail}</h1>
            <h1 className="m-2 ms-8">Username: {currentUser.userName}</h1>
            <Button color="primary" className="m-4" onPress={() => setOpenUpdateProfile(true)}>
                Edit Profile
            </Button>
            <Button color="primary" className="m-4" onPress={() => setOpenUpdatePassword(true)}>
                Update Password
            </Button>
            <Button color="primary" className="m-4" onClick={() => passingEmail(currentUser.userEmail)}>
                Wishlist
            </Button>
        </>
    );
}
