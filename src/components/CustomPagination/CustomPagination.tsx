import ButtonIcon from '../ButtonIcon/ButtonIcon';
import rightIcon from '../../share/assets/vector/RightIcon.svg';
import leftIcon from '../../share/assets/vector/LeftIcon.svg';
import './CustomPagination.scss';
type Props = {
  startIndex: number;
  endIndex: number;
  totalItems: number;
  onClickPreviousPage?: React.MouseEventHandler<HTMLElement>;
  onClickNextPage?: React.MouseEventHandler<HTMLElement>;
};
const CustomPagination = (props: Props) => {
  return (
    <div className="custom-pagination">
      <p className="custom-pagination__label">
        {props.startIndex} to {props.endIndex} of {props.totalItems}
      </p>
      <ButtonIcon onClickIcon={props.onClickPreviousPage} className="mr-[12px]" src={leftIcon} />
      <ButtonIcon onClickIcon={props.onClickPreviousPage} src={rightIcon} />
    </div>
  );
};

export default CustomPagination;
