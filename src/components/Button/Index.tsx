import './styles.scss';
type Props = {
  className: string;
  titleButton: string;
  type?: string | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

const Button = (props: Props) => {
  return (
    <button className={props.className} onClick={props.onClick} type="submit">
      {props.titleButton}
    </button>
  );
};
export default Button;
