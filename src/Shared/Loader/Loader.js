import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ThreeDots
        visible={true}
        height={80}
        width={80}
        color="#f29fbe"
        radius={10}
        ariaLabel="three-dots-loading"
        wrapperProps={{ style: { justifyContent: "center" } }}
      />
    </div>
  );
};

export default Loader;
