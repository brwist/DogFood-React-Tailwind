import React from 'react';

class Radio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const selected = this.props.selected;

    return (
      <div
        className={`flex cursor-pointer ${this.props.className}`}
        onClick={() => this.props.onChange()}
      >
        <div
          className={`
            flex justify-center items-center w-5 h-5 self-center mr-3 rounded-3xl
            ${!selected ? 'cursor-pointer' : ''}
            ${selected ? 'bg-primary' : 'border-solid border-gray-700 border'}
          `}
        >
          <div className={`w-2 h-2 rounded-lg bg-white`}></div>
        </div>
        <div
          className={`
            font-base font-messina ${this.props.isLight ? "font-normal"  : "font-semibold"}
            ${selected ? 'text-copyPrimary' : 'text-gray-500'}
          `}
        >
          {this.props.text}
        </div>
      </div>
    );
  }
}

export default Radio;
