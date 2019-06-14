import axios from '../../src/index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { AxiosError } from '../../src/helpers/error';

// 设置cookie信息
document.cookie = 'a=b';

axios.get('/more/get').then(res => {
  console.log(res);
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log(res);
})

const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})

instance.get('/more/get').then(res => {
  console.log(res);
})

// 计算上传进度
function calculatePercentage(load: number, total: number) {
  return Math.floor(load * 1.0) / total;
}


function loadProgressBar() {
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start();
      return config;
    })
  }
  const setupUpdateProgress = () => {
    const update = (e: ProgressEvent) => {
      console.log(e);
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update;
    instance.defaults.onUploadProgress = update;
  }
  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done();
      return response;
    }, error => {
      NProgress.done();
      return Promise.reject(error);
    })
  }
  setupStartProgress();
  setupUpdateProgress();
  setupStopProgress();
}
loadProgressBar();

const downloadEl = document.getElementById('download');
downloadEl.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg');
})

const uploadEl = document.getElementById('upload');
uploadEl.addEventListener('click', e => {
  const data = new FormData();
  const fileEl = document.getElementById('file') as HTMLInputElement;
  if (fileEl.files) {
    data.append('file', fileEl.files[0]);

    instance.post('/more/upload', data);
  }
})


axios.post('/more/post', {
  a: 1
}, {
    auth: {
      username: 'Yee',
      password: '123456'
    }
  }).then(res => {
    console.log(res)
  })


axios.get('/more/304').then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
})

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status <= 400;
  }
}).then(res => {
  console.log(res);
}).catch((e: AxiosError) => {
  console.log(e.message);
})