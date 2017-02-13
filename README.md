hack to allow for a virtual file system to be used with webpack2 so can compile
bundles somewhat programatically, uses memoryFS and preloads dependencies into it.

Useless code atm, just has a setinterval writing to the vfs to demonstrate functioning compilation with hmr.

borrowed from @christianalfoni's amazing work with webpackbin.com
https://github.com/christianalfoni/webpack-bin