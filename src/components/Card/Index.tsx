// import { Form as form } from 'react-bootstrap';
import { ReactChild } from 'react';
import useComponentVisible from '../../utils/useComponentVisible';
import './styles.scss';

type Props = {
  className: string;
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
};

const Card = (props: Props) => {
  const { ref, isComponentVisible } = useComponentVisible(true);

  return <div ref={ref}>{isComponentVisible && <div className={props.className}> {props.children} </div>}</div>;
};

export default Card;
