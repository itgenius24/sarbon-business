import clsx from "clsx";
import cls from "./styles.module.scss";
import { Flex } from "@chakra-ui/react";

export const CheckboxComment = ({
  register = () => {},
  name,
  className,
  children,
  type = "checkbox",
  defaultChecked = false,
  filled,
  width,
  height,
  iconSize,
  onChange,
  isDisabled = false,
  id = `1`,
  isLoading,
  ...props
}) => {
  return (
    <label
      style={{ cursor: isDisabled && `not-allowed` }}
      className={clsx(cls.checkboxLabel, className, { [cls.filled]: filled })}
    >
      {type === `radio` && (
        <Flex onClick={onChange} alignItems={`center`} gap={`12px`}>
          {
            <span
              className={defaultChecked ? cls.activeRadio : cls.radio}
              style={{ width, height, backgroundSize: iconSize }}
            ></span>
          }
          <span
            style={{ opacity: isDisabled && 0.5 }}
            className={defaultChecked ? cls.checkboxText : cls.checkboxTextNone}
          >
            {children}
          </span>
        </Flex>
      )}

      {type === `checkbox` && (
        <input
          id={id}
          disabled={isDisabled}
          className={clsx("visually-hidden", cls.checkboxInput)}
          {...register(name)}
          defaultChecked={defaultChecked}
          type={`checkbox`}
          {...props}
        />
      )}

      {type === `checkbox` && (
        <span
          style={{ opacity: isDisabled && 0.5 }}
          className={defaultChecked ? cls.checkboxText : cls.checkboxTextNone}
        >
          {children}
        </span>
      )}

      {!isLoading && type === `checkbox` && (
        <span
          className={cls.checkbox}
          style={{ width, height, backgroundSize: iconSize }}
        ></span>
      )}

      {isLoading && (
        <span
          className={cls.checkbox2}
          style={{ width, height, backgroundSize: iconSize }}
        ></span>
      )}
    </label>
  );
};
