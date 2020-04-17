import React, { Component } from 'react';
import { MdCloudQueue, MdArrowUpward, MdArrowDownward } from 'react-icons/md';
import './style.css';
import api from '../../services/api';

import Header from '../Header/Header'

export default class Previsao extends Component {
  state = {
    infoTime: [],
    country: [],
    weather: [],
    temp: [],
    tempMin: [],
    tempMax: []
  };

  componentDidMount(){
    this.informations();
  }

  informations = async () => {
    const response = await api.get("/data/2.5/weather?q=London,uk&APPID=3c8ebd83a7ead58e00379146dcb942c0");

    this.setState({infoTime: response.data});
    this.setState({country: response.data.sys.country});
    this.setState({weather: response.data.weather[0].description});
    this.setState({temp: response.data.main.temp.toString().substring(0, 2)});
    this.setState({tempMin: response.data.main.temp_min.toString().substring(0, 2)});
    this.setState({tempMax: response.data.main.temp_max.toString().substring(0, 2)});

    //console.log(response.data.main.temp.toString().substring(0, 2));
  }
  render(){
    return (
      <div className="card">
        <Header />
        <div className="content">
          <div className="temperature">
            <div className="current-temperature">
              {this.state.temp}
            </div>
            <div className="min-max">
              <div className="symbol">
                ° C
              </div>
              <div className="min-temperature flex-center">
                <MdArrowUpward size={30}/>{this.state.tempMax} °
              </div>
              <div className="max-temperature flex-center">
                <MdArrowDownward size={30}/>{this.state.tempMin} °
              </div>
            </div>
          </div>
          <div className="city flex-center">
            {this.state.infoTime.name}  {this.state.country}
         
          </div>
          <div className="status flex-center">
            {this.state.weather}
          </div>
          <div className="icon flex-center">
            <MdCloudQueue size={150}/>
          </div>
        </div>
      </div>
    );
  }
}