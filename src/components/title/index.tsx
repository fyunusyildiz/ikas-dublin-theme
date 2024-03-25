import { observer } from 'mobx-react-lite';
import { TitleProps } from '../__generated__/types';

const Title: React.FC<TitleProps> = (props) => {
  const { title } = props;
  return <div className="text-2xl w-full text-center">{title}</div>;
};

export default observer(Title);