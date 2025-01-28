import cls from "./styles.module.scss";

export const LoadingSpinnerMap = () => {
  return (
    <div className={cls.loadingSpinnerOverlay}>
      <div className={cls.loadingSpinner}></div>
    </div>
  );
};
