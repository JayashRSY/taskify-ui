import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-12">
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold">Your Ultimate Task Manager</h1>
            <p className="mt-4 text-lg">
              Collaborate, organize, and achieve more with our powerful task
              management tool.
            </p>
            <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg">
              <Link to="/signin">Get Started</Link>
            </button>
          </div>
        </header>

        {/* Features Section */}
        <section className="container mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-600">Features</h2>
            <p className="text-lg text-gray-600 mt-2">
              Everything you need to manage your tasks efficiently.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-blue-500">
                Create & Edit Tickets
              </h3>
              <p>
                Create and manage tasks easily with our intuitive interface.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-green-500">
                Collaborate with Teammates
              </h3>
              <p>Invite your colleagues and work together in real-time.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-2xl font-semibold mb-4 text-purple-500">
                Private & Public Boards
              </h3>
              <p>
                Set your boards to private or public and control who has access.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-green-400 to-blue-500 py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold text-white">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white mt-4">
              Sign up now and take your productivity to the next level.
            </p>
            <button className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded-lg transition duration-300 shadow-lg">
              <Link to="/signup">Sign Up</Link>
            </button>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto text-center">
            <p>Made with ❤️ be Jayash</p>
          </div>
        </footer>
      </div>
    </>
  );
};
export default Home;
