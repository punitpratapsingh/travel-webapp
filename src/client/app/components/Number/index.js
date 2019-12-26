import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './index.scss';

export default ({
	defaultValue = 0,
	onIncrement,
	onDecrement,
}) => <section>
	<button className='btn btn-default caret-btn' onClick={onIncrement}>
		<FontAwesome name='caret-up' />
	</button><br/>
	<button style={{ color: '#d41625', fontWeight: 'bold' }} className='btn btn-default caret-btn' disabled>{defaultValue}</button><br/>
	<button className='btn btn-default' onClick={onDecrement}>
		<FontAwesome name='caret-down' />
	</button>
</section>;
