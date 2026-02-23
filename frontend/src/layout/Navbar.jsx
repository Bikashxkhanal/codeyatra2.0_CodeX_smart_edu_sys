

const Navbar = () => {
const currentUser = {
    fullName : "Bikash khanal", 
    role : "admin"
  }
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="font-semibold text-lg">
        Welcome, {currentUser?.name}
      </h1>
      <p className="text-sm text-gray-500 capitalize">
        {currentUser?.role}
      </p>
    </div>
  );
};

export default Navbar;