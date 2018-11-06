import React from 'react';

export default function Card(props) {
  if (props.data != null) {
    const data = props.data;
    if (data.category.toUpperCase() === 'PERSONALITY') {
      return (
        <div className="card-body">
          <h4 className='card-title font-weight-light mb-4'>{data.name.toUpperCase()}</h4>
          <h6 className="card-title">{data.children[0].name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.children[0].percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.children[0].percentile * 100)}%</div>
          </div>
          <br />
          <h6 className="card-title">{data.children[1].name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.children[1].percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.children[1].percentile * 100)}%</div>
          </div>

          <br />
          <h6 className="card-title">{data.children[2].name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.children[2].percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.children[2].percentile * 100)}%</div>
          </div>

          <br />
          <h6 className="card-title">{data.children[3].name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.children[3].percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.children[3].percentile * 100)}%</div>
          </div>

          <br />
          <h6 className="card-title">{data.children[4].name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.children[4].percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.children[4].percentile * 100)}%</div>
          </div>

          <br />
          <h6 className="card-title">{data.children[5].name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.children[5].percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.children[5].percentile * 100)}%</div>
          </div>
        </div>
      )
    } else if (data.category.toUpperCase() === 'NEEDS' || data.category.toUpperCase() === 'VALUES') {
      return (
        <div className="card-body">
          <h6 className="card-title">{data.name}</h6>
          <div className="progress">
            <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: `${Math.round(data.percentile * 100)}%` }} aria-valuenow='100' aria-valuemin="0" aria-valuemax="100">{Math.round(data.percentile * 100)}%</div>
          </div>
        </div>
      )
    }

  } else {
    return null;
  }
}