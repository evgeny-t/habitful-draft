import React from 'react';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
  outer: {
    border: '1px solid black',
    '& svg text': {
      ...theme.typography,
      // fontSize: '20px',
      // fontFamily: 'Roboto',
    }
  }
});

const daysOfWeek = [
  'Sun',
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
];

export const Calendar = withStyles(styles)(
  class extends React.Component {
    static defaultProps = {
      columns: 10,
    }

    render() {
      const { outer } = this.props.classes;
      const { columns } = this.props;
      const rects = [];
      const paddingRight = 22;
      for (let i = 0; i < columns; ++i) {
        for (let j = 0; j < 7; ++j) {
          rects.push(
            <rect 
              key={`${i}-${j}-fill`}
              width="10" height="10" 
              x={i * 12 + 2 + paddingRight}
              y={j * 12 + 2} 
              fill="#217321" 
            />
          )
        }
      }

      for (let i = 1; i < 7; i += 2) {
        rects.push((
          <text key={`row_${i}`}
            textAnchor='middle'
            x={paddingRight >> 1}
            y={i * 12 + 12 - 1}>
            {daysOfWeek[i]}
          </text>
        ));
      }
      
      return (
        <div className={outer}>
          <svg>
            {rects}
          </svg>
        </div>
      );
    }
  }
);

