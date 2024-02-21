import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <section className="container mx-auto px-4 flex items-center justify-between flex-col md:flex-row my-10 h-[calc(100vh-300px)] gap-8">
      <div>
        <h1 className="text-4xl md:text-5xl">Easily Share Your Social Links</h1>
        <p className="text-xl my-12 md:text-2xl text-gray-500">
          Connect with others easily, Share your social links within seconds.
        </p>
        <button onClick={() => navigate('/sign-up')} className="button">
          Get started
        </button>
      </div>
      <img
        src="/hero_img.svg"
        style={{
          width: '550px',
        }}
        alt="illustration"
      />
    </section>
  );
};

export default Home;
