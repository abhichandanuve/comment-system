// import { signInWithPopup } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user);
    })
    .catch((error) => {
      console.error(error);
    });
};

export default signInWithGoogle;