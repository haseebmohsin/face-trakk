import { ColorRing, ThreeDots } from 'react-loader-spinner';

export default function Loader(props) {
  const { isLoading, className, color, width, height } = props;

  const defaultColors = ['#b8c480', '#B2A3B5', '#852B1F', '#0B6E00', '#42A651'];

  const colors = color ? [color, color, color, color, color] : defaultColors;

  return (
    <div className={className}>
      <ColorRing
        visible={isLoading}
        height={height ?? '40'}
        width={width ?? '50'}
        colors={colors}
        wrapperClass='blocks-wrapper'
        wrapperStyle={{}}
        ariaLabel='blocks-loading'
      />
    </div>
  );
}
