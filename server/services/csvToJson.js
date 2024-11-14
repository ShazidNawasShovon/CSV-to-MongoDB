const processCSV = (headers, str, delim=',') => {
    const rows = str.slice(str.indexOf('\n')+1).split('\n');

    const newArray = rows.map( row => {
        const values = row.split(delim);
        const eachObject = headers.reduce((obj, header, i) => {
            obj[header] = values[i];
            return obj;
        }, {})
        return eachObject;
    })
    return newArray
}

const getHeaders = (str, delim=',') => {
    return str.slice(0,str.indexOf('\n')).split(delim);
}

module.exports = {processCSV, getHeaders}