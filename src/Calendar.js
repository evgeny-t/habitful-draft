import React from 'react';
import moment from 'moment';
import { withStyles } from 'material-ui-next/styles';

const styles = theme => ({
  outer: {
    border: '1px solid black',
    '& svg text': {
      fontFamily: theme.typography.fontFamily,
      fontSize: '10px',
    },
  },
  rect: {
    fill: '#eeeeee',
    '&:hover': {
      stroke: 'black',
      strokeWidth: '1px',
      shapeRendering: 'crispedges',
    }
  },
});

const daysOfWeek = [
  'Su',
  'Mo',
  'Tu',
  'We',
  'Th',
  'Fr',
  'Sa',
];

const DARK_GREEN = "#217321";
const GREY = '#eeeeee';

export const Calendar = withStyles(styles)(
  class extends React.Component {
    static defaultProps = {
      columns: 10,
      itemSize: 10,
      itemsDistance: 2,
    }

    render() {
      const { outer, rect } = this.props.classes;
      const { 
        columns, 
        itemSize,  
        itemsDistance,
      } = this.props;
      const rects = [];
      const step = itemSize + itemsDistance;
      const paddingLeft = 24;
      const paddingTop = 15;
      const fdow = moment(this.props.today).day(0);

      for (let i = 0; i < columns; ++i) {
        const lastDayOfWeek = i === columns - 1 ?
          this.props.today.day() : 6;
        const currentWeekStarts = moment(fdow)
          .day(-7 * (columns - 1 - i));
        for (let j = 0; j <= lastDayOfWeek; ++j) {
          const date = moment(currentWeekStarts).day(j);
          const color = this.props.itemColor && 
            this.props.itemColor(date)
          rects.push(
            <rect 
              className={rect}
              key={`${i}-${j}-fill`}
              width={itemSize} height={itemSize} 
              x={i * step + paddingLeft}
              y={j * step + paddingTop} 
              style={{ fill: color }}
            />
          )
        }
      }

      for (let i = 1; i < 7; i += 2) {
        rects.push((
          <text key={`row_${i}`}
            textAnchor='middle'
            x={paddingLeft >> 1}
            y={i * step + itemSize * 0.9 + paddingTop}>
            {daysOfWeek[i]}
          </text>
        ));
      }

      for (let i = columns - 1; i >= 0; i -= 2) {
        rects.push(
          <text key={`col_${i}`}
            textAnchor='middle'
            x={i * step + (itemSize >> 1) + paddingLeft}
            y={paddingTop * 0.75}>
            {moment(fdow).day(-7 * (columns - 1 - i)).date()}
          </text>
        );
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

