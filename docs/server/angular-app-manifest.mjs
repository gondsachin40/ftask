
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ftask/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/ftask"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 496, hash: '461d52932521bbb619d9c0a34b8d2b0366043370bf1969dbb7afe6337c23d005', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1009, hash: 'fcf3b98f297a36c0c4fa4049cbbc6be4a3ff28367b6e66ca9e51cba37736db24', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 1559, hash: '1be7e289fb559088c92d176f1474262e5a21b6ab84dc3e1cdc5091df22f04a3f', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
