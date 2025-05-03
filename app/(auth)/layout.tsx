import React from "react";

const Layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="flex-center min-h-screen w-full text-primary-500">
      {children}
    </main>
  );
};

export default Layout;
