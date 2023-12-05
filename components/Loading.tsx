import styles from "@/styles/loading.module.css";

import LoadingIcon from "./LoadingIcon";

export default function Loading() {
  return (
    <div className={styles.container}>
      <LoadingIcon height="50px" width="50px" />
    </div>
  );
}
