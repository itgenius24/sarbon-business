import styles from './style.module.scss';

export const ModalMap = ({
  isOpen,
  onClose,
  children,
  title = "",
  firstBtnText = "Отменить",
  secondBtnText = "Сохранить",
  firstBtnCallback,
  secondBtnCallback = () => {},
  oneBtn = false,
  withCloseBtn,
  width,
  withFooter = true,
  isDisabled,
  firstBtnProps = {},
  secondBtnProps = {},
  ...props
}) => {
  return (
    <div className={styles.modalWrap}>
      <div onClick={onClose} className={styles.overlay}>

      </div>
      <div className={styles.modalContend}>
        {children}
      </div>
    </div>
  );
};
