import React from 'react';
import ContentLoader from 'react-content-loader';
import useWindowWidth from '../../utils/useWindowWidth';

const OrdersLoader = (props) => {
  const windowWidth = useWindowWidth();
  return (
    <ContentLoader
      width={windowWidth[0] > 1150 ? 1200 : windowWidth[0] - 10}
      height={400}
      viewBox={`0 0 ${windowWidth[0] > 1150 ? 1200 : windowWidth[0] - 10} 400`}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      
      <rect x={windowWidth[0] ?  (windowWidth[0]/8 - 10).toString(): "67" } y="140" rx="10" ry="10"  width= {windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*2 - 10).toString() : "187"} y="141" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*3 - 10).toString() : "402"} y="140" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*4 - 10).toString() : "523"} y="141" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*5 - 10).toString() : "731"} y="139" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*6 - 10).toString() : "852"} y="138" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />



      <rect x={windowWidth[0] ?  (windowWidth[0]/8 - 10).toString(): "67" }   y="197"    rx="10" ry="10"  width= {windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*2 - 10).toString() : "187"}  y="198" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*3 - 10).toString() : "402"}  y="197" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*4 - 10).toString() : "523"}  y="198" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*5 - 10).toString() : "731"}  y="196" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*6 - 10).toString() : "852"}  y="195" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />



      <rect x={windowWidth[0] ?  (windowWidth[0]/8 - 10).toString(): "67" }   y="259"    rx="10" ry="10"  width= {windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*2 - 10).toString() : "187"}  y="260" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*3 - 10).toString() : "402"}  y="259" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*4 - 10).toString() : "523"}  y="260" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*5 - 10).toString() : "731"}  y="258" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*6 - 10).toString() : "852"}  y="257" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />



      <rect x={windowWidth[0] ?  (windowWidth[0]/8 - 10).toString(): "67" }   y="317"    rx="10" ry="10"  width= {windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*2 - 10).toString() : "187"}  y="318" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*3 - 10).toString() : "402"}  y="317" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*4 - 10).toString() : "523"}  y="318" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*5 - 10).toString() : "731"}  y="316" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*6 - 10).toString() : "852"}  y="315" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />



      <rect x={windowWidth[0] ?  (windowWidth[0]/8 - 10).toString(): "67" }   y="380"    rx="10" ry="10"  width= {windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*2 - 10).toString() : "187"}  y="381" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*3 - 10).toString() : "402"}  y="380" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*4 - 10).toString() : "523"}  y="381" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*5 - 10).toString() : "731"}  y="379" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*6 - 10).toString() : "852"}  y="378" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />



      <rect x={windowWidth[0] ?  (windowWidth[0]/8 - 10).toString(): "67" }   y="380"    rx="10" ry="10"  width= {windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*2 - 10).toString() : "187"}  y="381" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() :"169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*3 - 10).toString() : "402"}  y="380" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}  height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*4 - 10).toString() : "523"}  y="381" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "169"} height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*5 - 10).toString() : "731"}  y="379" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />
      <rect x={windowWidth[0] ? (windowWidth[0]/8*6 - 10).toString() : "852"}  y="378" rx="10" ry="10" width={windowWidth[0] < 1150 ? (windowWidth[0]/8 - 10).toString() : "85"}   height="19" />

    </ContentLoader>
  );
};

export default OrdersLoader;
