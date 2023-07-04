const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="mx-auto mb-8 mt-20 h-full max-w-screen-xl">
      <div className="flex h-full flex-col justify-center border-slate-900">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
