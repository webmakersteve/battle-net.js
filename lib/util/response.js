var response = {};

response.createObject = function (body, wrapper) {
  //this function can log and cache response and do all of those amazing tricks.
  //it then passes its data to the wrapper function, if it exists, to make sure to filter
  //out unecessary data, if there is any.
  if (wrapper) return wrapper(body);
  
  return body;
}

module.exports = response;
