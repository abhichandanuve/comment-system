import signInWithGoogle from "../auth/signInWithGoogle";

const Header = () =>{
    return(
        <div onClick={()=>signInWithGoogle()}>
            Sign with the Google
        </div>
    )
}

export default Header;
