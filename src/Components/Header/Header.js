import React, { Component } from 'react';
import { MdCloudQueue, MdToys, MdInvertColors } from 'react-icons/md';
import'./style.css';

import api from '../../services/api';

export default class Header extends Component {
  state = {
    infoTime: [],
    windSpeed: [],
    clouds: [],
    humidity: []
  };

  componentDidMount(){
    this.informations();
  }

  informations = async () => {
    const response = await api.get("/data/2.5/weather?q=London,uk&APPID=3c8ebd83a7ead58e00379146dcb942c0");

    this.setState({infoTime: response.data})
    this.setState({windSpeed: response.data.wind.speed});
    this.setState({clouds: response.data.clouds.all});
    this.setState({humidity: response.data.main.humidity});
  }
  render(){
    return (
      <div className="header">
        <div className="cloud flex-center">
          <MdCloudQueue size={20}/>{this.state.clouds} % 
        </div>
        <div className="wind flex-center">
          <MdToys size={20}/>{this.state.windSpeed} m/s
        </div>
        <div className="humidity flex-center">
          <MdInvertColors size={20}/>{this.state.humidity} %
        </div>
      </div>
    );
  }
}

