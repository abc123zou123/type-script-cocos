var _0x4abd=['mkdirsSync','readJsonSync','path','compressing','call','readdirSync','existsSync','prototype','default','statSync','createMonitor','writeJsonSync','compressDir','walk','push','removeSync','basename','join','.zip','test','__importStar','shift','defineProperty','__esModule','hasOwnProperty','fs-extra','watch','readFileSync','forEach','__setModuleDefault','zip','create','utf-8'];(function(_0x614beb,_0x5bba34){var _0x4abdb9=function(_0x211160){while(--_0x211160){_0x614beb['push'](_0x614beb['shift']());}};_0x4abdb9(++_0x5bba34);}(_0x4abd,0xe2));var _0x2111=function(_0x614beb,_0x5bba34){_0x614beb=_0x614beb-0x1a0;var _0x4abdb9=_0x4abd[_0x614beb];return _0x4abdb9;};var _0x5e983e=_0x2111,_0x1fc9=[_0x5e983e(0x1aa),'concat',_0x5e983e(0x1b8),_0x5e983e(0x1b1),_0x5e983e(0x1a7),_0x5e983e(0x1a9),_0x5e983e(0x1b5),_0x5e983e(0x1a0),_0x5e983e(0x1b9),_0x5e983e(0x1c0),_0x5e983e(0x1b4),'moveSync',_0x5e983e(0x1ab),_0x5e983e(0x1af),_0x5e983e(0x1bb),_0x5e983e(0x1a4),_0x5e983e(0x1b3),_0x5e983e(0x1a6),_0x5e983e(0x1ad),'dirname',_0x5e983e(0x1ae),_0x5e983e(0x1bc),_0x5e983e(0x1a3),_0x5e983e(0x1ac),_0x5e983e(0x1b2),'copySync',_0x5e983e(0x1a5),_0x5e983e(0x1bf),_0x5e983e(0x1b7),'uncompress',_0x5e983e(0x1a8),_0x5e983e(0x1a1),_0x5e983e(0x1be),'isDirectory',_0x5e983e(0x1a2),_0x5e983e(0x1b6)];(function(_0x3d9f93,_0x42924b){var _0x567a13=function(_0x5c359c){var _0x2a30ce=_0x2111;while(--_0x5c359c){_0x3d9f93[_0x2a30ce(0x1b3)](_0x3d9f93[_0x2a30ce(0x1ba)]());}};_0x567a13(++_0x42924b);}(_0x1fc9,0x144));var _0x41d4=function(_0x3db78c,_0x4b6fda){_0x3db78c=_0x3db78c-0x89;var _0xc13ac6=_0x1fc9[_0x3db78c];return _0xc13ac6;},_0xaa7c91=_0x41d4;'use\x20strict';var __createBinding=this&&this['__createBinding']||(Object[_0xaa7c91(0x9f)]?function(_0x29ddc3,_0x59aa2b,_0x490456,_0x25b809){var _0x181367=_0xaa7c91;void 0x0===_0x25b809&&(_0x25b809=_0x490456),Object[_0x181367(0x97)](_0x29ddc3,_0x25b809,{'enumerable':!0x0,'get':function(){return _0x59aa2b[_0x490456];}});}:function(_0x416f6d,_0x574fef,_0x5ff55b,_0x1a83f7){void 0x0===_0x1a83f7&&(_0x1a83f7=_0x5ff55b),_0x416f6d[_0x1a83f7]=_0x574fef[_0x5ff55b];}),__setModuleDefault=this&&this[_0xaa7c91(0xa8)]||(Object[_0x5e983e(0x1a3)]?function(_0x1ccf01,_0x2ad909){var _0x458e3f=_0xaa7c91;Object[_0x458e3f(0x97)](_0x1ccf01,_0x458e3f(0x9b),{'enumerable':!0x0,'value':_0x2ad909});}:function(_0x49c302,_0x5169e6){var _0x335e19=_0xaa7c91;_0x49c302[_0x335e19(0x9b)]=_0x5169e6;}),__importStar=this&&this[_0xaa7c91(0x91)]||function(_0x580ba3){var _0x57a602=_0x5e983e,_0x209aca=_0xaa7c91;if(_0x580ba3&&_0x580ba3[_0x209aca(0x9e)])return _0x580ba3;var _0x284458={};if(null!=_0x580ba3)for(var _0x284333 in _0x580ba3)_0x209aca(0x9b)!==_0x284333&&Object[_0x209aca(0xa0)][_0x57a602(0x1bd)][_0x209aca(0x8e)](_0x580ba3,_0x284333)&&__createBinding(_0x284458,_0x580ba3,_0x284333);return __setModuleDefault(_0x284458,_0x580ba3),_0x284458;};Object[_0xaa7c91(0x97)](exports,_0x5e983e(0x1bc),{'value':!0x0});const compressing_1=require(_0xaa7c91(0xa7)),fs_extra_1=__importStar(require(_0xaa7c91(0xa9))),path_1=require(_0xaa7c91(0x8d)),watch_1=require(_0xaa7c91(0xa4));exports[_0x5e983e(0x1ad)]={'zip':async function(_0x30f805,_0x362033=''){var _0x3a38f3=_0x5e983e,_0x903809=_0xaa7c91;return null==_0x362033||''===_0x362033?_0x362033=_0x30f805+_0x903809(0xa5):/.zip$/[_0x903809(0x8b)](_0x362033)||(_0x362033=path_1[_0x3a38f3(0x1b6)](_0x362033,path_1[_0x903809(0x8f)](_0x30f805)+_0x903809(0xa5))),await compressing_1[_0x903809(0xab)][_0x903809(0x8c)](_0x30f805,_0x362033);},'unzip':async function(_0x5b900d,_0x474190=''){var _0x1b7aac=_0xaa7c91;return null!=_0x474190&&''!==_0x474190||(_0x474190=path_1[_0x1b7aac(0x9c)](_0x5b900d)),await compressing_1['zip'][_0x1b7aac(0xa6)](_0x5b900d,_0x474190);},'walk':function(_0x4f2c48,_0x4cd2df=!0x1){var _0x258ae5=_0x5e983e,_0x5a1d63=_0xaa7c91;let _0x3f0a4d=[];return fs_extra_1[_0x5a1d63(0x9b)][_0x5a1d63(0x89)](_0x4f2c48)[_0x258ae5(0x1a0)](_0x2521cf=>{var _0x116e75=_0x5a1d63;let _0x21017f=path_1[_0x116e75(0xac)](_0x4f2c48,_0x2521cf),_0x401c1c=fs_extra_1[_0x116e75(0x9b)][_0x116e75(0x9d)](_0x21017f);_0x401c1c&&_0x401c1c['isDirectory']()?(_0x4cd2df&&_0x3f0a4d[_0x116e75(0x99)](_0x21017f+'/'),_0x3f0a4d=_0x3f0a4d[_0x116e75(0x8a)](this[_0x116e75(0xa1)](_0x21017f,_0x4cd2df))):_0x3f0a4d[_0x116e75(0x99)](_0x21017f);}),_0x3f0a4d;},'mkdirs':function(_0x22956b){var _0x2c8946=_0x5e983e,_0x26b2d6=_0xaa7c91;fs_extra_1[_0x2c8946(0x1ad)][_0x26b2d6(0xa3)](_0x22956b);},'readJson':function(..._0x43ea0a){var _0x4e4076=_0xaa7c91;return fs_extra_1[_0x4e4076(0x9b)][_0x4e4076(0x9a)](path_1['join'](..._0x43ea0a),{'throws':!0x1})||{};},'saveJson':function(_0x37e067,_0x3bd992){var _0x2c4e19=_0x5e983e,_0x9269c9=_0xaa7c91;fs_extra_1[_0x9269c9(0x9b)][_0x2c4e19(0x1b0)](_0x37e067,_0x3bd992,{'spaces':0x2});},'copy':function(_0x8cc8d6,_0x2b0eec,_0x4fcb81){var _0x7ad0e3=_0xaa7c91;fs_extra_1[_0x7ad0e3(0x9b)][_0x7ad0e3(0xa2)](_0x8cc8d6,_0x2b0eec,_0x4fcb81);},'move':function(_0x22c893,_0x380baf,_0x492da6){var _0x1b1fcc=_0x5e983e,_0x5e4749=_0xaa7c91;fs_extra_1[_0x1b1fcc(0x1ad)][_0x5e4749(0x94)](_0x22c893,_0x380baf,_0x492da6);},'remove':function(_0x71c8d0){var _0x2167a9=_0xaa7c91;fs_extra_1[_0x2167a9(0x9b)][_0x2167a9(0x93)](_0x71c8d0);},'watch':function(_0x2b5e07,_0x4d5e83){var _0x3d582b=_0xaa7c91;watch_1[_0x3d582b(0x96)](_0x2b5e07,_0x4d5e83);},'readFile':function(..._0x200439){var _0x3462a5=_0xaa7c91;return fs_extra_1[_0x3462a5(0x9b)][_0x3462a5(0x92)](path_1[_0x3462a5(0xac)](..._0x200439),_0x3462a5(0x98));},'recursive':function(_0x4f2620,_0x59c79f,_0x3e3963){let _0x3e8bdc=_0x3da2e9=>{var _0xb3fae=_0x2111,_0x18154c=_0x41d4;fs_extra_1[_0x18154c(0x95)](_0x3da2e9)&&(_0x3e3963&&!_0x3e3963(_0x3da2e9)||(_0x59c79f(_0x3da2e9),fs_extra_1[_0xb3fae(0x1ae)](_0x3da2e9)[_0x18154c(0xaa)]()&&fs_extra_1[_0x18154c(0x89)](_0x3da2e9)[_0x18154c(0x90)](_0x4a35a3=>_0x3e8bdc(path_1[_0x18154c(0xac)](_0x3da2e9,_0x4a35a3)))));};_0x3e8bdc(_0x4f2620);}};