const _0x2662=['\x0a$1','\x22/>','trim','insertDependency','use\x20strict','fs-extra','$1\x0a\x20\x20\x20\x20','replaceFileContent','defineProperty','pop','appendFileContent','./file','join','length','addUsesPermission','push','__esModule','\x20\x20\x20\x20<uses-permission\x20android:name=\x22android.permission.','[\x20]*=.*','dependencies\x20{\x0a}','getDependencyTag'];(function(_0x5b1555,_0x2b3059){const _0x266226=function(_0x318fe3){while(--_0x318fe3){_0x5b1555['push'](_0x5b1555['shift']());}};_0x266226(++_0x2b3059);}(_0x2662,0x102));const _0x318f=function(_0x5b1555,_0x2b3059){_0x5b1555=_0x5b1555-0x133;let _0x266226=_0x2662[_0x5b1555];return _0x266226;};const _0x51d893=_0x318f,_0x5674=[_0x51d893(0x135),_0x51d893(0x134),'setGradleProperty','length',_0x51d893(0x140),_0x51d893(0x141),_0x51d893(0x13d),_0x51d893(0x138),_0x51d893(0x143),_0x51d893(0x144),'checkFileContent',_0x51d893(0x137),_0x51d893(0x13e),_0x51d893(0x139),_0x51d893(0x145),_0x51d893(0x136),'split','addUsesPermission',_0x51d893(0x13f),_0x51d893(0x142),'existsSync'];(function(_0x520c56,_0x4c740c){const _0x1eaa33=function(_0x21549c){const _0x2d1ae4=_0x318f;while(--_0x21549c){_0x520c56[_0x2d1ae4(0x13c)](_0x520c56['shift']());}};_0x1eaa33(++_0x4c740c);}(_0x5674,0xb7));const _0x228c=function(_0x32cdb2,_0x3cbc41){_0x32cdb2=_0x32cdb2-0x187;let _0x36a338=_0x5674[_0x32cdb2];return _0x36a338;},_0x1a61f5=_0x228c;_0x51d893(0x146),(Object[_0x1a61f5(0x18d)](exports,_0x1a61f5(0x193),{'value':!0x0}),exports[_0x1a61f5(0x18f)]=exports[_0x1a61f5(0x19b)]=exports[_0x1a61f5(0x192)]=exports[_0x51d893(0x13b)]=void 0x0);const fs_extra_1=require(_0x51d893(0x147)),file_1=require(_0x1a61f5(0x194));function addUsesPermission(_0x4c3fc3,_0xe0722a){const _0x189803=_0x1a61f5;if(!fs_extra_1[_0x189803(0x18c)](_0x4c3fc3))return;if(file_1[_0x189803(0x197)](_0x4c3fc3,_0xe0722a))return;let _0x132c99=_0x189803(0x199)+_0xe0722a+_0x189803(0x195);file_1[_0x189803(0x18e)](_0x4c3fc3,/(\<\/manifest\>)/,_0x132c99+_0x189803(0x18b));}function getDependencyTag(_0x435835){const _0x3dd05f=_0x51d893,_0x101721=_0x1a61f5;let _0x5aa80e=_0x435835[_0x101721(0x196)]()[_0x101721(0x188)](/[ ]+/);if(_0x5aa80e[_0x3dd05f(0x13a)]<0x2)return _0x435835;let _0x5a87b2=_0x5aa80e[0x1][_0x101721(0x188)](':');return _0x5a87b2[_0x101721(0x190)]<0x3?_0x5aa80e[0x1]:(_0x5a87b2[_0x101721(0x187)](),_0x5a87b2[_0x101721(0x19a)](':'));}function insertDependency(_0xfd0ef8,_0x2c8a8){const _0x4b2769=_0x51d893,_0xe9e111=_0x1a61f5;fs_extra_1[_0xe9e111(0x18c)](_0xfd0ef8)&&(file_1[_0xe9e111(0x197)](_0xfd0ef8,/dependencies/)||file_1[_0xe9e111(0x198)](_0xfd0ef8,_0xe9e111(0x191)),file_1[_0xe9e111(0x197)](_0xfd0ef8,getDependencyTag(_0x2c8a8))||file_1[_0x4b2769(0x134)](_0xfd0ef8,/(dependencies[ ]*\{)/,_0x4b2769(0x133)+_0x2c8a8));}function setGradleProperty(_0x493994,_0x24164c,_0x6b12dd){const _0x4ab8ff=_0x1a61f5;file_1[_0x4ab8ff(0x197)](_0x493994,new RegExp('(?:^|\x0a)[\x20]*'+_0x24164c))?file_1[_0x4ab8ff(0x18e)](_0x493994,new RegExp(_0x24164c+_0x4ab8ff(0x18a)),_0x24164c+'='+_0x6b12dd):file_1[_0x4ab8ff(0x198)](_0x493994,_0x24164c+'='+_0x6b12dd+'\x0a');}exports[_0x1a61f5(0x189)]=addUsesPermission,exports[_0x1a61f5(0x192)]=getDependencyTag,exports[_0x1a61f5(0x19b)]=insertDependency,exports['setGradleProperty']=setGradleProperty;