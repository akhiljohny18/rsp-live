// loading/index.tsx
import { Wave } from "react-css-spinners";

function Loading() {
  return (
    <div style={styles.loaderContainer}>
      <Wave
        color="rgba(116,136,202,1)"
        size={76}
        thickness={15}
      />
    </div>
  );
}

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
  },
};

export default Loading;
