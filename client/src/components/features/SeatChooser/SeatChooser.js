import React from 'react';
import { Button, Progress, Alert } from 'reactstrap';
import './SeatChooser.scss';
import io from 'socket.io-client';


class SeatChooser extends React.Component {
  
  test = () => {
    let filterArray = this.props.seats.filter(item => item.day === this.props.chosenDay);
    let freeSeat = 50 - filterArray.length;
    console.log('filterArray:', filterArray);
    return freeSeat
  }
  state = {
    seats: '',
    freeSeats: ''
  }

  
  componentDidMount() {
    const { loadSeats, loadSeatsData } = this.props;
    loadSeats();
    // this.setState({ interval: setInterval(() => loadSeats(), 120000) });

    this.socket = io('http://localhost:8000');
    this.socket.on('seatsUpdated', (seats) => {

      loadSeatsData(seats);
      // console.log('seats:', seats);
      // przefiltruj seats, które przyszły wg wybranego dnia i przypisz do zmiennej
      let filterArray = seats.filter(item => item.day === this.props.chosenDay);
      console.log('odfiltrowane seats:', filterArray);
      // utwórz lokalną zmienną, która będzie równa 50 - długość tablicy utworzonej powyżej
      let freeSeats = 50 - filterArray.length;
      // ustawiamy nowy stan, w którym aktualizujemy seats o te nowe + lokalną zmienną
      this.setState({
        seats,
        freeSeats
      }, () => console.log('pokaż stan:', this.state))
    });
    // ostatni krok to wykorzystuje element freeSeats z nowego stanu i wrzucam go do metody render
    // this.socket.on('test', (seats) => {
    //   console.log('aktualna tablica:', seats);
    // })
  }

  // componentWillUnmount() {
  //   clearInterval(this.state.interval);
  // }

  isTaken = (seatId) => {
    const { seats, chosenDay } = this.props;
    return (seats.some(item => (item.seat === seatId && item.day === chosenDay)));
  }

  prepareSeat = (seatId) => {
    const { chosenSeat, updateSeat } = this.props;
    const { isTaken } = this;

    if (seatId === chosenSeat) return <Button key={seatId} className="seats__seat" color="primary">{seatId}</Button>;
    else if (isTaken(seatId)) return <Button key={seatId} className="seats__seat" disabled color="secondary">{seatId}</Button>;
    else return <Button key={seatId} color="primary" className="seats__seat" outline onClick={(e) => updateSeat(e, seatId)}>{seatId}</Button>;
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
        <p>Free seats: {this.test()}/50</p>
      </div>
    )
  };
}

export default SeatChooser;