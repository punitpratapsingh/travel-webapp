import React, { Component } from 'react';
import './index.scss';
class Dialog extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <section className='dialog-container' style={{ display: this.props.show ? 'block' : 'none' }}>
			<section className='dialog-container-overlay'></section>
			<section className='dialog'>
				<h1>
					<b>
						{this.props.title && this.props.title}
					</b>
				</h1>
				{ this.props.children }
				<span>
					{this.props.showConfirm && <button className='app-btn' onClick={this.props.onConfirm || alert('confirmed')}>{this.props.confirmText || 'Yes'}</button>}
					{this.props.showReject && <button className='app-btn outline-btn' onClick={this.props.onReject || alert('rejected')}>{this.props.rejectText || 'No'}</button>}
				</span>
			</section>
		</section>;
	}
}

export default Dialog;
