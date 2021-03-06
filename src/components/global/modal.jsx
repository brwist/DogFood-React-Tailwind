import React from "react";
import ReactModal from "react-modal";
import { ReactComponent as OrderEnvelope } from '../../assets/images/order-envelope.svg';
import { ReactComponent as Close } from '../../assets/images/close.svg';

ReactModal.setAppElement("#root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAppend, isLarge,isSmall, customBorderRadius, modalClassName } = this.props;
    const subcriptionPage = window.location.pathname.includes('manage-subscription');
    return (
      <div className="">
        <ReactModal
          isOpen={this.props.isOpen}
          overlayClassName="bg-black bg-opacity-50 fixed inset-0 flex justify-center global-modal-overlay items-start z-10000 overflow-y-scroll"
          className={
            isLarge
              ? "w-full bg-white md:m-24 lg:rounded-xl shadow-modal outline-none"
              : `w-full ${isSmall ? 'max-w-23' : modalClassName || 'max-w-2xl'} bg-white md:m-24 ${customBorderRadius || 'lg:rounded-xl'} shadow-modal outline-none relative`
          }
          onRequestClose={() => this.props.onRequestClose()}
        >
          <div className={`${this.props.noSpacingheader ? '' : 'p-4'} ${subcriptionPage ? 'bg-green-50 lg:rounded-xl': '' } flex justify-between ${this.props.bgColor ? this.props.bgColor : ''}`}>
            {this.props.title &&
              <h3 className="text-xl flex items-center font-bold font-messina">
                {this.props.isOrderLogo? <OrderEnvelope className="mr-4"/> : null}
                {this.props.title}
              </h3>
            }
            <span className={`cursor-pointer ${this.props.bgColor ? 'close-icon' : ''} ${this.props.closeIconClassName}`} onClick={() => this.props.onRequestClose()}>
              {this.props.bgColor? null : <Close />}
            </span>
          </div>
          <div>{this.props.children}</div>
        </ReactModal>
      </div>
    );
  }
}

export default Modal;
