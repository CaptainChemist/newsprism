import { Nav } from './nav';

export const Layout = ({ children }) => {
  return (
    <div className="p-4">
      <Nav />
      {children}
    </div>
  );
};
