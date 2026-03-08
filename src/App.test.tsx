import React from 'react';
import {render} from 'ink-testing-library';
import {describe, it, expect} from 'vitest';
import App from './App.js';

describe('App', () => {
	it('renders correctly', () => {
		const {lastFrame} = render(<App />);
		expect(lastFrame()).toContain('HALF-BIRTHDAY CALCULATOR');
		expect(lastFrame()).toContain('Enter your birthday and time');
	});
});
