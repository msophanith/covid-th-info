import React, { PureComponent } from 'react';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Navbar,
  Container,
  Row,
  Container,
  Col,
  Card,
  CardGroup
} from 'react-bootstrap';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataTimeline: [],
      dataTimeline15: [],
      results: {
        updatedDate: '',
        confirmed: '',
        hospitalized: '',
        deaths: '',
        recovered: '',
        newConfirmed: '',
        newHospitalized: '',
        newDeaths: '',
        newRecovered: ''
      },
      data_pie: [{}]
    };
  }

  fetchData() {
    axios
      .get('https://covid19.th-stat.com/api/open/timeline')
      .then(response => {
        console.log(response.data);
        const data = response.data['Data'];
        const lastData = data.slice(-1)[0];
        this.setState({
          dataTimeline: data,
          dataTimeline15: data.slice(1).slice(-15),
          results: {
            source: response.data['Source'],
            updatedDate: lastData['Date'],
            confirmed: lastData['Confirmed'],
            hospitalized: lastData['Hospitalized'],
            deaths: lastData['Deaths'],
            recovered: lastData['Recovered'],
            newConfirmed: lastData['NewConfirmed'],
            newHospitalized: lastData['NewHospitalized'],
            newDeaths: lastData['NewDeaths'],
            newRecovered: lastData['NewRecovered']
          },
          data_pie: [
            { name: 'hospitalized', value: lastData['Hospitalized'] },
            { name: 'deaths', value: lastData['Deaths'] },
            { name: 'recovered', value: lastData['Recovered'] }
          ]
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { dataTimeline, dataTimeline15, results, data_pie } = this.state;
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Covid-19 Thailand Info</Navbar.Brand>
          </Container>
        </Navbar>
        <br />
        <Container>
          <Row>
            <Col>
              <Card
                border="primary"
                style={{ width: '14rem' }}
                className="text-center"
              >
                <Card.Header>Confirmed Cases</Card.Header>
                <Card.Body>
                  <Card.Title>{results.confirmed.toLocaleString()}</Card.Title>
                  <Card.Text>
                    New Cases
                    <br />
                    (+{results.newConfirmed.toLocaleString()})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                border="warning"
                style={{ width: '14rem' }}
                className="text-center"
              >
                <Card.Header>Hospitalized</Card.Header>
                <Card.Body>
                  <Card.Title>
                    {results.hospitalized.toLocaleString()}
                  </Card.Title>
                  <Card.Text>
                    New Hospitalized
                    <br />({results.newHospitalized.toLocaleString()})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                border="danger"
                style={{ width: '14rem' }}
                className="text-center"
              >
                <Card.Header>Deaths</Card.Header>
                <Card.Body>
                  <Card.Title>{results.deaths.toLocaleString()}</Card.Title>
                  <Card.Text>
                    New Deaths
                    <br />
                    (+{results.newDeaths.toLocaleString()})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                border="success"
                style={{ width: '14rem' }}
                className="text-center"
              >
                <Card.Header>Recovered</Card.Header>
                <Card.Body>
                  <Card.Title>{results.recovered.toLocaleString()}</Card.Title>
                  <Card.Text>
                    New Recovered
                    <br />
                    (+{results.newRecovered.toLocaleString()})
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <br />
          <CardGroup>
            <Card>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  width={500}
                  height={400}
                  data={dataTimeline15}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 2
                  }}
                >
                  <CartesianGrid strokeDasharray="5 5" />
                  <XAxis dataKey="Date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="NewConfirmed" fill="#1c6bff" />
                  <Bar dataKey="NewDeaths" fill="#f52900" />
                  <Bar dataKey="NewRecovered" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card>
              {' '}
              <ResponsiveContainer width="100%" height={400}>
                <PieChart width={400} height={400}>
                  <Legend />
                  <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data_pie}
                    outerRadius={100}
                    label
                  >
                    <Cell fill="#e0bf60" />
                    <Cell fill="#f52900" />
                    <Cell fill="#8FC1A9" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </CardGroup>
          <br />
          <CardGroup>
            <ResponsiveContainer width="100%" height={500}>
              <LineChart
                data={dataTimeline}
                margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Confirmed"
                  stroke="blue"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Hospitalized"
                  stroke="#e0bf60"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Deaths"
                  stroke="red"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Recovered"
                  stroke="green"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardGroup>
          <Card.Footer className="text-center">
            Made with ❤️
            <br />
            Get Source Code
          </Card.Footer>
        </Container>
      </div>
    );
  }
}
