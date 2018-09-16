## Introduction
A small tool based on webview and webssh supporting multi platform for efficient big data development.
## Features
- fast startup
- cross platform
- MAYBE easy to customize(plugable)

## Preview
![demo](https://github.com/CJSoldier/whitepawcat/raw/master/preview/demo.gif)
### Runtime requirements
- jdk1.8 installed(**important**)
- JAVA_HOME, LD_LIBRARY_PATH environment being set(**important**)

macos set LD_LIBRARY_PATH:

```bash
vim /etc/profile
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$(/usr/libexec/java_home)/jre/lib/jli/:$(/usr/libexec/java_home)/jre/lib/server
```

windows set LD_LIBRARY_PATH:

```
// add this to Path
%JAVA_HOME%\jre\bin\server
```

### Build requirements
- gcc(64 bit!)
- node.js8.11+
- jdk1.8(64 bit)
- python2.7/3.4+
- webkit(gtk-webkit2,linux only)


### How to build


1.build C code

macos:

```
cd whitepawcat 
gcc main.c -DWEBVIEW_COCOA=1 -ObjC -framework Cocoa -framework WebKit -Wno-return-type -I$(/usr/libexec/java_home)/include/ -I$(/usr/libexec/java_home)/include/darwin -L$(/usr/libexec/java_home)/jre/lib/jli -L$(/usr/libexec/java_home)/jre/lib/server/ -ljli -ljvm -o whitepawcat
```
windows:

```
gcc main.c -DWEBVIEW_WINAPI=1 -lole32 -lcomctl32 -loleaut32 -luuid -mwindows -I"%JAVA_HOME%/include/" -I"%JAVA_HOME%/include/win32" -L"%JAVA_HOME%/jre/bin" -L"%JAVA_HOME%/jre/bin/server" -ljli -ljvm -o whitepawcat.exe
```
linux:

```
// todo
```
2.build JS code

```
cd whitepawcat/gui/whitepawcat
cnpm install 
cnpm run build
copy index.html and dist folder to whitepawcat/gui folder
modify index.html(xxx.js,xxx.css  ->  dist/xxx.js,dist/xxx.css)
```

3.build Java Code

```
cd whitepawcat/kernel/whitepawcat/whitepawcat-core
mvn clean assembly:assembly
cd whitepawcat/kernel/whitepawcat/whitepawcat-hbase123
mvn clean assembly:assembly
copy generated jars to whitepawcat/kernel
```

4.build python Code(**optional**)

If you don't want to use webssh, you needn't do that.

```
sudo pip install tornado --ignore-installed -i https://pypi.douban.com/simple
sudo pip install paramiko --ignore-installed -i https://pypi.douban.com/simple
sudo pip install modulegraph

// you may use other tools.I don't expect users have already installed python.
sudo pip install pyinstaller
cd whitepawcat/webssh/webssh
pyinstaller -p . --add-data 'static/:webssh/static' --add-data 'templates/:webssh/templates' main.py

cd whitepawcat/webssh/webssh/dist/main
# if you don't wanna use webssh,you needn't start it. Once start, the port must be 23333.Why this port?You know it.
./main --address='0.0.0.0' --port=23333
```

## How it Works

Webview launches system-provided browser for us, it's similar to electron but more lightweight.
Webview also registers a callback function(router) for js,after then js can call C.
C callback function will launch a jvm when js call it for the first time.
Java method will load jar files using parent last classloader when C call it for the first time
Java method returns results("window.res='result string'"), C assigns the results to js global variable(window.res).
js renders the page.

If server support REST api such as ElasticSearch, you can also request server directly via axios fetch.

## Notes
- gcc and jdk must be 64 bit
- one process can only launch one jvm(long story)
- cannot print string contains non-ascii characters using webview_debug,print it in Java or in js.
- just pass the value GetStringUTFChars function returned to js, it won't be gibberish(long story)
- be careful of strings that contain backslash(long story)
- cannot use `window.open` to open new windows/tabs in webview
- cannot use Ctrl+C/S/V in webview

