import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import mockEbData from './mockEBData'

class TextField extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onValueChange(event.target.value);
  }

  render() {
    const name = this.props.name;
    const value = this.props.value;
    return (
      <input 
          type="text" 
          name={name} 
          placeholder={name} 
          value={value} 
          onChange={this.handleChange} />
    );
  }
}

class MSG01s extends React.Component {
  render() {
    const msgs = this.props.msgs;
    const msgTxt = msgs.length > 0 
        ? msgs.reduce((acc, curr) => {return ""+acc+", "+curr.msg;})
        : "--";
    return (
      <td>{msgTxt}</td>
    );
  }
}

class ControlPanel extends React.Component {
  render() {
    const planId = this.props.planId;
    const eb03 = this.props.eb03;
    return (
      <fieldset className="controlPanel">
        <legend>Enter a Plan ID and optionally an Eb03</legend>
        <TextField 
            name="planId" 
            value={planId} 
            onValueChange={this.props.onPlanIdChange}
        />
        <TextField 
            name="eb03" 
            value={eb03}
            onValueChange={this.props.onEb03Change}
        />
        <input type="button" value="Do" />
      </fieldset>
    );
  }
}

class EbDataList extends React.Component {
  render() {
    var data = this.props.data.slice();
    const eb03 = this.props.eb03;
    if (eb03) {
      data = data.filter(eb => eb.eb03Value === eb03);
    }

    const header = (
      <tr>
        <th>eb01</th>
        <th>eb02</th>
        <th>eb03</th>
        <th>eb06</th>
        <th>eb07</th>
        <th>eb08</th>
        <th>eb11</th>
        <th>eb12</th>
        <th>iii02</th>
        <th>defaultBen</th>
        <th>msg01s</th>
        <th>benefit</th>
        <th>situation</th>
        <th>accumName</th>
        <th>accumRefName</th>
        <th>sensitive</th>
        <th>limitType</th>
      </tr>
    );

    const ebloops = data.map(eb => {
      return (
        <tr className="ebDataView">
          <td>{eb.eb01Value}</td>
          <td>{eb.eb02Value}</td>
          <td>{eb.eb03Value}</td>
          <td>{eb.eb06Value}</td>
          <td>{eb.eb07Value}</td>
          <td>{eb.eb08Value}</td>
          <td>{eb.eb11Value}</td>
          <td>{eb.eb12Value}</td>
          <td>{JSON.stringify(eb.iii02)}</td>
          <td>{JSON.stringify(eb.defaultBen)}</td>
          <MSG01s msgs={eb.msg01s}/>
          <td>{eb.benefitName}</td>
          <td>{eb.situation}</td>
          <td>{eb.accumName}</td>
          <td>{eb.accumRefName}</td>
          <td>{eb.sensitive}</td>
          <td>{eb.limitType}</td>
        </tr>
      );
    });
    
    return (
      <table><tbody>
        {header}
        {ebloops}
      </tbody></table>
    );
  }
}

class EbViewerTool extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlanIdChange = this.handlePlanIdChange.bind(this);
    this.handleEb03Change = this.handleEb03Change.bind(this);
    this.state = {
      planId: '',
      eb03: '',
      ebDataArr: []
    };
  }
  
  handlePlanIdChange(value) {
    this.setState({planId: value});
  }

  handleEb03Change(value) {
    this.setState({eb03: value});
  }

  componentWillMount() {
    this.setState({
      ebDataArr: mockEbData
    })
  }
  
  render() {
    return (
      <div className="ebViewer">
        <h2>EB Viewer debug tool</h2>
        <ControlPanel
            onPlanIdChange={this.handlePlanIdChange} 
            onEb03Change={this.handleEb03Change} />
        <EbDataList
            eb03={this.state.eb03} 
            data={this.state.ebDataArr}/>
        <div className="eb03iii02Lookup">
          {/* Table */}
        </div>
        <div className="benefits">
          {/* How should beneifts be rendered */}
        </div>
      </div>
    );
  }
}

// =============================

ReactDOM.render(
  <EbViewerTool />,
  document.getElementById('root')
);