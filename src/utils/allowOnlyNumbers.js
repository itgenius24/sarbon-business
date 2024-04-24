export const allowOnlyNumbers = (event) => {

  if (event.key === "ArrowLeft" || event.key === "ArrowRight" || event.key === "Backspace" || event.key === "+") {
    return;
  }

  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};
