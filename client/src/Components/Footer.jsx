import React from "react";
import ReactDOM from "react-dom";

const Header = () => <header className="bg-blue-500 p-4 text-white">Header</header>;

const Footer = () => {
  return (
    <footer className="bg-slate-200 min-h-[80px] mb-5">
      <div className="container mx-auto p-4">
        <p className="text-center font-bold">Dynamic Coding with Sajid</p>
      </div>
    </footer>
  );
};
export default Footer
