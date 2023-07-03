const MainLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="mx-auto mb-8 mt-20 h-full max-w-screen-xl">
      <div className="flex h-full flex-col justify-center border-b-2 border-slate-900 xl:border-l-2 xl:border-r-2">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
