import {useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";
import {Button, Link} from "@nextui-org/react";
import UpdateProfileModal from "@/components/update-profile-modal";
import {useState} from "react";
import UpdatePasswordModal from "@/components/update-password-modal";
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
        <div className="p-2 inline-grid gap-40 grid-cols-3">
            <div>
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
            </div>
            <div>
                <Button color="primary" className="m-4" onClick={() => passingEmail(currentUser.userEmail)}>
                    View/Edit Wishlist
                </Button>
            </div>
            <div>
                <p>Need to know what plant suits your lifestyle best?</p>
                <Button color="primary" className="m-4" onClick={() => router.push('/quiz')}>
                    Take our quiz
                </Button>
            </div>
        </div>
    );
}
