interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full mx-auto rounded-bl-lg rounded-br-lg bg-zinc-800">
      {children}
    </div>
  );
};

export default Container;
