import Statistic from './Statistic';

const Statistics = props => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Good</td>
          <td>{props.good}</td>
        </tr>
        <tr>
          <td>Bad</td>
          <td>{props.bad}</td>
        </tr>
        <tr>
          <td>Neutral</td>
          <td>{props.neutral}</td>
        </tr>
        <tr>
          <td>All</td>
          <td>
            <Statistic label="All" operation={props.totalFeedback()} />
          </td>
        </tr>
        <tr>
          <td>Average</td>
          <td>
            <Statistic label="Average" operation={props.average()} />
          </td>
        </tr>
        <tr>
          <td>Positive</td>
          <td>
            <Statistic label="Positive" operation={props.percentagePositiveFeedback()} />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Statistics;
