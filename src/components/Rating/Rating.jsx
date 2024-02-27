import cls from "./styles.module.scss";

export const Rating = ({ value, title }) => {

  return <div className={cls.rating}>
    {
      Array.from(Array(5).keys()).map((_, index) => (
        <span key={index}>
          <svg width="16" height="15" viewBox="0 0 16 15" fill="none">
            <path d="M7.99994 12.3911L11.4583 14.4828C12.0916 14.8661 12.8666 14.2995 12.6999 13.5828L11.7833 9.64948L14.8416 6.99948C15.3999 6.51615 15.0999 5.59948 14.3666 5.54115L10.3416 5.19948L8.76661 1.48281C8.48327 0.807813 7.51661 0.807813 7.23327 1.48281L5.65827 5.19115L1.63327 5.53281C0.899939 5.59115 0.599938 6.50781 1.15827 6.99115L4.21661 9.64115L3.29994 13.5745C3.13327 14.2911 3.90827 14.8578 4.54161 14.4745L7.99994 12.3911Z" fill={index + 1 <= value ? "#F8C51B" : "#D5DADD"} />
          </svg>
        </span>
      ))
    }
    <span className={cls.title}>{title}</span>
  </div>;
};
