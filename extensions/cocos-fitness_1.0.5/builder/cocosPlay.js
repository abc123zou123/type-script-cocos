const _0x50d6=['service/','onBeforeCompressSettings','shift','unload','dir','settings','log','paths','throwError','jsList','path','join','src','readJSONSync','writeJSONSync','service','defineProperty','push','cocos-fitness','[cocos-fitness]\x20','unlinkSync','use\x20strict','__esModule','onAfterCompressSettings','onBeforeBuild','basename','fs-extra'];(function(_0x3bb52f,_0x3978e3){const _0x50d696=function(_0x1ea0f4){while(--_0x1ea0f4){_0x3bb52f['push'](_0x3bb52f['shift']());}};_0x50d696(++_0x3978e3);}(_0x50d6,0x9b));const _0x1ea0=function(_0x3bb52f,_0x3978e3){_0x3bb52f=_0x3bb52f-0x14c;let _0x50d696=_0x50d6[_0x3bb52f];return _0x50d696;};const _0x55fdbe=_0x1ea0,_0xeb93=[_0x55fdbe(0x14f),_0x55fdbe(0x15f),_0x55fdbe(0x161),'mkdirsSync',_0x55fdbe(0x151),'load','existsSync',_0x55fdbe(0x159),_0x55fdbe(0x160),_0x55fdbe(0x152),_0x55fdbe(0x15d),_0x55fdbe(0x15e),'./resource/js/VideoPlayerImpleFitnessRuntime.js',_0x55fdbe(0x162),_0x55fdbe(0x14c),_0x55fdbe(0x150),_0x55fdbe(0x153),_0x55fdbe(0x14e),_0x55fdbe(0x154),_0x55fdbe(0x15b),'onAfterBuild',_0x55fdbe(0x165),_0x55fdbe(0x15a),_0x55fdbe(0x15c),_0x55fdbe(0x157),_0x55fdbe(0x156),_0x55fdbe(0x166)];(function(_0x39e2c4,_0x77ffb){const _0x5b83a9=function(_0x1e591e){const _0x2f7cba=_0x1ea0;while(--_0x1e591e){_0x39e2c4[_0x2f7cba(0x164)](_0x39e2c4[_0x2f7cba(0x155)]());}};_0x5b83a9(++_0x77ffb);}(_0xeb93,0x9d));const _0x4171=function(_0x5e2aaa,_0x44b8c6){_0x5e2aaa=_0x5e2aaa-0x1c1;let _0x2ecc28=_0xeb93[_0x5e2aaa];return _0x2ecc28;},_0x2a18e5=_0x4171;_0x55fdbe(0x14d),(Object[_0x55fdbe(0x163)](exports,_0x2a18e5(0x1d7),{'value':!0x0}),exports[_0x2a18e5(0x1c4)]=exports[_0x2a18e5(0x1da)]=exports[_0x2a18e5(0x1c6)]=exports[_0x2a18e5(0x1d8)]=exports[_0x2a18e5(0x1d5)]=exports[_0x2a18e5(0x1cb)]=exports['throwError']=void 0x0);const path_1=require(_0x2a18e5(0x1d0)),fs_extra_1=require(_0x2a18e5(0x1cf)),PACKAGE_NAME=_0x2a18e5(0x1db);function log(..._0x5eec0e){const _0x1a7d83=_0x2a18e5;return console[_0x1a7d83(0x1cd)](_0x1a7d83(0x1c5),..._0x5eec0e);}let allAssets=[];async function load(){}async function onBeforeBuild(_0x585198){}async function onBeforeCompressSettings(_0x29d010,_0xb3bb73){}exports[_0x2a18e5(0x1d9)]=!0x0,exports[_0x2a18e5(0x1cb)]=load,exports[_0x2a18e5(0x1d5)]=onBeforeBuild,exports[_0x55fdbe(0x154)]=onBeforeCompressSettings;let insertJSListToSettings=function(_0x199b91,_0x228c7b){const _0x48c826=_0x2a18e5;if(fs_extra_1[_0x48c826(0x1cc)](_0x199b91)){let _0x4b7f6e=fs_extra_1[_0x48c826(0x1ce)](_0x199b91);_0x4b7f6e[_0x48c826(0x1c2)]=_0x4b7f6e['jsList']||[],_0x4b7f6e[_0x48c826(0x1c2)]['push'](_0x48c826(0x1d6)+_0x228c7b),fs_extra_1[_0x48c826(0x1c8)](_0x199b91,_0x4b7f6e,{'spaces':'\x09'});}},copyJSToAssets=function(_0x295afc,_0x590841,_0x562251){const _0x2cf18f=_0x55fdbe,_0x3df2cb=_0x2a18e5;let _0x167c9c=path_1[_0x3df2cb(0x1d1)](_0x295afc,_0x3df2cb(0x1c7),_0x3df2cb(0x1d3));fs_extra_1[_0x3df2cb(0x1cc)](_0x167c9c)||fs_extra_1[_0x3df2cb(0x1c9)](_0x167c9c);let _0xa9640b=path_1[_0x2cf18f(0x15e)](_0x167c9c,path_1[_0x3df2cb(0x1ca)](_0x562251));fs_extra_1[_0x3df2cb(0x1cc)](_0xa9640b)&&fs_extra_1[_0x3df2cb(0x1d4)](_0xa9640b),fs_extra_1['copyFileSync'](_0x562251,_0xa9640b),insertJSListToSettings(_0x590841,path_1[_0x3df2cb(0x1ca)](_0x562251));};async function onAfterCompressSettings(_0x17062f,_0x1173e0){const _0x4e0c72=_0x55fdbe,_0x5616fd=_0x2a18e5;copyJSToAssets(_0x1173e0[_0x5616fd(0x1c1)][_0x5616fd(0x1c3)],_0x1173e0[_0x5616fd(0x1c1)][_0x4e0c72(0x158)],path_1[_0x4e0c72(0x15e)](__dirname,_0x5616fd(0x1d2)));}async function onAfterBuild(_0x59f272,_0x362f11){}function unload(){}exports[_0x2a18e5(0x1c6)]=onAfterCompressSettings,exports[_0x2a18e5(0x1da)]=onAfterBuild,exports[_0x2a18e5(0x1c4)]=unload;