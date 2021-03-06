## Introduction
A small tool based on [zserge/webview](https://github.com/zserge/webview) and [huashengdun/webssh](https://github.com/huashengdun/webssh) supporting multi platform for efficient big data development.
I copy complete webssh code here just for convenience.
## Features
- fast startup
- cross-platform
- Hbase gui client
- ElasticSearch gui client
- ssh client
- easy to extend(add any feature you want)

## Preview
![demo](https://github.com/CJSoldier/whitepawcat/raw/master/preview/demo.gif)
### Runtime requirements
- jdk1.8 installed(**important**)
- JAVA_HOME, LD_LIBRARY_PATH environment being set(**important**)

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
modify index.html(xxx.js,xxx.css  ->  dist/xxx.js,dist/xxx.css) (important)
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


// you may use other tools.I don't expect users have already installed python.
sudo pip install pyinstaller --ignore-installed -i https://pypi.douban.com/simple
cd whitepawcat/webssh/webssh
pyinstaller -p . --add-data 'static/:webssh/static' --add-data 'templates/:webssh/templates' main.py
// windows
pyinstaller -p . --add-data 'static/;webssh/static' --add-data 'templates/;webssh/templates' main.py
cd whitepawcat/webssh/webssh/dist/main
# if you don't wanna use webssh,you needn't start it. Once start, the port must be 23333.Why this port?Just for fun.
./main
// windows
main.exe
```

## How it Works
- Webview launches system-provided browser for us, it's similar to electron but more lightweight.
- Webview also registers a callback function(router) for js,after then js and C can call each other.
- C callback function will launch a jvm when js call it for the first time.
- Java method will load jar files using parent last classloader when C call it for the first time
- Java method returns results("window.res='result string'"), C assigns the results to js global variable(window.res).
- js renders the page.

If server support REST api such as ElasticSearch, you can also request server directly via axios fetch.

## Notes
- gcc and jdk must be 64 bit
- one process can only launch one jvm(long story)
- cannot print string contains non-ascii characters using webview_debug,print it in Java or in js.
- just pass the value GetStringUTFChars function returned to js, it won't be gibberish(long story)
- be careful of strings that contain backslash(long story)
- cannot use `window.open` to open new windows/tabs in webview
- cannot use Ctrl+C/S/V in webview(macos)
- cannot use `<input type="file"/>` in webview(macos)

## Imperfections(help me pls)
- code is simple stupid
- cannot build automatically
- every Java method called from C must return String value wrapped by `windows.res=''`
- page layout is simple stupid
- have to start webssh manually
- have to set LD_LIBRARY_PATH manually

## Why call it whitepawcat
I was doing my homework, "White paw cat.",Mom said.A cat walked past me,
"Mom, the cat's claws ARE white".She laughed.Many years later,she told me that she meant I'm absent-minded.
Don't be white paw cat:).

## How to contribute

You can treat executable file whitepawcat as a browser.That is to say, if you don't modify
C Code, you needn't compile an executable whitepawcat yourself, leaving you to concentrate on 
developing web apps.

Here's an example.I want to add a hbase client, hbase server version is hbase-cdh-1.2.0.

1. add a tab named hbase in index.js
2. request data(two ways)

   2.1. send http request via axios(if server has REST api).But it may have some limitations.

   2.2. call Java method,like this:

```
// pass 4 args. Note .jar files must be under whitepawcat/kernel
// I didn't pass version, because jar file name contains version info.
param.jarName="whitepawcat-hbase120.jar";
param.classFullName="controller.MainController";
param.staticMethodName="upsertRecord";
param.args=JSON.stringify({url:hUrl, port:hPort, namespaceTable:nsTable, rowkey:rkey, kvs:pdata});

// call C method, main.c will launch a jvm and call whitepawcat-core.jar automatically
// whitepawcat-core.jar will load whitepawcat-hbase120.jar with a custom parent last classloader and then call java method upsertRecord
// external.invoke can only be called in webview. In real browser, you should use fake data.
external.invoke(JSON.stringify(param));
// main.c will assign results to js global variable automatically. 
// render the page
this.setState({resData:window.res});
```

3. add a maven module named whitepawcat-hbase120
4. configure your preference in gui/whitepawcat/preference.js.
5. done


