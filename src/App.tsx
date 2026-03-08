import React, {useState, useMemo} from 'react';
import {Text, Box} from 'ink';
import TextInput from 'ink-text-input';
// @ts-ignore
import {getAccurateHalfBirthday, getTraditionalHalfBirthday} from '@seancrosby/half-birthday-calc';
import {format, parseISO, isValid} from 'date-fns';

const App = () => {
	const [birthdayInput, setBirthdayInput] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const results = useMemo(() => {
		if (!submitted) return null;

		// Standardize input parsing. ISO or common YYYY-MM-DD HH:mm:ss
		let parsedDate = parseISO(birthdayInput);
		
		if (!isValid(parsedDate)) {
			// Try fallback for basic date
			parsedDate = new Date(birthdayInput);
		}

		if (!isValid(parsedDate)) return null;

		try {
			const traditionalResult = getTraditionalHalfBirthday(parsedDate);
			const accurateResult = getAccurateHalfBirthday(parsedDate);

			const traditional = traditionalResult === 'none' ? 'none' : new Date(traditionalResult);
			const accurate = new Date(accurateResult);

			if (traditional !== 'none' && !isValid(traditional)) return null;
			if (!isValid(accurate)) return null;

			return {
				traditional,
				accurate,
				original: parsedDate
			};
		} catch (e) {
			return null;
		}
		}, [birthdayInput, submitted]);

		const handleSubmit = () => {
		if (birthdayInput.trim() === '') return;
		setSubmitted(true);
		};

		const handleReset = () => {
		setSubmitted(false);
		};

		return (
		<Box flexDirection="column" padding={1} borderStyle="round" borderColor="cyan">
			<Box marginBottom={1} justifyContent="center">
				<Text color="cyan" bold inverse>
					 HALF-BIRTHDAY CALCULATOR
				</Text>
			</Box>

			{!submitted ? (
				<Box flexDirection="column">
					<Text>Enter your birthday and time (e.g., YYYY-MM-DD HH:mm): </Text>
					<Box marginTop={1}>
						<Text color="yellow">❯ </Text>
						<TextInput
							value={birthdayInput}
							onChange={setBirthdayInput}
							onSubmit={handleSubmit}
							placeholder="1990-06-15 14:30"
						/>
					</Box>
				</Box>
			) : (
				<Box flexDirection="column">
					{results ? (
						<>
							<Text>Birthday: <Text color="green">{format(results.original, 'PPPP p')}</Text></Text>
							<Box flexDirection="column" marginTop={1}>
								<Box>
									<Box width={25}><Text bold>Traditional:</Text></Box>
									{results.traditional === 'none' ? (
										<Text color="yellow" italic>N/A (Leap Year Exception)</Text>
									) : (
										<Text color="magenta">{format(results.traditional, 'PPPP')}</Text>
									)}
								</Box>
								<Box>
									<Box width={25}><Text bold>Accurate (Midpoint):</Text></Box>
									<Text color="blue">{format(results.accurate, 'PPPP p')}</Text>
								</Box>
							</Box>
						</>
					) : (
						<Box flexDirection="column">
							<Text color="red">Invalid date format: "{birthdayInput}"</Text>
							<Text color="yellow">Please use YYYY-MM-DD HH:mm (e.g., 1990-06-15 14:30)</Text>
							<Box marginTop={1}>
								<Text dimColor>Press any key to try again...</Text>
								<TextInput value="" onChange={() => {}} onSubmit={handleReset} />
							</Box>
						</Box>
					)}

					<Box marginTop={1} justifyContent="flex-end">
						<Text dimColor>Press Ctrl+C to exit {results && '| Enter to try another'}</Text>
						{results && <TextInput value="" onChange={() => {}} onSubmit={handleReset} />}
					</Box>
				</Box>
			)}
		</Box>
		);
		};
export default App;
