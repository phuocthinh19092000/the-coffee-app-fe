type Props = {
  onClick: React.MouseEventHandler<HTMLElement>;
  src?: string;
  alt?: string;
  title?: string;
};
const LeftSideBarItem = (props: Props) => {
  return (
    <div className="flex flex-col h-1.5 mx-1 my-3 justify-center text-center items-center" onClick={props.onClick}>
      <img src={props.src} alt={props.alt} className="mb-1 h-fit w-fit" />
      <span className="">{props.title}</span>
    </div>
  );
};
export default LeftSideBarItem;
