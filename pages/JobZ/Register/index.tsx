import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { register, reset } from "@/redux/authUserSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowLongLeftIcon,
  AtSymbolIcon,
  BuildingOffice2Icon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Head from "next/head";

type Props = {};

const Register = (props: Props) => {
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    email: "",
    password: "",
    passwordAgain: "",
  });

  const { name, email, password, passwordAgain, organization } = formData;

  const router = useRouter();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.authUser
  );

  useEffect(() => {
    if (isError) {
      setError(message);
    }

    if (isSuccess && user) {
      router.push("/Offers/Dashboard");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, router, dispatch]);

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const passValidateRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/ 

    if(!passValidateRegex.test(password) || !passValidateRegex.test(passwordAgain)){
      setError("Not valid password! Password must contain, 6-20 characters, including at least 1 upper and lowercase letter, 1 number and 1 symbol.")
      return
    }

    if (password !== passwordAgain) {
      setError("Passwords do not match");
    } else {
      const userData = {
        name,
        organization,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  return (
    <div className="flex flex-col bg-jobzBlack h-screen justify-evenly items-center">
      <Head>
        <title>Alpovka JobZ/Register</title>
        <meta
          name="description"
          content="Alpovka JobZ Entrance"
        />
        <link rel="icon" type="image/png" href="../images/favicon.png" />
      </Head>
      <Link
        href={"/JobZ"}
        className="absolute top-5 left-5 cta flex items-center justify-center self-start scale-[75%]"
      >
        <ArrowLongLeftIcon
          id="arrow-horizontal"
          className="text-jobzWhite"
          width={24}
          height={24}
          style={{
            marginBottom: 6,
          }}
        />
        <span className="hover-underline-animation">Back</span>
      </Link>

      <section>
        <form
          onSubmit={onSubmit}
          className={`form w-[95vw] text-xs sm:w-[550px] sm:text-base font-titillium text-jobzWhite ${
            error && "hover:border-jobzOrange"
          }`}
        >
          <p id="heading">Sign Up</p>
          <div className="field">
            <UserIcon className="input-icon" />
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
              autoComplete="off"
              className="input-field"
              required
            />
          </div>
          <div className="field">
            <BuildingOffice2Icon className="input-icon" />
            <input
              type="text"
              id="organization"
              name="organization"
              value={organization}
              placeholder="Organization name (Optional)"
              onChange={onChange}
              className="input-field"
              autoComplete="off"
            />
          </div>
          <div className="field">
            <AtSymbolIcon className="input-icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={onChange}
              autoComplete="off"
              className="input-field"
              required
            />
          </div>
          <div className="field">
            <LockClosedIcon className="input-icon" />
            <input
              type="password"
              className="input-field"
              id="password"
              name="password"
              value={password}
              placeholder="6-20 characters, including at least 1 upper and lowercase letter, 1 number and 1 symbol."
              autoComplete="off"
              onChange={onChange}
              required
            />
          </div>
          <div className="field">
            <LockClosedIcon className="input-icon" />
            <input
              type="password"
              className="input-field"
              id="passwordAgain"
              name="passwordAgain"
              value={passwordAgain}
              placeholder="Confirm your password"
              onChange={onChange}
              autoComplete="off"
              required
            />
          </div>
         {error &&  <p className="text-jobzOrange text-center mt-4">{error}</p>}
          <button className="button1 mt-4">Create your account</button>
          <div className="flex items-center justify-around my-8">
            <p className="text-center">I have an account</p><span>-></span>
            <button
              className="button2 text-center"
              onClick={() => router.push("/JobZ/Login")}
            >
              Login
            </button>
          </div>
        </form>
      </section>
      <footer className="font-titillium text-jobzWhite text-xs">
        <p className="text-center">Alperen KARAVELIOGLU &copy; 2023</p>
      </footer>
    </div>
  );
};

export default Register;
