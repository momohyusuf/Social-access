import GoogleSignInAuth from "../components/auth/GoogleOauth";

const Home = () => {
  return (
    <section className="container mx-auto px-4 flex items-center justify-between flex-col md:flex-row my-10 h-[calc(100vh-300px)] gap-8">
      <div>
        <h1 className="text-4xl text-white md:text-5xl">
          Easily Share Your Social Links
        </h1>
        <p className="text-xl my-12 md:text-2xl text-slate-400">
          Connect with others easily, Share your social links within seconds.
        </p>
        <GoogleSignInAuth />
      </div>
      <img
        src="/hero_img.svg"
        style={{
          width: "550px",
        }}
        alt="illustration"
      />
    </section>
  );
};

export default Home;
