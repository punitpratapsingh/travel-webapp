import React, { Component } from 'react';
import './index.scss';

export default ({
	majorCity = '-',
	minorCity = '-',
}) => <section className='location-selector'>
	<p className='main-city'>{majorCity}</p>
	<p className='minor-city'>{minorCity}</p>
</section>;