// TASK 1
function invokeAfterDelay(callback) {
    setTimeout(callback, 2000);
  }
  
  
  invokeAfterDelay(() => {
    console.log("Callback invoked after 2 seconds");
  });
  
// TASK 2
  function httpGet(url) {
    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  }
  
  
  httpGet('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => console.log(data))
    .catch(error => console.error(error));
  
 // TASK 3
  function fetchUrlsInParallel(urls) {
    return Promise.all(urls.map(url => httpGet(url)));
  }
  
  
  const urls = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2'
  ];
  fetchUrlsInParallel(urls)
    .then(data => console.log(data))
    .catch(error => console.error(error));
  
  // TASK 4
  async function performOperationsInSequence(operations) {
    const results = [];
    for (const operation of operations) {
      const result = await operation();
      results.push(result);
    }
    return results;
  }
  
  
  const operations = [
    () => Promise.resolve('First operation'),
    () => Promise.resolve('Second operation'),
    () => Promise.resolve('Third operation')
  ];
  performOperationsInSequence(operations)
    .then(results => console.log(results))
    .catch(error => console.error(error));
  
// TASK 5
  async function fetchWithRetry(url, retries = 3) {
    for (let i = 0; i < retries; i++) {
      try {
        return await httpGet(url);
      } catch (error) {
        if (i === retries - 1) throw error;
      }
    }
  }
  
  
  fetchWithRetry('https://jsonplaceholder.typicode.com/posts/1', 3)
    .then(data => console.log(data))
    .catch(error => console.error(error));
  
  // TASK 6
  function fetchWithTimeout(url, timeout = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('Request timed out')), timeout);
  
      httpGet(url)
        .then(response => {
          clearTimeout(timer);
          resolve(response);
        })
        .catch(error => {
          clearTimeout(timer);
          reject(error);
        });
    });
  }
  
  
  fetchWithTimeout('https://jsonplaceholder.typicode.com/posts/1', 3000)
    .then(data => console.log(data))
    .catch(error => console.error(error));