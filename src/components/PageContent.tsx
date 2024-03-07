const PageContent: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="mt-10">
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
