import styles from "./skeleton-table.module.scss";

export function SkeletonTable() {
  return (
    <tbody className={styles.table}>
      <tr>
        <td className={styles.loading}>
          <div className={styles.bar}></div>
        </td>
        <td className={styles.loading}>
          <div className={styles.bar}></div>
        </td>
        <td className={styles.loading}>
          <div className={styles.bar}></div>
        </td>
        <td className={styles.loading}>
          <div className={styles.bar}></div>
        </td>
        <td className={styles.loading}>
          <div className={styles.bar}></div>
        </td>
        <td className={styles.loading}>
          <div className={styles.bar}></div>
        </td>
      </tr>
    </tbody>
  );
}
