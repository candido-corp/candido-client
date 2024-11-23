type PageContentProps = {
  title: string;
  children: React.ReactNode;
};

const PageContent: React.FC<PageContentProps> = ({ title, children }) => {
  return (
    <div className="m-10">
      <h1 className="pb-5 text-2xl">{title}</h1>
      {children}
    </div>
  );
};

export default PageContent;
