import {useAppSelector} from "@/state/store";
import {selectCurrentUser} from "@/state/user.reducer";

export default function Home() {
  const currentUser = useAppSelector(selectCurrentUser);
  return (
    <>
    <h1>{currentUser ? 'Welcome ' + currentUser.firstName + ', you are logged in!': 'Welcome, you are not currently logged in!'}</h1>
    </>
  );
}
