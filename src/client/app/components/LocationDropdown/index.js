import React, { Component } from 'react';
import './index.scss';

export default ({ display = 'block', list, onSelect = () => {} }) => <section className='location-dropdown' style={{ display: display }}>
	{
		<section>
			{list.map((item, index) => {
				return <section
					id={`${item.city}_${item.state}_${item._id}`}
					key={`${item.city}_${item.state}_${item._id}`}
					className='locationContainer' onClick={index === list.length - 1 ? () => {} : onSelect}>
					<span className='title'>{item.city}</span><br/>
					<span className='subtitle'>{item.state}</span>
				</section>
			})
		}
		</section>
	}
</section>;