/**
 * CSV Generator.
 *
 * Generate a csv string from an Object of Arrays of Strings.
 *
 * @param {Object} data The data to be transformed into csv. Example: {"title1": ['1','2'], title2: ['3','4']}
 *
 * @return {string} A csv string generated from the data Object. Example: 'title1,title2\n1,3\n2,4'
 */
export const generateCsv = (data:{[key:string]: string[]}): string => {
  let csvData = '';
  let i = 1

  function nthIndex(str:string, pat:string, n:number){
    var L = str.length, i = -1;
    while(n-- && i++<L){
      i = str.indexOf(pat, i);
      if (i < 0) break;
    }
    return i;
  }

  // [C] Get the longest array length from data.
  let maxLength = 0
  for (let [key, values] of Object.entries(data)) {
    if (values.length === 0) data[key] = ['']
    if (values.length > maxLength) maxLength = values.length
  }
  // [/C] 

  for (let [title, values] of Object.entries(data)) {
    // [C] Make all arrays equal by filling with empty strings where needed.
    if (values.length < maxLength) {
      let originalValuesLength = values.length
      for (let n = 0; n <= (maxLength - originalValuesLength); n++) {
	values.push('')
      }
    } // [/C]
    if (i === 1) { // First column without any new lines before it.
      csvData += `"${title}"\n`
      values.forEach((value) => {
	csvData += `"${value}"\n`
      })
      i++
    } else { // The rest of the columns with the data added after each new line.
      csvData = csvData.slice(0, nthIndex(csvData, '\n', 1)) + `,"${title}"` + csvData.slice(csvData.indexOf('\n'))
      values.forEach((value,index) => {
	let newLineIndex = nthIndex(csvData, '\n', (index) + 2 )
	csvData = csvData.slice(0, newLineIndex ) + `,"${value}"` + csvData.slice(newLineIndex)
      })
      i++
    }
  }
  return csvData
}

/**
 * Generate GUID.
 *
 * Generate a 128-bit globally unique identifier string.
 *
 * @return {string} Ex: "9dc993-f508--7330-65f6f3"
 */
export const generateGuid = ():string => {
  const _p8 = (s?:Boolean) => {
    let p = (Math.random().toString(16)+"000000000").substring(2,8);
    return s ? "-" + p.substring(0,4) + "-" + p.substring(4,4) : p ;
  };
  return _p8() + _p8(true) + _p8(true) + _p8();
};
