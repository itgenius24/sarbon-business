import cls from "./styles.module.scss";

export const LoadingSpinner = () => {
  return (
    <div className={cls.loadingSpinnerOverlay}>
      <div className={cls.loadingSpinner}></div>
    </div>
  );
};
