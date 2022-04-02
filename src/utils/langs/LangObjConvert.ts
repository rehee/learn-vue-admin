export const Messages = {};
const setValue = (input: object, value: string, keys: string[]) => {
	const v = keys.shift();
	if (!keys || keys.length <= 0) {
		input[<string>v] = value;
		return;
	}
	if (input[<string>v] == null) {
		input[<string>v] = {};
		
	}
	setValue(input[<string>v], value, keys);
}
export function RevertObj(input: object, output: object, parent?: string[]) {
	let parentList = parent == null ? [] : parent.map(b => b);
	for (var p in input) {
		if (input.hasOwnProperty(p)) {
			let value = input[p];
			if (typeof value === 'string') {
				if (!parent) {
					output[p] = value
				} else {
					if (output[p] == null) {
						output[p] = {};
					}
					setValue(output[p], value, parentList.map(b => b));
				}

			} else {
				const pList = parentList.map(b=>b);
				pList.push(p);
				RevertObj(value, output, pList);
			}
		}
	}
}

function copy(target: object): object {
	return JSON.parse(JSON.stringify(target));
}

export function addAndUpdateMessage(target: object, source: object) {

	for (var key in source) {
		if (source.hasOwnProperty(key)) {

			if (target[key] == null || target[key] == undefined) {

				target[key] = copy(source[key]);
			} else {

				if (typeof (source[key]) !== 'string') {
					for (var subKey in source[key]) {
						if (source[key].hasOwnProperty(subKey)) {
							if (target[key][subKey] == null) {
								target[key][subKey] = {}
							}
							addAndUpdateMessage(target[key][subKey], source[key][subKey]);
						}
					}
				} else {
					target[key] = source[key];
				}
			}
		}
	}
}
export function AddLangMessage(input: object) {
	const result = {};
	RevertObj(input, result);
	addAndUpdateMessage(Messages, result);
}

