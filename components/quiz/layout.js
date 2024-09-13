import Sidebar from "../Sidebar/Sidebar";

const Layout = ({ children }) => {
    return (
      <>
        <Sidebar />
        <div className="site--content pageCenterWidth">
          <div className="page--title--block">
            <div
              className="page--title--block"
              style={{ background: "white", padding: 20 }}
            >
              {children}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Layout;