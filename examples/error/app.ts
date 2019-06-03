import axios, { AxiosError } from '../../src/index';

axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
})

axios({
  method: 'get',
  url: '/error/get',
  timeout: 5000
}).then((res) => {
  console.log(res);
}).catch((error) => {
  console.log(error);
})

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 1000
}).then((res) => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message)
  console.log(e.code)
})

