import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import './SeatChooser.scss';
import io from 'socket.io-client';


class SeatChooser extends React.Component {

  state = {
    seats: [],
  }

  calculateFreeSeats = () => {
    let filterArray = this.props.seats.filter(
      item => item.day === this.props.chosenDay
    );
    let freeSeats = 50 - filterArray.length;
    console.log('filterArray:', filterArray);
    return freeSeats;
  }

  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    loadSeats();

    this.socket = io(
      process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000'
    );
    this.socket.on('seatsUpdated', (seats) => {
      this.setState({ seats });
      loadSeatsData(seats);
    });
  }

  componentDidUpdate(newProps, oldProps) {
    if (newProps.seats.length !== oldProps.seats.length) {
      const { seats } = newProps;
      this.setState({ seats })
    }
  }

  isTaken = (seatId) => {
    const { chosenDay } = this.props;
    const { seats } = this.state;
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat) 
    return (
    <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>
    );
    else if (isTaken(seatId)) 
    return (
    <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>);
    else 
    return (
    <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>);
  }

  render() {

    const { prepareSeat } = this;
    const { requests } = this.props;

    return (
      <div>
        <h3>Pick a seat</h3>
        <small id="pickHelp" className="form-text text-muted ml-2"><Button color="secondary" /> – seat is already taken</small>
        <small id="pickHelpTwo" className="form-text text-muted ml-2 mb-4"><Button outline color="primary" /> – it's empty</small>
        {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].success) && <div className="seats">{[...Array(50)].map((x, i) => prepareSeat(i + 1))}</div>}
        {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].pending) && <Progress animated color="primary" value={50} />}
        {(requests['LOAD_SEATS'] && requests['LOAD_SEATS'].error) && <Alert color="warning">Couldn't load seats...</Alert>}
        <p>Free seats: {this.calculateFreeSeats()}/50</p>
      </div>
    )
  };
}

export default SeatChooser;